package pl.io.opinioncollector.domain.product;

import pl.io.opinioncollector.application.dto.ProductDto;
import pl.io.opinioncollector.domain.product.model.Product;

import java.util.List;

public interface ProductFacade {
    List<Product> getAllProducts(int pageNo, int pageSize);

    ProductDto getProduct(long id);

    Product add(Product product);

    void hide(long id);

    Product edit(Product product);

    List<Product> getAllVisibleProducts(int pageNo, int pageSize);

    List<Product> getAllVisibleProductsByCategoryPath(String categoryPath, int pageNo, int pageSize);

    ProductDto getVisibleProduct(long id);

    List<Product> getAllProductsByCategoryId(long id);
}
