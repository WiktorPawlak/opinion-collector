package pl.io.opinioncollector.application.dto;

import pl.io.opinioncollector.domain.opinion.model.Opinion;

public class OpinionDto {
    public long clientId;

    public long productId;

    public String starReview;

    public String opinionContent;

    public String opinionPros;

    public String opinionCons;

    public boolean isHidden;

    public Opinion toDomain() {
        return null;
    }
}
