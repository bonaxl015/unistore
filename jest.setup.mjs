import '@testing-library/jest-dom';

global.console = {
  ...console,
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn()
};

global.TextEncoder = jest.fn().mockImplementation(() => ({
  encode: jest.fn()
}));
