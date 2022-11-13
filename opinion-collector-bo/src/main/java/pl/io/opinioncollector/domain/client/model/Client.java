package pl.io.opinioncollector.domain.client.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.Embedded;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Client {

    @EmbeddedId
    private ClientId id;

    @Embedded
    private ClientUsername username;
    @Embedded
    private ClientPassword password;
    @Embedded
    private ClientEmail email;
    @Enumerated(EnumType.STRING)
    private ClientRole role;
    private boolean isEnabled = true;

    @CreatedDate
    private LocalDateTime createdAt;
    @LastModifiedDate
    private LocalDateTime modifiedAt;

    public Client(String username, String password, String email, ClientRole clientRole) {
        this.id = new ClientId(UUID.randomUUID());
        this.password = new ClientPassword(password);
        this.username = new ClientUsername(username);
        this.email = new ClientEmail(email);
        this.role = clientRole;
    }

    public void changeMail() {
    }

    public void changePass() {
    }

}
