package pl.io.opinioncollector.domain.client;

import pl.io.opinioncollector.domain.client.model.Client;
import pl.io.opinioncollector.domain.client.model.ClientDetails;
import pl.io.opinioncollector.domain.client.model.ClientRole;
import pl.io.opinioncollector.domain.dto.RegistrationDto;
import pl.io.opinioncollector.domain.dto.SignInDto;
import pl.io.opinioncollector.domain.client.model.ClientId;
import java.util.List;
import java.util.Optional;

public interface ClientFacade {
    ClientId register(RegistrationDto registrationForm);
    ClientDetails signIn(SignInDto singInForm);
    String generateJwtToken(ClientDetails clientDetails, String password);
    void changeEmail(String userName, String email);
    void changePass(String userName, String hashedPass);
    Client getClient(String username);
    List<Client> getAllClients();
    void archive(String userName);
    void changeRole(String userName, ClientRole role);
    List<Client> getAllArchivedClients();
    List<Client> getAllActiveClients();
}
