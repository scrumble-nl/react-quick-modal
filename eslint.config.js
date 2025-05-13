import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginScrumbleRules from '@scrumble-nl/eslint-plugin-scrumble-rules';
import tseslint from 'typescript-eslint';
import js from '@eslint/js';

export default [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        ignores: ['node_modules', 'public', 'eslint.config.js', 'vendor'],
        plugins: {
            '@typescript-eslint': tseslint.plugin,
            react: eslintPluginReact,
            'react-hooks': eslintPluginReactHooks,
            prettier: eslintPluginPrettier,
            '@scrumble-nl/scrumble-rules': eslintPluginScrumbleRules,
        },
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
            sourceType: 'module',
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            '@typescript-eslint/ban-types': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-empty-function': 'off',
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/no-inferrable-types': 'off',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/ban-ts-comment': 'warn',

            'no-console': 'warn',
            'no-useless-escape': 'off',

            '@scrumble-nl/scrumble-rules/sort-imports': 'error',

            'prettier/prettier': 'warn',

            'react/jsx-uses-react': 'error',
            'react/jsx-uses-vars': 'error',
            'react/display-name': 'off',

            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'error',
        },
    },
];
