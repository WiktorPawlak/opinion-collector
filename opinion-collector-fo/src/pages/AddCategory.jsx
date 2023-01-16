import { useCategory } from '../hooks/useCategory';
import { useState } from 'react';
import { postCategory } from '../api/categoryApi';
import { AddCategoryForm } from '../modules/categories/components/AddCategory/AddCategoryForm';
import { useNavigate } from 'react-router-dom';
import { validateCategoryName } from '../validators/category/categoryValidators';

export function AddCategory() {
  const { categories, categoryLoading } = useCategory();

  const [categoryId, setCategoryId] = useState('');
  const [parentId, setParentId] = useState('');
  const [categoryName, setCategoryName] = useState('');

  const [isCategoryNameError, setIsCategoryNameError] = useState(false);

  const navigate = useNavigate();

  function validateForm() {
    let categoryNameVal = !validateCategoryName(categoryName);

    setIsCategoryNameError(categoryNameVal);

    return !categoryNameVal;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      const formData = new FormData();
      formData.append('categoryId', categoryId);
      formData.append('parentId', parentId);
      formData.append('categoryName', categoryName);
      await postCategory(Object.fromEntries(formData));
      navigate('/categories');
    }
  };

  if (categoryLoading) {
    return <p>Loading categories...</p>;
  }

  return (
    <div className='container flex center-column'>
      <AddCategoryForm
        handleSubmit={handleSubmit}
        categories={categories}
        setParentId={setParentId}
        setCategoryName={setCategoryName}
        isCategoryNameError={isCategoryNameError}
      />
    </div>
  );
}
