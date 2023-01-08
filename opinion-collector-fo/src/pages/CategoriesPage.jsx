import { useEffect } from 'react';
import { useState } from 'react';
import { apiGetCategories } from '../api/categoryApi';
import { useCallback } from 'react';
import { Container } from '@mui/system';
import { CategoriesList } from '../modules/categories/components/CategoriesList/CategoriesList';

export const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategoriesData = useCallback(async () => {
    const response = await apiGetCategories();
    setCategories(response[0]);
  }, []);

  useEffect(() => {
    fetchCategoriesData();
  }, [fetchCategoriesData]);

  return (
    <Container>
      <CategoriesList categories={categories} />
    </Container>
  );
};
