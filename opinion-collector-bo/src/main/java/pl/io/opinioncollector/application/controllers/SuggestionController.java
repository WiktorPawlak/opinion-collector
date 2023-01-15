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
import org.springframework.web.multipart.MultipartFile;
import pl.io.opinioncollector.application.dto.SuggestionDto;
import pl.io.opinioncollector.domain.client.model.ClientUsername;
import pl.io.opinioncollector.domain.product.model.Product;
import pl.io.opinioncollector.domain.product.model.ProductOrigin;
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
    @PreAuthorize("hasAuthority('ADMIN')")
    public List<Suggestion> getAllSuggestions() {
        return suggestionFacade.getAll();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN') ||" +
        "hasAuthority('STANDARD')")
    public Suggestion getSuggestionById(@PathVariable Long id) {
        return suggestionFacade.getById(id);
    }

    @PostMapping(consumes = "multipart/form-data")
    @PreAuthorize("hasAuthority('STANDARD')")
    public Suggestion createSuggestion(Principal principal,
                                       @RequestParam long productId,
                                       @RequestParam("image") MultipartFile file,
                                       @RequestParam("categoryId") long categoryId,
                                       @RequestParam("title") String title,
                                       @RequestParam("origin") String origin,
                                       @RequestParam("ean") String ean) {
        return suggestionFacade.createSuggestion(new ClientUsername(principal.getName()),
            productId,
            file,
            new SuggestionProduct(categoryId,
                title,
                ProductOrigin.valueOf(origin),
                ean));
    }

    @PostMapping("/{id}/accept")
    @PreAuthorize("hasAuthority('ADMIN')")
    public void acceptSuggestion(@PathVariable Long id) {
        suggestionFacade.acceptOrReject(id, SuggestionState.ACCEPTED);
    }

    @PostMapping("/{id}/reject")
    @PreAuthorize("hasAuthority('ADMIN')")
    public void rejectSuggestion(@PathVariable Long id) {
        suggestionFacade.acceptOrReject(id, SuggestionState.REJECTED);
    }

    @PutMapping(value="/{id}", consumes = "multipart/form-data")
    @PreAuthorize("hasAuthority('STANDARD')")
    public Suggestion editSuggestion(@PathVariable long id,
                                     @RequestParam("image") MultipartFile file,
                                     @RequestParam("categoryId") long categoryId,
                                     @RequestParam("title") String title,
                                     @RequestParam("origin") String origin,
                                     @RequestParam("ean") String ean,
                                     Principal principal) {


        return suggestionFacade.edit(new SuggestionDto(id, new SuggestionProduct(categoryId,
            title,
            ProductOrigin.valueOf(origin),
            ean)), file, principal);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN') ||" +
        "hasAuthority('STANDARD')")
    public void deleteSuggestion(@PathVariable Long id, Principal principal) {
        suggestionFacade.delete(id, principal);
    }

    @GetMapping("search")
    @PreAuthorize("hasAuthority('STANDARD')")
    public List<Suggestion> getUserSuggestions(String username, Principal principal) {
        return suggestionFacade.findUserSuggestions(username, principal);
    }

}
