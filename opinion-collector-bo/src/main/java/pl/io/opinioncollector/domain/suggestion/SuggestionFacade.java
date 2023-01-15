package pl.io.opinioncollector.domain.suggestion;

import java.security.Principal;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;
import pl.io.opinioncollector.application.dto.SuggestionDto;
import pl.io.opinioncollector.domain.client.model.ClientUsername;
import pl.io.opinioncollector.domain.product.model.Product;
import pl.io.opinioncollector.domain.suggestion.model.Suggestion;
import pl.io.opinioncollector.domain.suggestion.model.SuggestionProduct;
import pl.io.opinioncollector.domain.suggestion.model.SuggestionState;

public interface SuggestionFacade {

    Product getProductForSuggestion(long id);

    List<Suggestion> getAll();

    Suggestion getById(Long id);

    Suggestion createSuggestion(ClientUsername clientUsername, long productId, MultipartFile file, SuggestionProduct product);

    Suggestion edit(SuggestionDto editedSuggestion, MultipartFile file, Principal principal);

    void delete(Long id, Principal principal);

    void acceptOrReject(Long id, SuggestionState state);

    public List<Suggestion> findUserSuggestions(String string, Principal principal);

}
