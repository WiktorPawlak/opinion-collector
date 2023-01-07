package pl.io.opinioncollector.infrastracture.product.facade;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import pl.io.opinioncollector.application.dto.ProductDto;
import pl.io.opinioncollector.domain.category.CategoryFacade;
import pl.io.opinioncollector.domain.product.ProductFacade;
import pl.io.opinioncollector.domain.product.model.Product;
import pl.io.opinioncollector.infrastracture.product.repository.ProductRepository;

@RequiredArgsConstructor
@Service
public class ProductFacadeImpl implements ProductFacade {

    private final ProductRepository productRepository;
    private final CategoryFacade categoryFacade;

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    //TODO
    //public List<Product> getAllProductsByCategoryId()
    //findALlByCategoryId

    @Override
    public ProductDto getProduct(long id) {
        Product product = productRepository.findById(id).orElseThrow();
        return ProductDto.builder()
            .id(product.getId())
            .title(product.getTitle())
            .ean(product.getEan())
            .image(product.getImage())
            .origin(product.getOrigin())
            .visibility(product.isVisibility())
            .category(categoryFacade.getPath(product.getCategoryId()))
            .build();
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
