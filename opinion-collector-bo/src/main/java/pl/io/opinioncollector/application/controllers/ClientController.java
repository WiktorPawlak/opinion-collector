package pl.io.opinioncollector.application.controllers;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

@RestController
@RequestMapping("client")
public class ClientController {

    private ClientFacade clientFacade;
    @GetMapping("get")
    public Client getClient() {

        return new Client("Mati", "mati", "mati@mati.pl");
    }

//    @PostMapping("changeEmail")
//    public void changeEmail(ClientId clientId, ClientEmail email) {
//        clientFacade.changeEmail(clientId, email);
//    }

}
