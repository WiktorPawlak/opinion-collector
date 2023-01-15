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
        return categoryRepository.findByCategoryPathStartingWith(path);
    }

    @Override
    public Category get(long categoryId) {
        return categoryRepository.findById(categoryId).orElse(null);
    }

    @Override
    public String getPath(long categoryId) {
        Category category = categoryRepository.findById(categoryId).orElse(null);
        if (category != null) {
            return category.getCategoryPath();
        }
        return null;
    }

    private String preparePath(String categoryName, Category parent) {
        if (categoryName == null) {
            return null;
        }

        if (parent == null) {
            return categoryName;
        }

        List<Category> categoryList = getFamily(parent);
        return prepareCategoriesPath(categoryList, categoryName);
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

    private String prepareCategoriesPath(List<Category> categoryList, String categoryName) {
        StringBuilder path = new StringBuilder();
        for (Category category : categoryList) {
            path.append(category.getCategoryName());
            path.append(" > ");
        }
        return path + categoryName;
    }

    @Override
    @Transactional
    public Category add(CategoryDto categoryDto) {
        Category parent = get(categoryDto.getParentId());
        Category category = Category.builder()
            .categoryId(categoryDto.getCategoryId())
            .categoryName(categoryDto.getCategoryName())
            .categoryPath(preparePath(categoryDto.getCategoryName(), parent))
            .parent(parent)
            .leaf(true)
            .build();

        if (checkIfSameExists(category)) {
            return null;
        }

        Category categoryToReturn = categoryRepository.save(category);
        if (parent != null) {
            parent.setLeaf(false);
            editInternal(parent);
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
    public void edit(CategoryDto categoryDto) {
        if (categoryRepository.findById(categoryDto.getCategoryId()).isPresent()) {
            Category category = get(categoryDto.getCategoryId());
            category.setCategoryId(categoryDto.getCategoryId());
            category.setCategoryName(categoryDto.getCategoryName());

            Category oldParent = category.getParent();
            if (oldParent != null && categoryRepository.findByParentCategoryId(oldParent.getCategoryId()).size() <= 1) {
                oldParent.setLeaf(true);
                categoryRepository.save(oldParent);
            }
            Category newParent = get(categoryDto.getParentId());
            if (newParent != null && newParent.isLeaf()) {
                newParent.setLeaf(false);
                categoryRepository.save(newParent);
            }

            category.setParent(newParent);
            categoryRepository.save(category);
        }
    }

    @Transactional
    void editInternal(Category category) {
        if (categoryRepository.findById(category.getCategoryId()).isPresent()) {
            categoryRepository.save(category);
        }
    }

    @Override
    @Transactional
    public void delete(long categoryId) {
        if (categoryRepository.existsById(categoryId)) {
            Category category = get(categoryId);
            if (category.isLeaf()) {
                Category parent = category.getParent();
                if (parent != null && categoryRepository.findByParentCategoryId(parent.getCategoryId()).size() <= 1) {
                    parent.setLeaf(true);
                    editInternal(parent);
                }
                categoryRepository.delete(get(categoryId));
            }
        }
    }

}
