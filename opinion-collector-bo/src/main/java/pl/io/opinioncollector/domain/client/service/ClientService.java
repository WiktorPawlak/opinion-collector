package pl.io.opinioncollector.domain.client.service;

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
import pl.io.opinioncollector.domain.client.model.ClientUsername;
import pl.io.opinioncollector.domain.dto.RegistrationDto;
import pl.io.opinioncollector.domain.dto.SignInDto;
import pl.io.opinioncollector.infrastracture.ClientRepository;

import java.time.Instant;
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
    public ClientId register(RegistrationDto registrationForm) {
        boolean isValidEmail = registrationForm.validateEmail(registrationForm.getEmail());
        boolean isValidLogin = registrationForm.validateUsername(registrationForm.getLogin());
//        boolean isValidPassword = registrationForm.validatePassword(registrationForm.getHashedPass());

        if (!isValidEmail) {
            throw new IllegalStateException("email not valid");
        }

        if (!isValidLogin) {
            throw new IllegalStateException("login not valid");
        }

//        if (!isValidPassword) {
//            throw new IllegalStateException("password not valid");
//        }

        if (clientRepository.findByUsername(new ClientUsername(registrationForm.getLogin())).isPresent()){
            throw new IllegalStateException("clientExist");
        }



        return clientRepository.save(new Client(registrationForm.getLogin(), registrationForm.getHashedPass(), registrationForm.getEmail())).getId();
    }

    @Override
    public ClientDetails signIn(SignInDto singInForm) {
        Authentication authentication =
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(singInForm.getUsername(), singInForm.getPassword()));

       return  (ClientDetails) authentication.getPrincipal();
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
    public void changeEmail(ClientId clientId, ClientEmail email) {
//        Optional<Client> client = clientRepository.findById(clientId);
//        if (client.isEmpty()) {
//            throw new IllegalStateException("CLient does not exist");
//        }
//        else {
//        if() check email validation
//            clientRepository.findById(clientId).orElseThrow().setEmail(email);
//        }
    }

    @Override
    public void changePass(ClientId clientId, String hashedPass) {

    }


}
