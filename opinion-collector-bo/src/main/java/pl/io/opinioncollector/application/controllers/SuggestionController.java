package pl.io.opinioncollector.application.controllers;

import java.security.Principal;
import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import pl.io.opinioncollector.application.dto.SuggestionDto;
import pl.io.opinioncollector.domain.client.model.ClientUsername;
import pl.io.opinioncollector.domain.product.model.Product;
import pl.io.opinioncollector.domain.suggestion.SuggestionFacade;
import pl.io.opinioncollector.domain.suggestion.model.Suggestion;
import pl.io.opinioncollector.domain.suggestion.model.SuggestionProduct;
import pl.io.opinioncollector.domain.suggestion.model.SuggestionState;

@RestController
@RequiredArgsConstructor
@RequestMapping("/suggestions")
public class SuggestionController {

    private final SuggestionFacade suggestionFacade;

    @GetMapping
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public List<Suggestion> getAllSuggestions() {
        return suggestionFacade.getAll();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN') ||" +
        "hasAuthority('SCOPE_STANDARD')")
    public Suggestion getSuggestionById(@PathVariable Long id) {
        return suggestionFacade.getById(id);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('SCOPE_STANDARD')")
    public Suggestion createSuggestion(Principal principal, @RequestParam long productId, @RequestBody SuggestionProduct suggestionProduct) {
        return suggestionFacade.createSuggestion(new ClientUsername(principal.getName()), productId, suggestionProduct);
    }

    @PostMapping("/{id}/accept")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public void acceptSuggestion(@PathVariable Long id) {
        suggestionFacade.acceptOrReject(id, SuggestionState.ACCEPTED);
    }

    @PostMapping("/{id}/reject")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public void rejectSuggestion(@PathVariable Long id) {
        suggestionFacade.acceptOrReject(id, SuggestionState.REJECTED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('SCOPE_STANDARD')")
    public Suggestion editSuggestion(@PathVariable long id, @RequestBody SuggestionDto editedSuggestion, Principal principal) {
        return suggestionFacade.edit(editedSuggestion, principal);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN') ||" +
        "hasAuthority('SCOPE_STANDARD')")
    public void deleteSuggestion(Long id, Principal principal) {
        suggestionFacade.delete(id, principal);
    }

    @GetMapping("search")
    @PreAuthorize("hasAuthority('SCOPE_STANDARD')")
    public List<Suggestion> getUserSuggestions(String username, Principal principal) {
        return suggestionFacade.findUserSuggestions(username, principal);
    }

}
