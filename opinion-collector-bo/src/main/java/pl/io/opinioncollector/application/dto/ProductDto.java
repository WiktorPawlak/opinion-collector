package pl.io.opinioncollector.application.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import pl.io.opinioncollector.domain.product.model.ProductOrigin;

@Getter
@Builder
@AllArgsConstructor
public class ProductDto {

    private long id;

    private String category;

    private String title;

    private String image;

    private ProductOrigin origin;

    private boolean visibility;

    private String ean;
}
