import { useCallback, useEffect, useState } from 'react';
import { getProductOrigins, putProduct } from '../api/productApi';

export function useProductOrigins() {
  const [origins, setOrigins] = useState([]);
  const [loading, setLoading] = useState(true);

  const getOrigins = useCallback(async () => {
    const response = await getProductOrigins();

    if (response[1] === 200) {
      setOrigins(response[0]);
      setLoading(false);
    }
  }, []);

  const editProduct = useCallback(async () => {
    const response = await putProduct();
    return response === 200;
  }, []);

  useEffect(() => {
    getOrigins();
  }, [getOrigins]);

  return { origins, loading, editProduct };
}
