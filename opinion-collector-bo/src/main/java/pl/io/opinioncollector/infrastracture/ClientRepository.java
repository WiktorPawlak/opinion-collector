package pl.io.opinioncollector.infrastracture;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.io.opinioncollector.domain.client.model.Client;
import pl.io.opinioncollector.domain.client.model.ClientEmail;
import pl.io.opinioncollector.domain.client.model.ClientId;
import pl.io.opinioncollector.domain.client.model.ClientUsername;

import java.util.Optional;

@Repository
public interface ClientRepository extends JpaRepository<Client, ClientId> {

    Optional<Client> findByUsername(ClientUsername username);
    Optional<Client> findByEmail(ClientEmail email);

}
