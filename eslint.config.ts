import typescript from '@eslint/js';
import tseslint, { plugin } from 'typescript-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier';

export default [
    // Base JavaScript rules
    typescript.configs.recommended,

    // TypeScript-specific rules
    ...tseslint.configs.recommended,
    ...tseslint.configs.strict,

    // Custom project rules
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: ['./tsconfig.json'],
            },
        },
        plugins: {
            '@typescript-eslint': plugin,
            'prettier': eslintPluginPrettier,
        },
        rules: {
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/explicit-function-return-type': 'off',
            'no-console': 'warn',
            'eqeqeq': ['error', 'smart'],
            'prettier/prettier': 'warn',
        },
        sourceType: 'module',
        extends: [
            'plugin:@typescript-eslint/recommended',
            'plugin:@typescript-eslint/recommended-requiring-type-checking',
            'plugin:prettier/recommended',
            "google",
            "prettier"
        ],
    },

    // Overrides for test files
    {
        files: ['**/*.test.ts', '**/*.spec.ts'],
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            'no-console': 'off',
        },
    },
];