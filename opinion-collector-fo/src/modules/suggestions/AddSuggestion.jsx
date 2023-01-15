import { useState, useCallback, useEffect } from 'react';
import { apiPostSuggestion } from '../../api/suggestionApi';
import { AddSuggestionForm } from '../suggestions/AddSuggestionForm';
import { useOpinion } from '../../hooks/useOpinion';
import { useNavigate, useParams } from 'react-router-dom';
import { useClient } from '../../hooks/useUser';
import { getWholeProductById } from '../../api/productApi';
import { PageLoad } from '../../pages/PageLoad';
import { useProductOrigins } from '../../hooks/useProductOrigins';
import { useCategory } from '../../hooks/useCategory';

export function AddSuggestion() {
  const { id } = useParams();
  const { client } = useClient();
  const { origins, loading } = useProductOrigins();
  const { categories, loadingCat } = useCategory();

  const [product, setProduct] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [origin, setOrigin] = useState('');
  const [ean, setEan] = useState('');

  const fetchProductData = useCallback(async () => {
    const response = await getWholeProductById(id);
    setProduct(response[0]);
  }, [id]);

  useEffect(() => {
    fetchProductData();
  }, [fetchProductData]);

  useEffect(() => {
    if (product !== null) {
      console.log(product);

      setSelectedFile(product.image);
      setTitle(product.title);
      setCategoryId(product.categoryId);
      setOrigin(product.origin);
      setEan(product.ean);
    }
  }, [product]);

  if (product === null) {
    return <PageLoad />;
  }
  if (loading) {
    return <p>loading origins...</p>;
  }
  if (loadingCat) {
    return <p>loading categories...</p>;
  }

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);

    setIsFilePicked(true);
  };

  const handleSubmit = async (event) => {


    console.log(categoryId);
    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('categoryId', categoryId);
    formData.append('title', title);
    formData.append('origin', origin);
    formData.append('ean', ean);

    //console.log(suggestion);
    await apiPostSuggestion(id, formData);
  };

  return (
    <div className="container flex center-column">
      <AddSuggestionForm
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
        product={product}
      />
    </div>
  );
}
