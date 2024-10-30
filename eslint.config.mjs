import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint, { parser } from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import prettier from 'prettier';

export default [
    {
        ignores: ['node_modules', 'dist', 'build', '/*.js'],
    },
    { files: ['**/*.{js,mjs,cjs,ts}'] },
    {
        languageOptions: {
            globals: globals.browser,
            parser,
        },
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        plugins: {
            tseslint: tseslint.plugin,
            prettier: prettier,
        },
        rules: {
            'no-console': 'warn',
        },
    },
    eslintConfigPrettier,
];
