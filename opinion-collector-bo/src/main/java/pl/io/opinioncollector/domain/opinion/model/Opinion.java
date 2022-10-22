package pl.io.opinioncollector.domain.opinion.model;

import pl.io.opinioncollector.domain.client.model.ClientId;
import pl.io.opinioncollector.domain.product.model.ProductId;

public class Opinion {
    public OpinionId opinionId;
    public ClientId clientId;
    public ProductId productId;
    public StarReview starReview;
    public String opinionContent;
    public String opinionPros;
    public String opinionCons;
}

