package pl.io.opinioncollector.infrastracture.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;
import pl.io.opinioncollector.domain.client.ClientFacade;
import pl.io.opinioncollector.domain.client.model.Client;
import pl.io.opinioncollector.domain.client.model.ClientDetails;
import pl.io.opinioncollector.domain.client.model.ClientEmail;
import pl.io.opinioncollector.domain.client.model.ClientId;
import pl.io.opinioncollector.domain.client.model.ClientPassword;
import pl.io.opinioncollector.domain.client.model.ClientUsername;
import pl.io.opinioncollector.domain.dto.RegistrationDto;
import pl.io.opinioncollector.domain.dto.SignInDto;
import pl.io.opinioncollector.infrastracture.ClientRepository;

import javax.transaction.Transactional;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClientService implements ClientFacade {

    private final AuthenticationManager authenticationManager;
    private final JwtEncoder jwtEncoder;
    private final ClientRepository clientRepository;
    @Value("${jwt.expiration.seconds}")
    private long expirationTime;

    @Override
    @Transactional
    public ClientId register(RegistrationDto registrationForm) {
        boolean isValidEmail = RegistrationDto.validateEmail(registrationForm.getEmail());
        boolean isValidLogin = registrationForm.validateUsername(registrationForm.getLogin());

        if (!isValidEmail) {
            throw new IllegalStateException("email not valid");
        }

        if (!isValidLogin) {
            throw new IllegalStateException("login not valid");
        }

        if (clientRepository.findByUsername(new ClientUsername(registrationForm.getLogin())).isPresent()) {
            throw new IllegalStateException("clientExist");
        }

        if (clientRepository.findByEmail(new ClientEmail(registrationForm.getEmail())).isPresent()) {
            throw new IllegalStateException("Email is taken by another user.");
        }


        return clientRepository.save(
            new Client(registrationForm.getLogin(),
                registrationForm.getHashedPass(),
                registrationForm.getEmail())
        ).getId();
    }

    @Override
    public ClientDetails signIn(SignInDto singInForm) {
        Authentication authentication =
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(singInForm.getUsername(), singInForm.getPassword()));

        return (ClientDetails) authentication.getPrincipal();
    }

    @Override
    public String generateJwtToken(ClientDetails clientDetails) {
        Instant now = Instant.now();
        long expiry = expirationTime;

        String roles = clientDetails.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority).collect(Collectors.joining(" "));

        JwtClaimsSet claims =
            JwtClaimsSet.builder()
                .issuedAt(now)
                .expiresAt(now.plusSeconds(expiry))
                .subject(clientDetails.getUsername())
                .claim("scp", roles)
                .build();

        return this.jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }

    @Override
    @Transactional
    public void changeEmail(String userName, String email) {
        if (RegistrationDto.validateEmail(email) && clientRepository.findByEmail(new ClientEmail(email)).isEmpty()) {
            Client client = clientRepository.findByUsername(new ClientUsername(userName)).orElseThrow(IllegalStateException::new);
            client.setEmail(new ClientEmail(email));
            client.setModifiedAt(LocalDateTime.now());
            clientRepository.save(client);
        } else {
            throw new IllegalStateException("Wrong email.");
        }
    }

    @Override
    @Transactional
    public void changePass(String userName, String hashedPass) {
        Client client = clientRepository.findByUsername(new ClientUsername(userName))
            .orElseThrow(IllegalStateException::new);
        client.setPassword(new ClientPassword(hashedPass));
        client.setModifiedAt(LocalDateTime.now());
        clientRepository.save(client);
    }

    @Override
    public Client getClient(String username) {
        return clientRepository.findByUsername(new ClientUsername(username))
            .orElseThrow(() -> new IllegalStateException("Client does not exist"));
    }

    @Override
    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }
}
