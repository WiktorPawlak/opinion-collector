package pl.io.opinioncollector.domain.suggestion;

import pl.io.opinioncollector.domain.suggestion.model.Suggestion;
import pl.io.opinioncollector.domain.suggestion.model.SuggestionId;

import java.util.List;

public interface SuggestionFacade {
    List<Suggestion> getAll();
    void add(Suggestion suggestion);
    void accept(SuggestionId suggestionId);
    void deny(SuggestionId suggestionId);
}
