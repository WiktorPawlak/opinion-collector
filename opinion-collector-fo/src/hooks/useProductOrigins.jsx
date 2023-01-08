import { useCallback, useEffect, useState } from 'react';
import { getProductOrigins } from '../api/productApi';

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

  useEffect(() => {
    getOrigins();
  }, [getOrigins]);

  return { origins, loading };
}
