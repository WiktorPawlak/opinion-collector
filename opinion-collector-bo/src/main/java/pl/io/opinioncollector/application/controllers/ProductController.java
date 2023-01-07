package pl.io.opinioncollector.application.controllers;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import pl.io.opinioncollector.application.dto.ProductDto;
import pl.io.opinioncollector.domain.opinion.OpinionFacade;
import pl.io.opinioncollector.domain.opinion.model.Opinion;
import pl.io.opinioncollector.domain.product.ProductFacade;
import pl.io.opinioncollector.domain.product.model.Product;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductFacade productFacade;
    private final OpinionFacade opinionFacade;

    @GetMapping
    public List<Product> getAllProducts() {
        return productFacade.getAllProducts();
    }

    @GetMapping("/{id}")
    public ProductDto getProduct(@PathVariable long id) {
        return productFacade.getProduct(id);
    }

    @PostMapping
    public Product addProduct(@RequestBody Product product) {
        return productFacade.add(product);
    }

    @PutMapping("/hide")
    public void hideProduct(@RequestParam long id) {
        productFacade.hide(id);
    }

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
