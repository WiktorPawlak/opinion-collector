package pl.io.opinioncollector.domain.product.model;

import pl.io.opinioncollector.domain.category.model.CategoryId;

public class Product {
    public ProductId id;
    public CategoryId categoryId;
    public ProductTitle title;
    public ProductPicUrl picUrl;
    public ProductOrigin origin;
    public ProductVisibility visibility;
}
