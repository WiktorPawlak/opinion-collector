import { useCategory } from '../hooks/useCategory';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { apiGetCategories, postCategory, putCategory } from '../api/categoryApi';
import { EditCategoryForm } from '../modules/categories/components/EditCategory/EditCategoryForm';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export function EditCategory() {
    const { id } = useParams();

    const { categories, categoryLoading } = useCategory();

    const [ parent, setParent ] = useState(null);
    const [ categoryName, setCategoryName ] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
      setParent(location.state.parent);
      setCategoryName(location.state.categoryName);
    }, [location.state.parent, location.state.categoryName])

    const filteredCategories = useMemo(() => {
      return categories.filter(
        (category) => !category.categoryPath.includes(location.state.categoryPath)
      );
    }, [categories]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        let parentId = "";
        if (parent !== null) {
          parentId = parent.categoryId;
        }

        const formData = new FormData();
        formData.append('categoryId', id);
        formData.append('parentId', parentId);
        formData.append('categoryName', categoryName);
        await putCategory(Object.fromEntries(formData));
        navigate('/categories');
      };

      if (categoryLoading) {
        return <p>Loading categories...</p>;
      }

      return (
        <div className="container flex center-column">
          <EditCategoryForm
            handleSubmit={handleSubmit}
            categories={filteredCategories}
            setParent={setParent}
            setCategoryName={setCategoryName}
            parent={parent}
            categoryName={categoryName}
          />
        </div>
      );
}
