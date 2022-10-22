package pl.io.opinioncollector.domain.opinion;

import pl.io.opinioncollector.domain.opinion.model.Opinion;
import pl.io.opinioncollector.domain.opinion.model.OpinionId;
import pl.io.opinioncollector.domain.product.model.ProductId;

import java.util.List;

public interface OpinionFacade {
    List<Opinion> getAllFor(ProductId productId);
    Opinion get(OpinionId opinionId);
    void add(Opinion opinion);
    void edit(Opinion opinion);
    void delete(OpinionId opinionId);
    Double starAverage(ProductId productId);
}
