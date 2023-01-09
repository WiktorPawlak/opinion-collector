package pl.io.opinioncollector.infrastracture.product.facade;

import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Collections;
import java.util.List;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;

import org.springframework.core.io.Resource;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import pl.io.opinioncollector.application.dto.ProductDto;
import pl.io.opinioncollector.application.dto.ProductImageDto;
import pl.io.opinioncollector.domain.category.CategoryFacade;
import pl.io.opinioncollector.domain.category.model.Category;
import pl.io.opinioncollector.domain.product.ProductFacade;
import pl.io.opinioncollector.domain.product.model.Product;
import pl.io.opinioncollector.infrastracture.product.repository.ProductRepository;

@RequiredArgsConstructor
@Service
@Slf4j
public class ProductFacadeImpl implements ProductFacade {

    private final ProductRepository productRepository;
    private final CategoryFacade categoryFacade;

    @Override
    public List<Product> getAllProducts(int pageNo, int pageSize) {
        PageRequest pageRequest = PageRequest.of(pageNo, pageSize);
        return productRepository.findAll(pageRequest).getContent();
    }

    @Override
    public List<Product> getAllProductsByCategoryId(long id) {
        if (!productRepository.findAllByCategoryId(id).isEmpty())
            return productRepository.findAllByCategoryId(id);
        else return Collections.emptyList();
    }

    @Override
    public ProductDto getProduct(long id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Entity with given id doesn't exist"));
        return toProduct(product);
    }

    @Override
    public Product add(ProductImageDto productDto) throws IOException {

        final Resource image = productDto.getImage().getResource();
        final String imagePath = "../opinion-collector-fo/public/assets/images/" + image.getFilename();
        try (FileOutputStream fos = new FileOutputStream(imagePath)) {
            fos.write(productDto.getImage().getBytes());
        }

        var product = Product.builder()
            .categoryId(productDto.getCategoryId())
            .title(productDto.getTitle())
            .origin(productDto.getOrigin())
            .ean(productDto.getEan())
            .image("/assets/images/" + image.getFilename())
            .build();
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
    public List<Product> getAllVisibleProducts(int pageNo, int pageSize) {
        PageRequest pageRequest = PageRequest.of(pageNo, pageSize);
        return productRepository.findAllByVisibilityIsTrue(pageRequest);
    }

    @Override
    public List<Product> getAllVisibleProductsByCategoryPath(String categoryPath, int pageNo, int pageSize) {
        PageRequest pageRequest = PageRequest.of(pageNo, pageSize);
        List<Long> categoriesIds = categoryFacade.findByPath(categoryPath)
            .stream().map(Category::getCategoryId).toList();
        return productRepository.findAllByVisibilityIsTrueAndCategoryIdIn(categoriesIds, pageRequest);
    }

    @Override
    public ProductDto getVisibleProduct(long id) {
        Product product = productRepository.findProductByIdAndVisibilityIsTrue(id);
        return toProduct(product);
    }

    private ProductDto toProduct(final Product product) {
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
