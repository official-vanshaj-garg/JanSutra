import globals from 'globals';
import js from '@eslint/js';

export default [
    js.configs.recommended,
    // Source files: CommonJS Node.js
    {
        files: ['src/**/*.js'],
        languageOptions: {
            globals: {
                ...globals.node,
            },
            ecmaVersion: 2022,
            sourceType: 'commonjs',
        },
        rules: {
            'no-unused-vars': ['warn', { argsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' }],
            'no-console': 'off',
            'no-undef': 'error',
        },
    },
    // Test files: ESM (Vitest uses import syntax)
    {
        files: ['tests/**/*.js'],
        languageOptions: {
            globals: {
                ...globals.node,
            },
            ecmaVersion: 2022,
            sourceType: 'module',
        },
        rules: {
            'no-unused-vars': 'warn',
            'no-console': 'off',
        },
    },
];
