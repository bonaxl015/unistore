import { formatNumberWithDecimal } from './formatNumberWithDecimal';

describe('Given formatNumberWithDecimal', () => {
  it('should format a whole number with .00', () => {
    expect(formatNumberWithDecimal(5)).toBe('5.00');
    expect(formatNumberWithDecimal(123)).toBe('123.00');
  });

  it('should format a number with one decimal by padding with 0', () => {
    expect(formatNumberWithDecimal(5.1)).toBe('5.10');
    expect(formatNumberWithDecimal(123.4)).toBe('123.40');
  });

  it('should leave numbers with two decimals unchanged', () => {
    expect(formatNumberWithDecimal(5.12)).toBe('5.12');
    expect(formatNumberWithDecimal(123.45)).toBe('123.45');
  });

  it('should keep extra decimals if more than two', () => {
    expect(formatNumberWithDecimal(5.123)).toBe('5.123');
    expect(formatNumberWithDecimal(123.4567)).toBe('123.4567');
  });

  it('should handle negative numbers correctly', () => {
    expect(formatNumberWithDecimal(-5)).toBe('-5.00');
    expect(formatNumberWithDecimal(-5.6)).toBe('-5.60');
  });

  it('should format zero correctly', () => {
    expect(formatNumberWithDecimal(0)).toBe('0.00');
    expect(formatNumberWithDecimal(0.9)).toBe('0.90');
  });
});
