package pl.io.opinioncollector.domain.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SignInDto {
    public String username;
    public String password;
}
