package pl.io.opinioncollector.application.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import pl.io.opinioncollector.domain.category.model.Category;
import pl.io.opinioncollector.domain.product.ProductFacade;
import pl.io.opinioncollector.domain.product.model.Product;
import pl.io.opinioncollector.domain.product.model.ProductOrigin;

@Getter
@Builder
@AllArgsConstructor
public class ProductDto {
    private Product product;
    private Category category;
}
