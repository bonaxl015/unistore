import { useEffect, useState, useCallback } from 'react';

import { fetchAPIData } from '@/services';

export default function useFetchAPIData<Data>(url: string | null) {
  const [data, setData] = useState<Data | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>();

  const fetchAPI = useCallback(async () => {
    setIsLoading(true);
    fetchAPIData(url)
      .then((responseData: Data) => {
        setData(responseData);
      })
      .catch((error: unknown) => {
        setData(null);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [url]);

  useEffect(() => {
    fetchAPI();
  }, [fetchAPI]);

  return { data, isLoading, error };
}
