package pl.io.opinioncollector.application.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.io.opinioncollector.domain.client.ClientFacade;
import pl.io.opinioncollector.domain.client.model.Client;
import pl.io.opinioncollector.domain.client.model.ClientDetails;
import pl.io.opinioncollector.domain.client.model.ClientEmail;
import pl.io.opinioncollector.domain.client.model.ClientId;
import pl.io.opinioncollector.domain.client.model.ClientRole;

import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("client")
public class ClientController {

    private final ClientFacade clientFacade;
    @GetMapping("get")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public Client getClient() {

        return new Client("Mati", "mati", "mati@mati.pl");
    }

    @PostMapping("changeEmail")
    public void changeEmail(String clientId, String email) {

        clientFacade.changeEmail(clientId, email);
    }

}
