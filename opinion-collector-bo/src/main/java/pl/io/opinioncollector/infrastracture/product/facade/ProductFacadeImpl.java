package pl.io.opinioncollector.infrastracture.product.facade;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.io.opinioncollector.domain.product.ProductFacade;
import pl.io.opinioncollector.domain.product.model.Product;
import pl.io.opinioncollector.infrastracture.product.repository.ProductRepository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

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
        return productRepository.findById(id).orElse(null);
    }

    @Override
    public Product add(Product product) {
        return productRepository.save(product);
    }

    @Override
    @Transactional
    public void hide(long id) {
        Optional<Product> productHide = productRepository.findById(id);
        if (productHide.isPresent()) {
            Product product = productHide.get();
            product.setVisibility(!product.isVisibility());
            productRepository.save(product);
        }
    }

    @Override
    @Transactional
    public Product edit(Product product) {
        //Product productEdited = productRepository.findById(product.getId()).orElseThrow();
        Optional<Product> productEdit = productRepository.findById(product.getId());
        if (productEdit.isPresent()) {
            Product productEdited = productEdit.get();
            productEdited.setCategoryId(product.getCategoryId());
            productEdited.setTitle(product.getTitle());
            productEdited.setOrigin(product.getOrigin());
            productEdited.setImage(product.getImage());
            productEdited.setVisibility(product.isVisibility());
            productEdited.setEan(product.getEan());
            productRepository.save(productEdited);
            return productEdited;
        } else {
            return null;
        }
    }
}
