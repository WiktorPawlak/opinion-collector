package pl.io.opinioncollector.domain.category;

import pl.io.opinioncollector.domain.category.model.Category;
import pl.io.opinioncollector.domain.category.model.CategoryId;

import java.util.List;

public interface CategoryFacade {
    List<Category> findAll();
    Category get(long categoryId);
    Category add(Category category);
    void edit(Category category);

    void delete(long categoryId);
}
