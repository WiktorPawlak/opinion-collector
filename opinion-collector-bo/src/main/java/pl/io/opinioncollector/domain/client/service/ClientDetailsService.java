package pl.io.opinioncollector.domain.client.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import pl.io.opinioncollector.domain.client.model.Client;
import pl.io.opinioncollector.domain.client.model.ClientDetails;
import pl.io.opinioncollector.domain.client.model.ClientUsername;
import pl.io.opinioncollector.domain.dto.RegistrationDto;
import pl.io.opinioncollector.infrastracture.ClientRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ClientDetailsService implements UserDetailsService {

    private final ClientRepository clientRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Client> client = clientRepository.findByUsername(new ClientUsername(username));
        if (client.isEmpty()) {
            throw new UsernameNotFoundException(username);
        }
        return new ClientDetails(client.get());
    }
}
