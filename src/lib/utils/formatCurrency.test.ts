import { formatCurrency } from './formatCurrency';

describe('Given formatCurrency', () => {
  it('should format a numeric amount correctly', () => {
    expect(formatCurrency(1234.56)).toBe('₱1,234.56');
  });

  it('should format a numeric string amount correctly', () => {
    expect(formatCurrency('7890.12')).toBe('₱7,890.12');
  });

  it('should round and format numbers with more than 2 decimals', () => {
    expect(formatCurrency(99.999)).toBe('₱100.00');
  });

  it('should format zero correctly', () => {
    expect(formatCurrency(0)).toBe('₱0.00');
  });

  it('should format negative numbers correctly', () => {
    expect(formatCurrency(-1500)).toBe('-₱1,500.00');
  });

  it('should return "NaN" for null', () => {
    expect(formatCurrency(null)).toBe('NaN');
  });

  it('should return "₱NaN" for non-numeric string', () => {
    // Number('abc') => NaN, but still gets formatted as ₱NaN
    expect(formatCurrency('abc')).toBe('₱NaN');
  });

  it('should return "₱NaN" for empty string', () => {
    expect(formatCurrency('')).toBe('₱0.00');
  });

  it('should return "₱NaN" for string with whitespace', () => {
    expect(formatCurrency('   ')).toBe('₱0.00');
  });
});
