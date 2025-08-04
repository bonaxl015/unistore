import { cn } from './cn';

describe('Given cn function', () => {
  it('should merge tailwind classes correctly', () => {
    expect(cn('bg-red-500', 'text-white')).toBe('bg-red-500 text-white');
  });

  it('should handle conditional classes', () => {
    expect(
      cn('bg-blue-500', { 'text-white': true }, { 'font-bold': false })
    ).toBe('bg-blue-500 text-white');
  });

  it('should handle arrays of classes', () => {
    expect(cn(['bg-green-500', 'text-black'])).toBe('bg-green-500 text-black');
  });

  it('should handle mixed inputs', () => {
    expect(
      cn('bg-yellow-500', ['text-gray-900', { underline: true }], {
        italic: false,
        'font-medium': true
      })
    ).toBe('bg-yellow-500 text-gray-900 underline font-medium');
  });

  it('should handle conflicting tailwind classes', () => {
    expect(cn('p-4', 'p-2')).toBe('p-2');
    expect(cn('mr-2', 'ml-2')).toBe('mr-2 ml-2');
    expect(cn('font-bold', 'font-light', 'font-medium')).toBe('font-medium');
    expect(cn('w-10', 'w-20', 'w-30')).toBe('w-30');
    expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
  });

  it('should handle empty inputs', () => {
    expect(cn()).toBe('');
    expect(cn(null, undefined, false, '')).toBe('');
  });

  it('should handle complex mixed inputs', () => {
    const dynamicClass = 'text-xl';
    const condition = true;

    expect(
      cn(
        'm-2',
        ['p-4', { [dynamicClass]: condition }],
        { border: true, rounded: false },
        condition && 'shadow-md',
        !condition && 'shadow-lg',
        undefined,
        null,
        false,
        ''
      )
    ).toBe('m-2 p-4 text-xl border shadow-md');
  });

  it('should handle complex conflicting tailwind classes', () => {
    expect(
      cn('text-sm', 'text-base', 'text-lg', 'text-xl', 'text-xs', 'text-2xl')
    ).toBe('text-2xl');
    expect(cn('m-1', 'm-2', 'm-3', 'm-4', 'm-5', 'm-0')).toBe('m-0');
    expect(cn('px-1', 'px-2', 'px-3', 'px-4', 'px-5', 'px-0')).toBe('px-0');
    expect(cn('py-1', 'py-2', 'py-3', 'py-4', 'py-5', 'py-0')).toBe('py-0');
    expect(cn('w-1/2', 'w-1/3', 'w-1/4', 'w-1/5', 'w-1/6', 'w-full')).toBe(
      'w-full'
    );
    expect(cn('h-1/2', 'h-1/3', 'h-1/4', 'h-1/5', 'h-1/6', 'h-full')).toBe(
      'h-full'
    );
    expect(cn('flex-row', 'flex-col')).toBe('flex-col');
  });
});
