package pl.io.opinioncollector.domain.product;

import pl.io.opinioncollector.domain.category.model.CategoryId;
import pl.io.opinioncollector.domain.product.model.Product;
import pl.io.opinioncollector.domain.product.model.ProductId;

public interface ProductFacade {
    Product getAll();
    Product get(ProductId id);
    void add(Product product);
    void hide(CategoryId id);
    void edit(CategoryId id);
}
