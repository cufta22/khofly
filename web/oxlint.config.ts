import { defineConfig } from 'oxlint';

export default defineConfig({
  plugins: ['react', 'typescript', 'jsx-a11y'],
  categories: {
    correctness: 'error',
    suspicious: 'warn',
    pedantic: 'warn',
  },
  rules: {
    // Correctness
    'no-unused-vars': 'warn',
    'react/jsx-no-undef': 'error',
    'react/exhaustive-deps': 'off',
    'jsx-a11y/media-has-caption': 'off',
    'jsx-a11y/anchor-has-content': 'off', // Closest match for svg-without-title logic

    // Restriction
    'no-console': 'warn',
    'react/no-danger': 'warn',
    'typescript/no-explicit-any': 'off',

    // Suspicious
    'react/react-in-jsx-scope': 'off',

    // Perf
    'react/no-array-index-key': 'off',

    // Style
    'arrow-body-style': 'off',
    'typescript/consistent-type-imports': 'warn',
    'typescript/dot-notation': 'off',

    // Pedantic
    'max-lines': 'off',
    'max-lines-per-function': 'off',
    'max-depth': ['warn', { max: 5 }],
    'no-warning-comments': 'off', // Allow TODO comments
    'no-inline-comments': 'off', // Allow this comment
    'no-else-return': 'off',
    'no-negated-condition': 'off',
    'no-lonely-if': 'off',
    'typescript/no-confusing-void-expression': 'off',
  },
});
