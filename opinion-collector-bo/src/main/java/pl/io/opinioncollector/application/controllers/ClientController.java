package pl.io.opinioncollector.application.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.io.opinioncollector.domain.client.ClientFacade;
import pl.io.opinioncollector.domain.client.model.Client;

import java.security.Principal;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("client")
public class ClientController {

    private final ClientFacade clientFacade;

    @GetMapping("/self")
    public ResponseEntity<Object> getClient(Principal principal) {
        try {
            return ResponseEntity.ok(clientFacade.getClient(principal.getName()));
        } catch (IllegalStateException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<Client>> getClients() {
        return ResponseEntity.ok(clientFacade.getAllClients());
    }

    @PutMapping("/change-email")
    public ResponseEntity<Object> changeEmail(Principal principal, String email) {
        try {
            clientFacade.changeEmail(principal.getName(), email);
            return ResponseEntity.ok("Email changed");
        } catch (IllegalStateException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    @PutMapping("/change-password")
    public ResponseEntity<Object> changePass(Principal principal, String hashedPass) {
        try {
            clientFacade.changePass(principal.getName(), hashedPass);
            return ResponseEntity.ok("Password changed");
        } catch (IllegalStateException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

}
