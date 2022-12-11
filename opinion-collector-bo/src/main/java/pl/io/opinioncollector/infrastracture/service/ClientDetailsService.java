package pl.io.opinioncollector.infrastracture.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import pl.io.opinioncollector.domain.client.model.Client;
import pl.io.opinioncollector.domain.client.model.ClientDetails;
import pl.io.opinioncollector.domain.client.model.ClientUsername;
import pl.io.opinioncollector.infrastracture.ClientRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClientDetailsService implements UserDetailsService {

    private final ClientRepository clientRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Client client = clientRepository.findByUsername(new ClientUsername(username)).orElseThrow(() ->
            new UsernameNotFoundException(username));

        List<SimpleGrantedAuthority> grantedAuthorities = List.of(new SimpleGrantedAuthority(client.getRole().name()));

        return new ClientDetails(client, grantedAuthorities);
    }


}
