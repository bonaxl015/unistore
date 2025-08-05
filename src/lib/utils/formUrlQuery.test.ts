import qs from 'query-string';

import { formUrlQuery } from './formUrlQuery';

jest.mock('query-string', () => ({
  parse: jest.fn(),
  stringifyUrl: jest.fn()
}));

describe('Given formUrlQuery', () => {
  const mockParse = qs.parse as jest.Mock;
  const mockStringifyUrl = qs.stringifyUrl as jest.Mock;

  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { pathname: '/test-path' }
    });

    jest.clearAllMocks();
  });

  it('should add a new query param', () => {
    mockParse.mockReturnValue({});
    mockStringifyUrl.mockReturnValue('/test-path?sort=newest');

    const result = formUrlQuery({
      params: '',
      key: 'sort',
      value: 'newest'
    });

    expect(mockParse).toHaveBeenCalledWith('');
    expect(mockStringifyUrl).toHaveBeenCalledWith(
      {
        url: '/test-path',
        query: { sort: 'newest' }
      },
      { skipNull: true }
    );

    expect(result).toBe('/test-path?sort=newest');
  });

  it('should override existing query param', () => {
    mockParse.mockReturnValue({ sort: 'oldest' });
    mockStringifyUrl.mockReturnValue('/test-path?sort=newest');

    const result = formUrlQuery({
      params: '?sort=oldest',
      key: 'sort',
      value: 'newest'
    });

    expect(mockParse).toHaveBeenCalledWith('?sort=oldest');
    expect(mockStringifyUrl).toHaveBeenCalledWith(
      {
        url: '/test-path',
        query: { sort: 'newest' }
      },
      { skipNull: true }
    );

    expect(result).toBe('/test-path?sort=newest');
  });

  it('should remove the key if value is null', () => {
    mockParse.mockReturnValue({ sort: 'newest', page: '2' });
    mockStringifyUrl.mockReturnValue('/test-path?page=2');

    const result = formUrlQuery({
      params: '?sort=newest&page=2',
      key: 'sort',
      value: null
    });

    expect(mockParse).toHaveBeenCalledWith('?sort=newest&page=2');
    expect(mockStringifyUrl).toHaveBeenCalledWith(
      {
        url: '/test-path',
        query: { sort: null, page: '2' }
      },
      { skipNull: true }
    );

    expect(result).toBe('/test-path?page=2');
  });

  it('should keep pathname intact if no query params exist', () => {
    mockParse.mockReturnValue({});
    mockStringifyUrl.mockReturnValue('/test-path?foo=bar');

    const result = formUrlQuery({
      params: '',
      key: 'foo',
      value: 'bar'
    });

    expect(result).toBe('/test-path?foo=bar');
  });
});
