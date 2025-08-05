import { roundTwoDecimal } from './roundTwoDecimal';

describe('Given roundTwoDecimal', () => {
  it('should round numeric values to two decimal places', () => {
    expect(roundTwoDecimal(1.234)).toBe(1.23);
    expect(roundTwoDecimal(1.235)).toBe(1.24);
    expect(roundTwoDecimal(0.1 + 0.2)).toBe(0.3);
  });

  it('should round numeric strings to two decimal places', () => {
    expect(roundTwoDecimal('2.718')).toBe(2.72);
    expect(roundTwoDecimal('3.1415')).toBe(3.14);
  });

  it('should round whole numbers correctly', () => {
    expect(roundTwoDecimal(42)).toBe(42);
    expect(roundTwoDecimal('100')).toBe(100);
  });

  it('should handle 0 correctly', () => {
    expect(roundTwoDecimal(0)).toBe(0);
    expect(roundTwoDecimal('0')).toBe(0);
  });

  it('should handle negative numbers correctly', () => {
    expect(roundTwoDecimal(-1.236)).toBe(-1.24);
    expect(roundTwoDecimal('-2.718')).toBe(-2.72);
  });

  it('should return NaN when string is not a valid number', () => {
    expect(roundTwoDecimal('abc')).toEqual(NaN);
  });

  it('should throw an error when input is neither number nor string', () => {
    expect(() => roundTwoDecimal(null as any)).toThrow(
      'Value is not a number or string'
    );
    expect(() => roundTwoDecimal(undefined as any)).toThrow(
      'Value is not a number or string'
    );
    expect(() => roundTwoDecimal({} as any)).toThrow(
      'Value is not a number or string'
    );
  });
});
