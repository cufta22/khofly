import { defineConfig } from 'oxfmt';

// Should match root .oxfmtrc.json
export default defineConfig({
  trailingComma: 'all',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  jsxSingleQuote: true,
  printWidth: 100,
});
