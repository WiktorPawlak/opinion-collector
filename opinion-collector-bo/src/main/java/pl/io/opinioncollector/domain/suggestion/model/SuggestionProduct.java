package pl.io.opinioncollector.domain.suggestion.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import pl.io.opinioncollector.domain.product.model.ProductOrigin;

import javax.persistence.Embeddable;

@Data
@NoArgsConstructor
@Embeddable
public class SuggestionProduct {
    private long categoryId;
    private String title;
    private byte[] image;
    private ProductOrigin origin;
    private boolean visibility;
    private String ean;
}
