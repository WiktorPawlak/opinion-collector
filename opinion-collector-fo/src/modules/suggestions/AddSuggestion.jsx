import { useState, useCallback, useEffect } from 'react';
import { apiPostSuggestion } from '../../api/suggestionApi';
import { AddSuggestionForm } from '../suggestions/AddSuggestionForm';
import { useOpinion } from '../../hooks/useOpinion';
import { useNavigate, useParams } from 'react-router-dom';
import { useClient } from '../../hooks/useUser';
import { getProductById } from '../../api/productApi';
import { PageLoad } from '../../pages/PageLoad';
import { useProductOrigins } from '../../hooks/useProductOrigins';
import { useCategory } from '../../hooks/useCategory';

export function AddSuggestion() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const { client } = useClient();
  const { origins, loading } = useProductOrigins();
  const { categories, loadingCat } = useCategory();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [origin, setOrigin] = useState('');
  const [ean, setEan] = useState('');

  const fetchProductData = useCallback(async () => {
    const response = await getProductById(id);
    setProduct(response[0]);
  }, [id]);

  useEffect(() => {
    fetchProductData();
  }, [fetchProductData]);

  useEffect(() => {
    if (product !== null) {
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
    return <p>loading origins...</p>
  }
  if (loadingCat) {
    return <p>loading categories...</p>
  }


  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const handleSubmit = async (event) => {
    const suggestion = {
      categoryId: categoryId,
      title: title,
      image: 'string',
      origin: origin,
      visibility: product.visibility,
      ean: ean
    };
    console.log(suggestion);
    await apiPostSuggestion(id, suggestion);
  };

  return (
    <div className="container flex center-column">
      <AddSuggestionForm
        handleSubmit={handleSubmit}
        origins={origins}
        categories={categories}
        setSelectedFile={handleFileChange}
        isFilePicked={isFilePicked}
        setTitle={setTitle}
        setCategoryID={setCategoryId}
        setOrigin={setOrigin}
        setEAN={setEan}
        id={id}
        product={product}
      />
    </div>
  );
}
