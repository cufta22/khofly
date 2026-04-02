import { defineConfig } from 'oxlint';

export default defineConfig({
  plugins: ['react', 'typescript', 'unicorn'],
  categories: {
    correctness: 'error',
    suspicious: 'warn',
    pedantic: 'warn',
  },
  rules: {
    /** Correctness **/
    'react-hooks/exhaustive-deps': 'off',
    'no-unused-vars': 'warn',
    'max-lines-per-function': 'off',
    'no-console': 'warn',
    'react/jsx-no-undef': 'error',
    'react/react-in-jsx-scope': 'off',

    /** Suspicious **/
    '@typescript-eslint/no-explicit-any': 'off',
    'react/no-array-index-key': 'off',
    '@typescript-eslint/no-confusing-void-expression': 'off',

    /** Style **/
    'no-else-return': 'off',
    // 'unicorn/no-unused-template-literal': 'off',
    '@typescript-eslint/consistent-type-imports': 'warn',

    /** Complexity **/
    'dot-notation': 'off',
    'arrow-body-style': 'off',

    /** Security **/
    'react/no-danger': 'warn',

    /** A11y **/
    'jsx-a11y/media-has-caption': 'off',
    'jsx-a11y/anchor-has-content': 'off', // Closest match for svg-without-title logic
  },
});
