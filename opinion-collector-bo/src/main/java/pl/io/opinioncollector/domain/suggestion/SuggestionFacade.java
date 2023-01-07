package pl.io.opinioncollector.domain.suggestion;

import pl.io.opinioncollector.domain.client.model.ClientUsername;
import pl.io.opinioncollector.domain.suggestion.model.Suggestion;
import pl.io.opinioncollector.domain.suggestion.model.SuggestionProduct;
import pl.io.opinioncollector.domain.suggestion.model.SuggestionState;

import java.util.List;

public interface SuggestionFacade {
    public List<Suggestion> getAll();

    public Suggestion getById(Long id);

    public Suggestion createSuggestion(ClientUsername clientUsername, long productId, SuggestionProduct product);

    public Suggestion edit(Suggestion editedSuggestion);

    public void delete(Long id);

    public void acceptOrReject(Long id, SuggestionState state);

}
