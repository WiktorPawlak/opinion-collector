package pl.io.opinioncollector.domain.suggestion.model;

import javax.persistence.Embeddable;

import lombok.Data;
import lombok.NoArgsConstructor;
import pl.io.opinioncollector.domain.product.model.ProductOrigin;

@Data
@NoArgsConstructor
@Embeddable
public class SuggestionProduct {
    private long categoryId;
    private String title;
    private String image;
    private ProductOrigin origin;
    private boolean visibility;
    private String ean;
}
