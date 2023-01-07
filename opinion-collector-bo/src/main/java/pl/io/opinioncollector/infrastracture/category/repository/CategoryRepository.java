package pl.io.opinioncollector.infrastracture.category.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.io.opinioncollector.domain.category.model.Category;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findByParentCategoryId(long parentId);
    List<Category> findByParentIsNull();
}
