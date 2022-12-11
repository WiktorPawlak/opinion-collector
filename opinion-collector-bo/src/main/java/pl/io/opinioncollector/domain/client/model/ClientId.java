package pl.io.opinioncollector.domain.client.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.UUID;
@Data
@Embeddable
@AllArgsConstructor
@NoArgsConstructor
public class ClientId implements Serializable {

    private UUID uuid = UUID.randomUUID();

    public ClientId(String uuid) {
        this.uuid = UUID.fromString(uuid);
    }
}
