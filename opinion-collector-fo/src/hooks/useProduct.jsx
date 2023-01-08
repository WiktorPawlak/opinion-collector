import { postProduct } from '../api/productApi';
import { useCallback, useState } from 'react';

export function useProduct() {
  const [product, setProduct] = useState();

  const addProduct = useCallback(async (product) => {
    if (product) {
      const response = await postProduct(product);

      if (response[1] === 200) {
        setProduct(response[0]);
        return true;
      } else {
        console.log('No such product');
        return false;
      }
    }
  }, []);

  return { product, addProduct };
}
