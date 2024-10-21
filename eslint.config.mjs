import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from "globals";

export default [
  {
    ignores: [
      '**/node_modules',
      '**/.next',
      '**/dist',
      '**/coverage',
      '**/tmp',
      '**/temp',
      '**/tempory',
    ],
  },
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
  {
    files: ['**/*.spec.ts', '**/*.spec.tsx', '**/*.spec.js', '**/*.spec.jsx'],

    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },

    rules: {},
  },
];