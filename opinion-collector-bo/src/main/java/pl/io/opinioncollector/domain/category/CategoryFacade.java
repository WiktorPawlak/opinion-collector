package pl.io.opinioncollector.domain.category;

import pl.io.opinioncollector.domain.category.model.Category;
import pl.io.opinioncollector.domain.category.model.CategoryId;

public interface CategoryFacade {
    Category getAll();
    Category get(CategoryId id);
    void create(String name, String parent);
    void hide(CategoryId id);
    void edit(CategoryId id);
}
