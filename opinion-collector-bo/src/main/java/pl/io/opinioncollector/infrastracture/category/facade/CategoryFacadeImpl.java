package pl.io.opinioncollector.infrastracture.category.facade;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.io.opinioncollector.domain.category.CategoryFacade;
import pl.io.opinioncollector.domain.category.model.Category;
import pl.io.opinioncollector.infrastracture.category.repository.CategoryRepository;

import java.util.List;
@Service
@RequiredArgsConstructor
public class CategoryFacadeImpl implements CategoryFacade {

    private final CategoryRepository categoryRepository;

    @Override
    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    @Override
    public Category get(long categoryId) {
        return categoryRepository.findById(categoryId).orElse(null);
    }

    @Override
    public Category add(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public void edit(Category category) {
        categoryRepository.save(category);
    }

    @Override
    public void delete(long categoryId) {
        categoryRepository.delete(get(categoryId));
    }
}
