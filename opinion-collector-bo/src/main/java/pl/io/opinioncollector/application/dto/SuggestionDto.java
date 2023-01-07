package pl.io.opinioncollector.application.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import pl.io.opinioncollector.domain.client.model.ClientUsername;
import pl.io.opinioncollector.domain.suggestion.model.SuggestionProduct;
import pl.io.opinioncollector.domain.suggestion.model.SuggestionState;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SuggestionDto {
    private long suggestionId;
    private SuggestionProduct suggestionProduct;
}
