import { fetchAPIData } from '.';

describe('Given fetchAPIData function', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should throw an error if the URL is null', async () => {
    await expect(fetchAPIData(null)).rejects.toThrow('API URL is required');
  });

  it('should throw an error if the fetch request fails', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false
    });

    await expect(fetchAPIData('https://api.example.com')).rejects.toThrow(
      'Failed to fetch data'
    );
  });

  it('should return JSON data if the fetch request is successful', async () => {
    const mockData = { message: 'Success' };

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockData)
    });

    const result = await fetchAPIData('https://api.example.com');
    expect(result).toEqual(mockData);
  });
});
