package pl.io.opinioncollector.domain.client;

import pl.io.opinioncollector.domain.client.model.Client;
import pl.io.opinioncollector.domain.client.model.ClientDetails;
import pl.io.opinioncollector.domain.dto.RegistrationDto;
import pl.io.opinioncollector.domain.dto.SignInDto;
import pl.io.opinioncollector.domain.client.model.ClientId;
import java.util.List;

public interface ClientFacade {
    ClientId register(RegistrationDto registrationForm);
    ClientDetails signIn(SignInDto singInForm);
    String generateJwtToken(ClientDetails clientDetails);
    void changeEmail(String userName, String email);
    void changePass(String userName, String hashedPass);
    Client getClient(String username);
    List<Client> getAllClients();
}
