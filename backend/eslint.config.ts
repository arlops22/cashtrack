import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import globals from 'globals';
import parser from '@typescript-eslint/parser';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
        ignores: ['**/*.config.ts'],
        plugins: { js },
        extends: ['js/recommended'],
        languageOptions: {
            globals: globals.node,
            parser,
            parserOptions: {
                ecmaVersion: 2022,
                sourceType: 'module',
            },
        },
        rules: {
            'prettier/prettier': [
                'error',
                {
                    endOfLine: 'auto',
                },
            ],
        },
    },
    { ignores: ['node_modules', './dist'] },
    tseslint.configs.recommended,
    eslintPluginPrettierRecommended,
]);
