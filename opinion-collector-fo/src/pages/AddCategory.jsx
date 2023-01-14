import { useCategory } from '../hooks/useCategory';
import { useState } from 'react';
import { postCategory } from '../api/categoryApi';
import { AddCategoryForm } from '../modules/categories/components/AddCategory/AddCategoryForm';
import { useNavigate } from 'react-router-dom';

export function AddCategory() {
    const { categories, categoryLoading } = useCategory();

    const [ categoryId, setCategoryId ] = useState('');
    const [ parentId, setParentId ] = useState('');
    const [ categoryName, setCategoryName ] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('categoryId', categoryId);
        formData.append('parentId', parentId);
        formData.append('categoryName', categoryName);
        await postCategory(Object.fromEntries(formData));
        navigate('/categories');
      };

      if (categoryLoading) {
        return <p>Loading categories...</p>;
      }

      return (
        <div className="container flex center-column">
          <AddCategoryForm
            handleSubmit={handleSubmit}
            categories={categories}
            setParentId={setParentId}
            setCategoryName={setCategoryName}
          />
        </div>
      );
}
