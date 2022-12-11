package pl.io.opinioncollector.infrastracture.category.facade;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.io.opinioncollector.domain.category.CategoryFacade;
import pl.io.opinioncollector.domain.category.model.Category;
import pl.io.opinioncollector.infrastracture.category.repository.CategoryRepository;

import javax.transaction.Transactional;
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
    @Transactional
    public Category add(Category category) {
        if(categoryRepository.findById(category.getCategoryId()).isPresent()) {
            return categoryRepository.save(category);
        }
        else {
            return null;
        }
    }

    @Override
    @Transactional
    public void edit(Category category) {
        if(categoryRepository.findById(category.getCategoryId()).isPresent()) {
            categoryRepository.save(category);
        }
    }

    @Override
    @Transactional
    public void delete(long categoryId) {
        if(categoryRepository.existsById(categoryId)) {
            categoryRepository.delete(get(categoryId));
        }
    }


}
