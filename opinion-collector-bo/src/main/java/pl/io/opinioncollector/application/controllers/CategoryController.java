package pl.io.opinioncollector.application.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.io.opinioncollector.domain.category.CategoryFacade;
import pl.io.opinioncollector.domain.category.model.Category;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/categories")
public class CategoryController {
    private final CategoryFacade categoryFacade;

    @GetMapping
    public List<Category> getAllCategories() {
        return categoryFacade.findAll();
    }


    @GetMapping("/{id}")
    public Category getCategory(@PathVariable long id) {
        return categoryFacade.get(id);
    }


    @PostMapping
    public Category addCategory(@RequestBody Category category) {
        return categoryFacade.add(category);
    }


    @PutMapping
    public void editCategory(@RequestBody Category category) {
        categoryFacade.edit(category);
    }


    @PostMapping("/delete")
    public void deleteCategory(@PathVariable long id) {
        categoryFacade.delete(id);
    }

}
