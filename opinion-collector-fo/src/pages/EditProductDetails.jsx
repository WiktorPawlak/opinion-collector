import { useCategory } from '../hooks/useCategory';
import { useState, useEffect } from 'react';
import { useProductOrigins } from '../hooks/useProductOrigins';
import { putProduct, getProductById } from '../api/productApi';
import { EditProductForm } from '../modules/product-details/components/EditProductForm/EditProductForm';
import css from './EditProductDetails.module.scss';
import CopyrightFooter from '../common/layouts/components/CopyrightFooter/CopyrightFooter';
import BgAsset from '../common/images/bg_asset.png';
import { useNavigate, useParams } from 'react-router-dom';

export function EditProductDetails() {
  const { categories, categoryLoading } = useCategory();
  const { origins, originLoading } = useProductOrigins();
  const navigate = useNavigate();
  const { id } = useParams();

  const [productById, setProductById] = useState();
  const [categoryId, setCategoryId] = useState('');
  const [title, setTitle] = useState('');
  const [origin, setOrigin] = useState('');
  const [ean, setEan] = useState('');

  const [selectedFile, setSelectedFile] = useState(null);
  const [isFilePicked, setIsFilePicked] = useState(false);

  const findProductById = async () => {
    let response;
    response = await getProductById(id);
    if (response[1] === 200) {
      setProductById(response[0]);
    } else {
      console.log('Nie ma takiego produktu');
    }
  };

  useEffect(() => {
    findProductById();
  }, [findProductById]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('categoryId', categoryId);
    formData.append('id', id);
    formData.append('title', title);
    formData.append('origin', origin);
    formData.append('ean', ean);
    navigate('/products');
    await putProduct(Object.fromEntries(formData));
  };

  if (categoryLoading) {
    return <p>Loading categories...</p>;
  } else if (originLoading) {
    return <p>Loading origins...</p>;
  }

  return (
    <div className={css.container}>
      <div className={css.title}>
        <h2>Edit a product</h2>
      </div>
      <EditProductForm
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
        id={id}
      />
      <div className={css.bgImg}>
        <img src={BgAsset} className={css.bgAsset} alt="Fajne zdjęcie" />
      </div>
      <CopyrightFooter />
    </div>
  );
}
