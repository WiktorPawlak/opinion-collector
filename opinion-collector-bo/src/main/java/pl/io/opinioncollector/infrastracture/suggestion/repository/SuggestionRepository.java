package pl.io.opinioncollector.infrastracture.suggestion.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.io.opinioncollector.domain.client.model.ClientUsername;
import pl.io.opinioncollector.domain.suggestion.model.Suggestion;

import java.util.List;

@Repository
public interface SuggestionRepository extends JpaRepository<Suggestion, Long> {

    public List<Suggestion> findAllByClientUsername(String clientUsername);
}
