import '@testing-library/jest-dom';
import { TextEncoder } from 'util';

global.console = {
  ...console,
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn()
};

global.TextEncoder = TextEncoder;

// global.crypto = crypto;
