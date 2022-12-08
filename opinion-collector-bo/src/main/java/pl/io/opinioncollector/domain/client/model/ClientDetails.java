package pl.io.opinioncollector.domain.client.model;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

@RequiredArgsConstructor
public class ClientDetails implements UserDetails {

    private final Client client;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return client.getPassword().getPassword();
    }

    @Override
    public String getUsername() {
        return client.getUsername().getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return client.isEnabled();
    }

    @Override
    public boolean isAccountNonLocked() {
        return client.isEnabled();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return client.isEnabled();
    }

    @Override
    public boolean isEnabled() {
        return client.isEnabled();
    }
}
