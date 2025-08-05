import { formatId } from './formatId';

describe('Given formatId', () => {
  it('should return last 6 characters prefixed with ".."', () => {
    expect(formatId('abc123456789')).toBe('..456789');
    expect(formatId('mycustomid123')).toBe('..mid123');
  });

  it('should return entire string if it has exactly 6 characters', () => {
    expect(formatId('123456')).toBe('..123456');
  });

  it('should return partial string if input is less than 6 characters', () => {
    expect(formatId('abc')).toBe('..abc');
    expect(formatId('')).toBe('..');
  });

  it('should not throw for empty or undefined-like values', () => {
    expect(() => formatId('')).not.toThrow();
    expect(() => formatId('a')).not.toThrow();
  });
});
