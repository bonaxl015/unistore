import { renderHook, waitFor } from '@testing-library/react';

import { fetchAPIData } from '@/services';

import useFetchAPIData from '../useFetchAPIData';

jest.mock('@/services', () => ({
  fetchAPIData: jest.fn()
}));

describe('Given useFetchAPIData hook', () => {
  const mockData = { message: 'Hello, World!' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should set loading to true initially and fetch data successfully', async () => {
    (fetchAPIData as jest.Mock).mockResolvedValue(mockData);

    const { result } = renderHook(() =>
      useFetchAPIData<typeof mockData>('https://api.example.com')
    );

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeUndefined();

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(fetchAPIData).toHaveBeenCalledWith('https://api.example.com');
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeUndefined();
  });

  it('should handle errors during fetch', async () => {
    const mockError = new Error('Fetch failed');
    (fetchAPIData as jest.Mock).mockRejectedValue(mockError);

    const { result } = renderHook(() =>
      useFetchAPIData('https://api.example.com')
    );

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeUndefined();

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(fetchAPIData).toHaveBeenCalledWith('https://api.example.com');
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe(mockError);
  });

  it('should not call fetch if url is null', async () => {
    const { result } = renderHook(() => useFetchAPIData(null));

    expect(fetchAPIData).toHaveBeenCalledWith(null);
    expect(result.current.data).toBeNull();
  });
});
