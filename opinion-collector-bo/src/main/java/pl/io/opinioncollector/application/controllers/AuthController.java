package pl.io.opinioncollector.application.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pl.io.opinioncollector.domain.client.ClientFacade;
import pl.io.opinioncollector.domain.client.model.ClientDetails;
import pl.io.opinioncollector.domain.client.model.ClientId;
import pl.io.opinioncollector.domain.dto.RegistrationDto;
import pl.io.opinioncollector.domain.dto.SignInDto;

@RestController
@RequiredArgsConstructor

public class AuthController {

    private final ClientFacade clientFacade;

    @PostMapping("login")
    public ResponseEntity<ClientDetails> login(@RequestBody SignInDto request) {
        try {
            ClientDetails user = clientFacade.signIn(request);
            String token = clientFacade.generateJwtToken(user);

//            Cookie cookie = new Cookie("opinionCollector", token);
//            cookie.setMaxAge(86400);
//            cookie.setSecure(false);
//            cookie.setHttpOnly(true);
//
//            response.addCookie(cookie);

            return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, token)
                .body(user);
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("register")
    public ResponseEntity<Object> register(@RequestBody RegistrationDto request) {
        try{
            ClientId id = clientFacade.register(request);
            return ResponseEntity.status(HttpStatus.CREATED)
                .header(HttpHeaders.LOCATION, id.toString())
                .build();
        }catch (IllegalStateException ex) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE)
                .body(ex.getMessage());
        }
    }

}
