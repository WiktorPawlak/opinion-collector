package pl.io.opinioncollector.domain.opinion;

import pl.io.opinioncollector.domain.opinion.model.Opinion;

import java.security.Principal;
import java.util.List;
import java.util.UUID;

public interface OpinionFacade {
    List<Opinion> getFor(long productId);

    List<Opinion> findAll();

    Opinion get(long opinionId);

    Opinion add(Opinion opinion);

    void edit(Opinion opinion, Principal principal) throws IllegalAccessException;

    void delete(long opinionId, Principal principal) throws IllegalAccessException;

    double starAverage(long productId);

    void changeHidden(long opinionId, Principal principal) throws IllegalAccessException;

    List<Opinion> getForUser(String userid, Principal principal) throws IllegalAccessException;

    List<Opinion> getVisibleFor(long id);
}
