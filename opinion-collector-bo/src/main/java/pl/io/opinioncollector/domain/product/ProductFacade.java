package pl.io.opinioncollector.domain.product;

import pl.io.opinioncollector.domain.product.model.Product;

import java.util.List;

public interface ProductFacade {
    List<Product> getAllProducts();

    Product getProduct(long id);

    Product add(Product product);

    void hide(long id);

    Product edit(Product product);
}
