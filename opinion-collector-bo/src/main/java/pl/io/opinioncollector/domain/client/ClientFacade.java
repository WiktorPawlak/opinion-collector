package pl.io.opinioncollector.domain.client;

import pl.io.opinioncollector.domain.client.model.ClientDetails;
import pl.io.opinioncollector.domain.dto.RegistrationDto;
import pl.io.opinioncollector.domain.dto.SignInDto;
import pl.io.opinioncollector.domain.client.model.ClientEmail;
import pl.io.opinioncollector.domain.client.model.ClientId;

public interface ClientFacade {
    void register(RegistrationDto registrationForm);
    ClientDetails signIn(SignInDto singInForm);
    String generateJwtToken(ClientDetails clientDetails);
    void changeEmail(ClientId clientId, ClientEmail email);
    void changePass(ClientId clientId, String hashedPass);
}
