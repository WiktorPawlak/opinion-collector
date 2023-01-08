package pl.io.opinioncollector.infrastracture.category.facade;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import pl.io.opinioncollector.application.dto.CategoryDto;
import pl.io.opinioncollector.domain.category.CategoryFacade;
import pl.io.opinioncollector.domain.category.model.Category;
import pl.io.opinioncollector.infrastracture.category.repository.CategoryRepository;

@Service
@RequiredArgsConstructor
public class CategoryFacadeImpl implements CategoryFacade {

    private final CategoryRepository categoryRepository;

    @Override
    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    @Override
    public List<Category> findByPath(String path) {
        // TODO: create repository method
        //categoryRepository.findByCategoryPathStartsWith(path);
        return null;
    }

    @Override
    public Category get(long categoryId) {
        return categoryRepository.findById(categoryId).orElse(null);
    }

    @Override
    public String getPath(long categoryId) {
        Category category = categoryRepository.findById(categoryId).orElse(null);
        if (category == null) {
            return null;
        }

        List<Category> categoryList = getFamily(category);
        return prepareCategoriesPath(categoryList);
    }

    private List<Category> getFamily(Category category) {
        List<Category> categoryList = new ArrayList<>(List.of(category));
        while (category.getParent() != null) {
            category = category.getParent();
            categoryList.add(category);
        }

        Collections.reverse(categoryList);
        return categoryList;
    }

    private String prepareCategoriesPath(List<Category> categoryList) {
        StringBuilder path = new StringBuilder();
        for (int i = 0; i < categoryList.size(); i++) {
            path.append(categoryList.get(i).getCategoryName());
            if (i < categoryList.size() - 1)
                path.append(" > ");
        }
        return path.toString();
    }

    @Override
    @Transactional
    public Category add(CategoryDto categoryDto) {
        Category parent = get(categoryDto.getParentId());
        Category category = Category.builder()
            .categoryId(categoryDto.getCategoryId())
            .categoryName(categoryDto.getCategoryName())
            .parent(get(categoryDto.getParentId()))
            .leaf(true)
            .build();

        if (checkIfSameExists(category)) {
            return null;
        }

        Category categoryToReturn = categoryRepository.save(category);
        if (parent != null) {
            parent.setLeaf(false);
            edit(parent);
        }
        return categoryToReturn;
    }

    private boolean checkIfSameExists(Category category) {
        String categoryName = category.getCategoryName();

        List<Category> sameParentCategories;
        if (category.getParent() == null) {
            sameParentCategories = categoryRepository.findByParentIsNull();
        } else {
            sameParentCategories = categoryRepository.findByParentCategoryId(category.getParent().getCategoryId());
        }

        for (Category possibleSameNameCategory : sameParentCategories) {
            if (possibleSameNameCategory.getCategoryName().equals(categoryName))
                return true;
        }
        return false;
    }

    @Override
    @Transactional
    public void edit(Category category) {
        if (categoryRepository.findById(category.getCategoryId()).isPresent()) {
            categoryRepository.save(category);
        }
    }

    @Override
    @Transactional
    public void delete(long categoryId) {
        Category category = get(categoryId);
        if (categoryRepository.existsById(categoryId) && (category.isLeaf())) {
            categoryRepository.delete(get(categoryId));
        }
    }


}
