import { formatError } from './formatError';

describe('Given formatError', () => {
  it('should handle ZodError with multiple field errors', () => {
    const error = {
      name: 'ZodError',
      errors: {
        email: { message: 'Invalid email' },
        password: { message: 'Password too short' }
      }
    };

    const result = formatError(error);
    expect(result).toBe('Invalid email. Password too short');
  });

  it('should handle ZodError with single field error', () => {
    const error = {
      name: 'ZodError',
      errors: {
        username: { message: 'Required field' }
      }
    };

    const result = formatError(error);
    expect(result).toBe('Required field');
  });

  it('should handle Prisma P2002 unique constraint error', () => {
    const error = {
      name: 'PrismaClientKnownRequestError',
      code: 'P2002',
      meta: {
        target: ['email']
      }
    };

    const result = formatError(error);
    expect(result).toBe('Email already exists');
  });

  it('should fallback to "Field already exists" if no target is provided in Prisma error', () => {
    const error = {
      name: 'PrismaClientKnownRequestError',
      code: 'P2002'
    };

    const result = formatError(error);
    expect(result).toBe('Field already exists');
  });

  it('should return error.message for standard Error objects', () => {
    const error = new Error('Something went wrong');
    const result = formatError(error);
    expect(result).toBe('Something went wrong');
  });

  it('should stringify non-string messages', () => {
    const error = {
      message: { detail: 'Unexpected issue' }
    };

    const result = formatError(error);
    expect(result).toBe(JSON.stringify({ detail: 'Unexpected issue' }));
  });

  it('should stringify undefined messages gracefully', () => {
    const error = {};
    const result = formatError(error);
    expect(result).toBe(JSON.stringify(undefined));
  });
});
