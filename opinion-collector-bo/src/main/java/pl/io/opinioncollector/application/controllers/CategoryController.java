package pl.io.opinioncollector.application.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.io.opinioncollector.application.dto.CategoryDto;
import pl.io.opinioncollector.domain.category.CategoryFacade;
import pl.io.opinioncollector.domain.category.model.Category;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/categories")
public class CategoryController {
    private final CategoryFacade categoryFacade;

    //@PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    @GetMapping
    public List<Category> getAllCategories() {
        return categoryFacade.findAll();
    }

    //@PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    @GetMapping("/{id}")
    public Category getCategory(@PathVariable long id) {
        return categoryFacade.get(id);
    }

    //@PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    @GetMapping("/path/{id}")
    public String getCategoryPath(@PathVariable long id) {
        return categoryFacade.getPath(id);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping
    public Category addCategory(@RequestBody CategoryDto categoryDto) {
        return categoryFacade.add(categoryDto);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping
    public void editCategory(@RequestBody Category category) {
        categoryFacade.edit(category);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/delete")
    public void deleteCategory(@PathVariable long id) {
        categoryFacade.delete(id);
    }

}
