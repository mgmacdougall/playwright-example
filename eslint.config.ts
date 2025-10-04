import prettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import tseslint from 'typescript-eslint';

export default [
  ...tseslint.configs.recommended,
  ...tseslint.configs.strict,

  {
    files: ['**/*.ts', '**/*.tsx'],
    ignores: ['node_modules/**', 'dist/**', 'coverage/**', '**/*.d.ts', '*.config.ts', '.github/copilot-instructions.md'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.json'],
        sourceType: 'module',
        ecmaVersion: 2020,
      },
    },
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      'prettier/prettier': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      'no-console': 'warn',
      // 'eqeqeq': ['error', 'smart'],
    },
  },

  prettier,
];
