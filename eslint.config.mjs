import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      'react/display-name': 'off',
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
      'testing-library/prefer-screen-queries': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['sibling', 'parent'],
            'index',
            'unknown'
          ],
          'newlines-between': 'always-and-inside-groups'
        }
      ]
    }
  }
];

export default eslintConfig;
