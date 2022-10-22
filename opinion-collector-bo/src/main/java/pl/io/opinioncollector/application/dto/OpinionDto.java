package pl.io.opinioncollector.application.dto;

import pl.io.opinioncollector.domain.opinion.model.Opinion;

public class OpinionDto {
    public String clientId;
    public String productId;
    public String starReview;
    public String opinionContent;
    public String opinionPros;
    public String opinionCons;

    public Opinion toDomain() {
        return null;
    }
}
