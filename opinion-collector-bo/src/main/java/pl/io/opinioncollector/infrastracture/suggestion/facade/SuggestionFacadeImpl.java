package pl.io.opinioncollector.infrastracture.suggestion.facade;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

import javax.naming.AuthenticationException;
import javax.persistence.EntityNotFoundException;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import pl.io.opinioncollector.application.dto.SuggestionDto;
import pl.io.opinioncollector.domain.client.model.ClientUsername;
import pl.io.opinioncollector.domain.product.ProductFacade;
import pl.io.opinioncollector.domain.product.model.Product;
import pl.io.opinioncollector.domain.suggestion.SuggestionFacade;
import pl.io.opinioncollector.domain.suggestion.model.Suggestion;
import pl.io.opinioncollector.domain.suggestion.model.SuggestionProduct;
import pl.io.opinioncollector.domain.suggestion.model.SuggestionState;
import pl.io.opinioncollector.infrastracture.product.repository.ProductRepository;
import pl.io.opinioncollector.infrastracture.suggestion.repository.SuggestionRepository;

@Service
@RequiredArgsConstructor
@Slf4j
public class SuggestionFacadeImpl implements SuggestionFacade {

    private final SuggestionRepository suggestionRepository;
    private final ProductFacade productFacade;
    private final ProductRepository productRepository;

    @Override
    public Product getProductForSuggestion(long id) {
        return productRepository.findById(id).orElseThrow();
    }

    @Override
    public List<Suggestion> getAll() {
        return suggestionRepository.findAll();
    }

    @Override
    public Suggestion getById(Long id) {
        return suggestionRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Entity with given id doesn't exist"));
    }

    @Override
    public Suggestion createSuggestion(ClientUsername clientUsername, long productId, SuggestionProduct suggestionProduct) {
        Product product = getProductForSuggestion(productId);
        Suggestion suggestion = Suggestion.builder()
            .product(product)
            .suggestionProduct(suggestionProduct)
            .client(clientUsername)
            .suggestionState(SuggestionState.SUBMITTED)
            .build();
        return suggestionRepository.save(suggestion);
    }

    @Override
    public Suggestion edit(SuggestionDto editedSuggestion, Principal principal) {
        Suggestion suggestion = getById(editedSuggestion.getSuggestionId());
        if(!principal.getName().equals(suggestion.getClient().getUsername())){
            log.info("Access denied");
            throw new AccessDeniedException("Access denied");
        }
        suggestion.setSuggestionState(SuggestionState.SUBMITTED);
        suggestion.setSuggestionProduct(editedSuggestion.getSuggestionProduct());
        if (suggestionRepository.existsById(editedSuggestion.getSuggestionId())) {
            return suggestionRepository.save(suggestion);
        } else {
            log.info("Entity with given id doesn't exist");
            throw new EntityNotFoundException("Entity with given id doesn't exist");
        }
    }

    @Override
    public void delete(Long id, Principal principal) {
        Optional<Suggestion> suggestion = suggestionRepository.findById(id);
        suggestion.ifPresentOrElse(s -> {
            if(!s.getClient().equals(principal.getName())){
                throw new AccessDeniedException("Access denied");
            }
        }, () -> {
            throw new EntityNotFoundException("Entity with given id doesn't exist");
        });
        suggestionRepository.delete(suggestion.get());
    }

    @Override
    public void acceptOrReject(Long id, SuggestionState state) {
        Suggestion suggestion = getById(id);
        if (state.equals(SuggestionState.ACCEPTED)) {
            Product product = getProductForSuggestion(suggestion.getProduct().getId());
            applySuggestion(suggestion.getSuggestionProduct(), product);
            productFacade.edit(product);
            suggestion.setSuggestionState(SuggestionState.ACCEPTED);
            log.info("Accepting suggestion with id {}", suggestion.getSuggestionId());
            suggestionRepository.delete(suggestion);
        } else if (state.equals(SuggestionState.REJECTED)) {
            suggestion.setSuggestionState(SuggestionState.REJECTED);
            suggestionRepository.save(suggestion);
            log.info("Rejecting suggestion with id {}", suggestion.getSuggestionId());
        } else {
            throw new IllegalStateException("Invalid suggestion state provided");
        }
    }

    @Override
    public List<Suggestion> findUserSuggestions(String clientUserName, Principal principal) {
        if(!clientUserName.equals(principal.getName())){
            throw new AccessDeniedException("Access denied");
        }
        return suggestionRepository.findAllByClientUsername(clientUserName);
    }

    private Product applySuggestion(SuggestionProduct suggestedChanges, Product product) {
        product.setCategoryId(suggestedChanges.getCategoryId());
        product.setTitle(suggestedChanges.getTitle());
        product.setOrigin(suggestedChanges.getOrigin());
        product.setImage(suggestedChanges.getImage());
        product.setVisibility(suggestedChanges.isVisibility());
        product.setEan(suggestedChanges.getEan());
        return product;
    }
}
