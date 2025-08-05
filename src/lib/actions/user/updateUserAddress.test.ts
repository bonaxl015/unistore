import { auth } from '#/auth';
import { prisma } from '@/db/prisma';

import { updateUserAddress } from './updateUserAddress';
import { formatError } from '../../utils';
import { shippingAddressSchema } from '../../validators';

jest.mock('#/auth', () => ({
  auth: jest.fn()
}));

jest.mock('@/db/prisma', () => ({
  prisma: {
    user: {
      findFirst: jest.fn(),
      update: jest.fn()
    }
  }
}));

jest.mock('../../utils', () => ({
  formatError: jest.fn(() => 'Formatted error')
}));

jest.mock('../../validators', () => ({
  shippingAddressSchema: {
    parse: jest.fn()
  }
}));

describe('updateUserAddress', () => {
  const mockAddressInput = {
    fullName: 'Test User',
    streetAddress: '123 Test St',
    city: 'Test City',
    postalCode: '9999',
    country: 'Philippines'
  };

  const mockSession = {
    user: {
      id: 'user-123'
    }
  };

  const mockUser = {
    id: 'user-123',
    name: 'Jane Doe',
    email: 'jane@example.com',
    role: 'user'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update address successfully', async () => {
    (auth as jest.Mock).mockResolvedValue(mockSession);
    (prisma.user.findFirst as jest.Mock).mockResolvedValue(mockUser);
    (shippingAddressSchema.parse as jest.Mock).mockReturnValue(
      mockAddressInput
    );
    (prisma.user.update as jest.Mock).mockResolvedValue({});

    const result = await updateUserAddress(mockAddressInput);

    expect(auth).toHaveBeenCalled();
    expect(prisma.user.findFirst).toHaveBeenCalledWith({
      where: { id: 'user-123' }
    });
    expect(shippingAddressSchema.parse).toHaveBeenCalledWith(mockAddressInput);
    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: 'user-123' },
      data: { address: mockAddressInput }
    });

    expect(result).toEqual({
      success: true,
      message: 'User updated successfully'
    });
  });

  it('should return error if user is not found', async () => {
    (auth as jest.Mock).mockResolvedValue(mockSession);
    (prisma.user.findFirst as jest.Mock).mockResolvedValue(null);
    (formatError as jest.Mock).mockReturnValue('Formatted error');

    const result = await updateUserAddress(mockAddressInput);

    expect(result).toEqual({
      success: false,
      message: 'Formatted error'
    });
  });

  it('should return error if validation fails or exception is thrown', async () => {
    const error = new Error('Parse error');
    (auth as jest.Mock).mockResolvedValue(mockSession);
    (prisma.user.findFirst as jest.Mock).mockResolvedValue(mockUser);
    (shippingAddressSchema.parse as jest.Mock).mockImplementation(() => {
      throw error;
    });
    (formatError as jest.Mock).mockReturnValue('Formatted error');

    const result = await updateUserAddress(mockAddressInput);

    expect(formatError).toHaveBeenCalledWith(error);
    expect(result).toEqual({
      success: false,
      message: 'Formatted error'
    });
  });

  it('should return error if any unexpected error is thrown', async () => {
    const unexpectedError = new Error('DB failure');
    (auth as jest.Mock).mockResolvedValue(mockSession);
    (prisma.user.findFirst as jest.Mock).mockResolvedValue(mockUser);
    (shippingAddressSchema.parse as jest.Mock).mockReturnValue(
      mockAddressInput
    );
    (prisma.user.update as jest.Mock).mockRejectedValue(unexpectedError);
    (formatError as jest.Mock).mockReturnValue('Formatted error');

    const result = await updateUserAddress(mockAddressInput);

    expect(result).toEqual({
      success: false,
      message: 'Formatted error'
    });
  });
});
