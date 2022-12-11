package pl.io.opinioncollector.application.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.io.opinioncollector.domain.client.ClientFacade;

import java.security.Principal;

@RequiredArgsConstructor
@RestController
@RequestMapping("client")
public class ClientController {

    private final ClientFacade clientFacade;
    @GetMapping("/self")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public ResponseEntity<Object> getClient(Principal principal) {
        try{
            String username = principal.getName();
            return ResponseEntity.ok(clientFacade.getClient(username));
        }catch (IllegalStateException ex){
           return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }

    }


    @PostMapping("/change-email")
    public ResponseEntity<Object> changeEmail(Principal principal, String email) {
        try{
            clientFacade.changeEmail(principal.getName(), email);
            return ResponseEntity.ok("Email changed");
        }catch (IllegalStateException ex){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    @PostMapping("/change-password")
    public ResponseEntity<Object> changePass(Principal principal, String hashedPass) {
        try{
            clientFacade.changePass(principal.getName(), hashedPass);
            return ResponseEntity.ok("Password changed");
        }catch (IllegalStateException ex){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

}
