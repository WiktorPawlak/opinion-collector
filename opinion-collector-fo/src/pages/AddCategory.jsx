import { useCategory } from '../hooks/useCategory';
import { useState } from 'react';
import { postCategory } from '../api/categoryApi';
import { AddCategoryForm } from '../modules/categories/components/AddCategory/AddCategoryForm';

export function AddCategory() {
    const { categories, categoryLoading } = useCategory();

    const [ categoryId, setCategoryId ] = useState('');
    const [ parentId, setParentId ] = useState('');
    const [ categoryName, setCategoryName ] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formData = new FormData();
        formData.append('categoryId', categoryId);
        formData.append('parentId', parentId);
        formData.append('categoryName', categoryName);
        await postCategory(Object.fromEntries(formData));
      };
    
      if (categoryLoading) {
        return <p>Loading categories...</p>;
      }
    
      return (
        <div className="container flex center-column">
          <AddCategoryForm
            handleSubmit={handleSubmit}
            categories={categories}
            setCategoryId={setCategoryId}
            setParentId={setParentId}
            setCategoryName={setCategoryName}
          />
        </div>
      );
}
