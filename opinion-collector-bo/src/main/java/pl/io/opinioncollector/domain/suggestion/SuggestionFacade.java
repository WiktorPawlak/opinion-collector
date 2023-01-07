package pl.io.opinioncollector.domain.suggestion;

import java.util.List;

import pl.io.opinioncollector.domain.client.model.ClientUsername;
import pl.io.opinioncollector.domain.product.model.Product;
import pl.io.opinioncollector.domain.suggestion.model.Suggestion;
import pl.io.opinioncollector.domain.suggestion.model.SuggestionProduct;
import pl.io.opinioncollector.domain.suggestion.model.SuggestionState;

public interface SuggestionFacade {

    Product getProductForSuggestion(long id);

    List<Suggestion> getAll();

    Suggestion getById(Long id);

    Suggestion createSuggestion(ClientUsername clientUsername, long productId, SuggestionProduct product);

    Suggestion edit(Suggestion editedSuggestion);

    void delete(Long id);

    void acceptOrReject(Long id, SuggestionState state);

}
