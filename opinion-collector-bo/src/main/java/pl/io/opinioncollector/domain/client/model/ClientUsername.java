package pl.io.opinioncollector.domain.client.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;


@Data
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class ClientUsername {

    private String username;

}
