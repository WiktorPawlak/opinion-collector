package pl.io.opinioncollector.infrastracture.product.facade;

import java.util.Collections;
import java.util.List;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import pl.io.opinioncollector.application.dto.ProductDto;
import pl.io.opinioncollector.domain.category.CategoryFacade;
import pl.io.opinioncollector.domain.product.ProductFacade;
import pl.io.opinioncollector.domain.product.model.Product;
import pl.io.opinioncollector.infrastracture.product.repository.ProductRepository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Slf4j
public class ProductFacadeImpl implements ProductFacade {

    private final ProductRepository productRepository;
    private final CategoryFacade categoryFacade;

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public List<Product> getAllProductsByCategoryId(long id) {
        if(!productRepository.findAllByCategoryId(id).isEmpty())
        return productRepository.findAllByCategoryId(id);
        else return null;
    }

    @Override
    public ProductDto getProduct(long id) {

        Product product = productRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Entity with given id doesn't exist"));
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
        Product productHide = productRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Entity with given id doesn't exist"));
            productHide.setVisibility(!productHide.isVisibility());
            productRepository.save(productHide);
        }

    @Override
    @Transactional
    public Product edit(Product product) {
        Product productEdited = productRepository.findById(product.getId()).orElseThrow(() -> new EntityNotFoundException("Entity with given id doesn't exist"));
            productEdited.setCategoryId(product.getCategoryId());
            productEdited.setTitle(product.getTitle());
            productEdited.setOrigin(product.getOrigin());
            productEdited.setImage(product.getImage());
            productEdited.setVisibility(product.isVisibility());
            productEdited.setEan(product.getEan());
            productRepository.save(productEdited);
            return productEdited;
    }

    @Override
    public List<Product> getAllVisibleProducts() {
        return productRepository.findAllByVisibilityIsTrue();
    }

    @Override
    public ProductDto getVisibleProduct(long id) {
        Product product = productRepository.findProductByIdAndVisibilityIsTrue(id);
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
}
