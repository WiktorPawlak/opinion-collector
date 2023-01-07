package pl.io.opinioncollector.domain.opinion;

import pl.io.opinioncollector.domain.opinion.model.Opinion;

import java.util.List;

public interface OpinionFacade {
    List<Opinion> getFor(long productId);

    List<Opinion> findAll();

    Opinion get(long opinionId);

    Opinion add(Opinion opinion);

    void edit(Opinion opinion);

    void delete(long opinionId);

    double starAverage(long productId);

    void changeHidden(long opinionId);

}
