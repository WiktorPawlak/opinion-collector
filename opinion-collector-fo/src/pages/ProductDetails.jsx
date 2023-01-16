import { useCategory } from '../hooks/useCategory';
import { useState } from 'react';
import { useProductOrigins } from '../hooks/useProductOrigins';
import { postProduct } from '../api/productApi';
import { AddProductForm } from '../modules/product-details/components/AddProductForm/AddProductForm';
import css from './ProductDetails.module.scss';
import CopyrightFooter from '../common/layouts/components/CopyrightFooter/CopyrightFooter';
import BgAsset from '../common/images/bg_asset.png';
import { useNavigate } from 'react-router-dom';
import { validateEan, validateOrigin, validateTitle } from '../validators/product/productValidators';

export function ProductDetails() {
  const { categories, categoryLoading } = useCategory();
  const { origins, originLoading } = useProductOrigins();
  const navigate = useNavigate();

  const [categoryId, setCategoryId] = useState('');
  const [title, setTitle] = useState('');
  const [origin, setOrigin] = useState('');
  const [ean, setEan] = useState('');

  const [selectedFile, setSelectedFile] = useState(null);
  const [isFilePicked, setIsFilePicked] = useState(false);

  const [isTitleError, setIsTitleError] = useState(false);
  const [isOriginError, setIsOriginError] = useState(false);
  const [isEanError, setIsEanError] = useState(false);

  function validateForm() {
    let titleVal = !validateTitle(title);
    let originVal = !validateOrigin(origin);
    let eanVal = !validateEan(ean);

    setIsTitleError(titleVal);
    setIsOriginError(originVal);
    setIsEanError(eanVal);

    return !titleVal && !originVal && !eanVal;
  }

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('categoryId', categoryId);
      formData.append('title', title);
      formData.append('origin', origin);
      formData.append('ean', ean);
      navigate(`/products`);
      await postProduct(formData);
    }
  };

  if (categoryLoading) {
    return <p>Loading categories...</p>;
  } else if (originLoading) {
    return <p>Loading origins...</p>;
  }

  return (
    <div className={css.container}>
      <div className={css.title}>
        <h2>Add a new product</h2>
      </div>
      <AddProductForm
        className={css.productForm}
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
        isTitleError={isTitleError}
        isOriginError={isOriginError}
        isEanError={isEanError}
      />
      <div className={css.bgImg}>
        <img src={BgAsset} className={css.bgAsset} alt='Fajne zdjęcie' />
      </div>
      <CopyrightFooter />
    </div>
  );
}
