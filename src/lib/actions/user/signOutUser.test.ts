import { signOut } from '#/auth';

import { signOutUser } from './signOutUser';

jest.mock('#/auth', () => ({
  signOut: jest.fn()
}));

describe('Given signOutUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call signOut', async () => {
    (signOut as jest.Mock).mockResolvedValue(undefined);

    await signOutUser();

    expect(signOut).toHaveBeenCalledTimes(1);
  });

  it('should throw if signOut fails', async () => {
    const error = new Error('Sign-out failed');
    (signOut as jest.Mock).mockRejectedValue(error);

    await expect(signOutUser()).rejects.toThrow('Sign-out failed');
  });
});
