package pl.io.opinioncollector.application.controllers;


import java.io.IOException;
import java.security.Principal;
import java.util.Arrays;
import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;
import pl.io.opinioncollector.application.dto.ProductDto;
import pl.io.opinioncollector.application.dto.ProductImageDto;
import pl.io.opinioncollector.domain.opinion.OpinionFacade;
import pl.io.opinioncollector.domain.opinion.model.Opinion;
import pl.io.opinioncollector.domain.product.ProductFacade;
import pl.io.opinioncollector.domain.product.model.Product;
import pl.io.opinioncollector.domain.product.model.ProductOrigin;

@RequiredArgsConstructor
@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductFacade productFacade;
    private final OpinionFacade opinionFacade;

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping
    public List<Product> getAllProducts(
        @RequestParam(value = "pageNo", defaultValue = "${paging.defaultPageNo}", required = false) int pageNo,
        @RequestParam(value = "pageSize", defaultValue = "${paging.defaultPageSize}", required = false) int pageSize
    ) {
        return productFacade.getAllProducts(pageNo, pageSize);
    }

    @GetMapping("/visible")
    public List<Product> getAllVisibleProducts(
        @RequestParam(value = "categoryPath", required = false) String categoryPath,
        @RequestParam(value = "pageNo", defaultValue = "${paging.defaultPageNo}", required = false) int pageNo,
        @RequestParam(value = "pageSize", defaultValue = "${paging.defaultPageSize}", required = false) int pageSize
    ) {
        List<Product> products;
        if (categoryPath == null) {
            products = productFacade.getAllVisibleProducts(pageNo, pageSize);
        } else {
            products = productFacade.getAllVisibleProductsByCategoryPath(categoryPath, pageNo, pageSize);
        }
        return products;
    }

    @GetMapping("/origins")
    public List<ProductOrigin> getAllProductOrigins() {
        return Arrays.stream(ProductOrigin.POLAND.getDeclaringClass().getEnumConstants()).toList();
    }

    @GetMapping("/{id}")
    public ProductDto getProduct(@PathVariable long id) {
        return productFacade.getProduct(id);
    }

    @GetMapping("/whole/{id}")
    public Product getWholeProduct(@PathVariable long id) {
        return productFacade.getWholeProduct(id);
    }

    @GetMapping("/visible/{id}")
    public ProductDto getVisibleProduct(@PathVariable long id) {
        return productFacade.getVisibleProduct(id);
    }

    @GetMapping("/category/{id}")
    public List<Product> getAllProductsByCategoryId(@PathVariable long id) {
        return productFacade.getAllProductsByCategoryId(id);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping(consumes = "multipart/form-data")
    public Product addProduct(@RequestParam("image") MultipartFile file,
                              @RequestParam("categoryId") long categoryId,
                              @RequestParam("title") String title,
                              @RequestParam("origin") String origin,
                              @RequestParam("ean") String ean) throws IOException {
        var productImageDto = ProductImageDto.builder()
            .image(file)
            .title(title)
            .categoryId(categoryId)
            .origin(ProductOrigin.valueOf(origin))
            .ean(ean)
            .build();
        return productFacade.add(productImageDto);
    }



    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/hide/{id}")
    public void hideProduct(@PathVariable long id) {
        productFacade.hide(id);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping
    public Product editProduct(@RequestBody Product product) {
        return productFacade.edit(product);
    }

    @GetMapping("/opinions/{id}")
    public List<Opinion> getOpinionsForProductId(@PathVariable long id) {
        return opinionFacade.getFor(id);
    }

    @GetMapping("/opinions/visible/{id}")
    public List<Opinion> getVisibleOpinionsForProductId(@PathVariable long id) {
        return opinionFacade.getVisibleFor(id);
    }

    @GetMapping("/starAverage")
    public double starAverage(@RequestParam long id) {
        return opinionFacade.starAverage(id);
    }
}

