import { useCategory } from '../hooks/useCategory';
import { useState } from 'react';
import { useProductOrigins } from '../hooks/useProductOrigins';
import { postProduct } from '../api/productApi';
import { AddProductForm } from '../modules/product-details/components/AddProductForm/AddProductForm';

export function EditProductDetails() {
  const { categories, categoryLoading } = useCategory();
  const { origins, originLoading } = useProductOrigins();

  const [categoryId, setCategoryId] = useState('');
  const [title, setTitle] = useState('');
  const [origin, setOrigin] = useState('');
  const [ean, setEan] = useState('');

  const [selectedFile, setSelectedFile] = useState(null);
  const [isFilePicked, setIsFilePicked] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('categoryId', categoryId);
    formData.append('title', title);
    formData.append('origin', origin);
    formData.append('ean', ean);
    await postProduct(formData);
  };

  if (categoryLoading) {
    return <p>Loading categories...</p>;
  } else if (originLoading) {
    return <p>Loading origins...</p>;
  }

  return (
    <div className="container flex center-column">
      <AddProductForm
        handleSubmit={handleSubmit}
        handleFileChange={handleFileChange}
        isFilePicked={isFilePicked}
        categories={categories}
        origins={origins}
        selectedFile={selectedFile}
        setCategoryId={setCategoryId}
        setEan={setEan}
        setOrigin={setOrigin}
        setTitle={setTitle}
      />
    </div>
  );
}
