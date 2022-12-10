package pl.io.opinioncollector.infrastracture.product.facade;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.io.opinioncollector.domain.product.ProductFacade;
import pl.io.opinioncollector.domain.product.model.Product;
import pl.io.opinioncollector.infrastracture.product.repository.ProductRepository;

import javax.transaction.Transactional;
import java.util.List;

@RequiredArgsConstructor
@Service
public class ProductFacadeImpl implements ProductFacade {

    private final ProductRepository productRepository;

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product getProduct(long id) {
        return productRepository.findById(id).orElseThrow();
    }

    @Override
    public Product add(Product product) {
        return productRepository.save(product);
    }

    @Override
    @Transactional
    public void hide(long id) {
        Product productHide = productRepository.findById(id).orElseThrow();
        productHide.setVisibility(!productHide.isVisibility());
        productRepository.save(productHide);
    }

    @Override
    @Transactional
    public Product edit(Product product) {
        Product productEdited = productRepository.findById(product.getId()).orElseThrow();
        productEdited.setCategoryId(product.getCategoryId());
        productEdited.setTitle(product.getTitle());
        productEdited.setOrigin(product.getOrigin());
        productEdited.setImage(product.getImage());
        productEdited.setVisibility(product.isVisibility());
        productEdited.setEan(product.getEan());
        productRepository.save(productEdited);
        return productEdited;
    }
}
