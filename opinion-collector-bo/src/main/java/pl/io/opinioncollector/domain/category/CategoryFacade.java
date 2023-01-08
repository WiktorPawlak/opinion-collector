package pl.io.opinioncollector.domain.category;

import pl.io.opinioncollector.application.dto.CategoryDto;
import pl.io.opinioncollector.domain.category.model.Category;
import pl.io.opinioncollector.domain.category.model.CategoryId;

import java.util.List;

public interface CategoryFacade {
    List<Category> findAll();
    List<Category> findByPath(String path);
    Category get(long categoryId);
    String getPath(long categoryId);
    Category add(CategoryDto categoryDto);
    void edit(Category category);

    void delete(long categoryId);
}
