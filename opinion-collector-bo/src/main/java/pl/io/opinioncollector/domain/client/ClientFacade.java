package pl.io.opinioncollector.domain.client;

import pl.io.opinioncollector.domain.client.model.Client;
import pl.io.opinioncollector.domain.client.model.ClientDetails;
import pl.io.opinioncollector.domain.dto.RegistrationDto;
import pl.io.opinioncollector.domain.dto.SignInDto;
import pl.io.opinioncollector.domain.client.model.ClientEmail;
import pl.io.opinioncollector.domain.client.model.ClientId;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ClientFacade {
    ClientId register(RegistrationDto registrationForm);
    ClientDetails signIn(SignInDto singInForm);
    String generateJwtToken(ClientDetails clientDetails);
    void changeEmail(String clientId, String email);
    void changePass(ClientId clientId, String hashedPass);

    Client getClient(ClientId clientId);
    List<Client> getAllClients();
}
