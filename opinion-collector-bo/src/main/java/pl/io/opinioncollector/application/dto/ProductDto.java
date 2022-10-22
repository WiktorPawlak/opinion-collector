package pl.io.opinioncollector.application.dto;

import pl.io.opinioncollector.domain.product.model.Product;

public class ProductDto {
    public String id;
    public String categoryId;
    public String title;
    public String picUrl;
    public String description;

    public Product toDomain() {
        return null;
    }
}