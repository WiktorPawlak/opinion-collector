package pl.io.opinioncollector.infrastracture.product.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.io.opinioncollector.domain.product.model.Product;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    public List<Product> findAllByVisibilityIsTrue();

    public Product findProductByIdAndVisibilityIsTrue(long id);

    List<Product> findAllByCategoryId(long categoryId);
}
