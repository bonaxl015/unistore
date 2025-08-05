import { convertToPlainObject } from './convertToPlainObject';

describe('Given convertToPlainObject', () => {
  it('should deeply clone a simple object', () => {
    const obj = { a: 1, b: 'test', c: true };
    const result = convertToPlainObject(obj);

    expect(result).toEqual(obj);
    expect(result).not.toBe(obj); // make sure it's a different reference
  });

  it('should strip functions and undefined properties', () => {
    const obj = {
      a: 1,
      b: undefined,
      c: () => {}
    };
    const result = convertToPlainObject(obj);

    expect(result).toEqual({ a: 1 }); // 'b' and 'c' should be removed
  });

  it('should convert arrays correctly', () => {
    const arr = [1, 2, { a: 3 }];
    const result = convertToPlainObject(arr);

    expect(result).toEqual(arr);
    expect(result).not.toBe(arr);
  });

  it('should serialize Date to ISO string', () => {
    const date = new Date();
    const obj = { now: date };
    const result = convertToPlainObject(obj);

    expect(result).toEqual({ now: date.toISOString() });
  });

  it('should return primitive values as-is', () => {
    expect(convertToPlainObject(42)).toBe(42);
    expect(convertToPlainObject('hello')).toBe('hello');
    expect(convertToPlainObject(true)).toBe(true);
    expect(convertToPlainObject(null)).toBe(null);
  });

  it('should throw if value is circular', () => {
    const circular: any = {};
    circular.self = circular;

    expect(() => convertToPlainObject(circular)).toThrow(TypeError);
  });
});
