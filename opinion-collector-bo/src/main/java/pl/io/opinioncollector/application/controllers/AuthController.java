package pl.io.opinioncollector.application.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pl.io.opinioncollector.domain.client.ClientFacade;
import pl.io.opinioncollector.domain.client.model.ClientDetails;
import pl.io.opinioncollector.domain.client.model.ClientId;
import pl.io.opinioncollector.domain.dto.RegistrationDto;
import pl.io.opinioncollector.domain.dto.SignInDto;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final ClientFacade clientFacade;

    @PostMapping("login")
    public ResponseEntity<ClientDetails> login(@RequestBody SignInDto request, HttpServletResponse response) {
        try {
            ClientDetails user = clientFacade.signIn(request);
            String token = clientFacade.generateJwtToken(user, request.password);

            Cookie cookie = new Cookie("opinionCollector", token);
            cookie.setMaxAge(86400);
            cookie.setSecure(true);
            cookie.setHttpOnly(true);

            response.addCookie(cookie);

            return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, token)
                .body(user);
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("log-out")
    public ResponseEntity<Object> loginOut(HttpServletResponse response) {

            Cookie cookie = new Cookie("opinionCollector", "token");
            cookie.setMaxAge(0);
            cookie.setSecure(true);
            cookie.setHttpOnly(true);

            response.addCookie(cookie);

            return ResponseEntity.ok().build();
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
