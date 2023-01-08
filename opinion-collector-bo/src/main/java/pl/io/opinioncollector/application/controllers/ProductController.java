package pl.io.opinioncollector.application.controllers;


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

import lombok.RequiredArgsConstructor;
import pl.io.opinioncollector.application.dto.ProductDto;
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
        @RequestParam(value = "pageNo", defaultValue = "${paging.defaultPageNo}", required = false) int pageNo,
        @RequestParam(value = "pageSize", defaultValue = "${paging.defaultPageSize}", required = false) int pageSize
    ) {
        return productFacade.getAllVisibleProducts(pageNo, pageSize);
    }

    @GetMapping("/category/visible")
    public List<Product> getAllVisibleProductsByCategoryPath(
        @RequestParam(value = "categoryPath") String categoryPath,
        @RequestParam(value = "pageNo", defaultValue = "${paging.defaultPageNo}", required = false) int pageNo,
        @RequestParam(value = "pageSize", defaultValue = "${paging.defaultPageSize}", required = false) int pageSize
    ) {
        return productFacade.getAllVisibleProductsByCategoryPath(categoryPath, pageNo, pageSize);
    }

    @GetMapping("/origins")
    public List<ProductOrigin> getAllProductOrigins() {
        return Arrays.stream(ProductOrigin.POLAND.getDeclaringClass().getEnumConstants()).toList();
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/{id}")
    public ProductDto getProduct(@PathVariable long id) {
        return productFacade.getProduct(id);
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
    @PostMapping
    public Product addProduct(@RequestBody Product product) {
        return productFacade.add(product);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/hide")
    public void hideProduct(@RequestParam long id) {
        productFacade.hide(id);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping
    public Product editProduct(@RequestBody Product product) {
        return productFacade.edit(product);
    }

    @GetMapping("/opinions")
    public List<Opinion> getOpinionsForProductId(@RequestParam long id) {
        return opinionFacade.getFor(id);
    }

    @GetMapping("/starAverage")
    public double starAverage(@RequestParam long id) {
        return opinionFacade.starAverage(id);
    }
}
