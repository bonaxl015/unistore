import { useEffect, useState, useCallback } from 'react';

import { fetchAPIData } from '@/services';

export default function useFetchAPIData<Data>(url: string | null) {
  const [data, setData] = useState<Data | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>();

  const fetchAPI = useCallback(async () => {
    setIsLoading(true);
    const responseData = await fetchAPIData(url)
      .catch((error: unknown) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });

    setData(responseData);
  }, [url]);

  useEffect(() => {
    fetchAPI();
  }, [fetchAPI]);

  return { data, isLoading, error };
}
