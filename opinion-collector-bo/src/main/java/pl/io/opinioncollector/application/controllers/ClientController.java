package pl.io.opinioncollector.application.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.io.opinioncollector.domain.client.model.Client;
import pl.io.opinioncollector.domain.client.model.ClientRole;

@RestController
@RequestMapping("client")
public class ClientController {

    @GetMapping("get")
    public Client getClient() {

        return new Client("Mati", "mati", "mati@mati.pl", ClientRole.STANDARD);
    }


}
