package pl.io.opinioncollector.domain.product;

import java.io.IOException;
import java.util.List;

import pl.io.opinioncollector.application.dto.ProductDto;
import pl.io.opinioncollector.application.dto.ProductImageDto;
import pl.io.opinioncollector.domain.product.model.Product;

public interface ProductFacade {
    List<Product> getAllProducts(int pageNo, int pageSize);

    ProductDto getProduct(long id);
    Product getWholeProduct(long id);

    Product add(ProductImageDto product) throws IOException;

    void hide(long id);

    Product edit(Product product);
    void edit(ProductImageDto product) throws IOException;

    List<Product> getAllVisibleProducts(int pageNo, int pageSize);

    List<Product> getAllVisibleProductsByCategoryPath(String categoryPath, int pageNo, int pageSize);

    ProductDto getVisibleProduct(long id);

    List<Product> getAllProductsByCategoryId(long id);
}
