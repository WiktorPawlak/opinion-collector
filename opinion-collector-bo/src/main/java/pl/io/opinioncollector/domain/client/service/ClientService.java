package pl.io.opinioncollector.domain.client.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;
import pl.io.opinioncollector.domain.client.ClientFacade;
import pl.io.opinioncollector.domain.client.model.ClientDetails;
import pl.io.opinioncollector.domain.client.model.ClientEmail;
import pl.io.opinioncollector.domain.client.model.ClientId;
import pl.io.opinioncollector.domain.dto.RegistrationDto;
import pl.io.opinioncollector.domain.dto.SignInDto;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class ClientService implements ClientFacade {

    private final AuthenticationManager authenticationManager;
    private final JwtEncoder jwtEncoder;

    @Value("${jwt.expiration.seconds}")
    private long expirationTime;

    @Override
    public void register(RegistrationDto registrationForm) {

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

//            String scope =
//                authentication.getAuthorities().stream()
//                    .map(GrantedAuthority::getAuthority)
//                    .collect(joining(" "));

        JwtClaimsSet claims =
            JwtClaimsSet.builder()
                .issuedAt(now)
                .expiresAt(now.plusSeconds(expiry))
                .subject(clientDetails.getUsername())
//                    .claim("roles", scope)
                .build();

        return this.jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }

    @Override
    public void changeEmail(ClientId clientId, ClientEmail email) {

    }

    @Override
    public void changePass(ClientId clientId, String hashedPass) {

    }
}
