import { formatNumber } from './formatNumber';

describe('Given formatNumber', () => {
  it('should format basic whole numbers with commas', () => {
    expect(formatNumber(1000)).toBe('1,000');
    expect(formatNumber(1234567)).toBe('1,234,567');
  });

  it('should format small numbers without commas', () => {
    expect(formatNumber(12)).toBe('12');
    expect(formatNumber(0)).toBe('0');
  });

  it('should format negative numbers correctly', () => {
    expect(formatNumber(-123456)).toBe('-123,456');
  });

  it('should format large numbers', () => {
    expect(formatNumber(9876543210)).toBe('9,876,543,210');
  });

  it('should return "NaN" for NaN input', () => {
    expect(formatNumber(NaN)).toBe('NaN');
  });

  it('should return "∞" for Infinity', () => {
    expect(formatNumber(Infinity)).toBe('∞');
  });

  it('should return "-∞" for -Infinity', () => {
    expect(formatNumber(-Infinity)).toBe('-∞');
  });
});
