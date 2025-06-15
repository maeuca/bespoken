// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook'

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    // ✅ Global ignore list
    ignores: [
      'dist',
      'coverage',
      '.storybook',
      'node_modules',
      'src/types/openapi/**/*',
      '**/*.test.{ts,tsx}',
      '**/*.stories.{ts,tsx}',
      'src/setupTests.ts'
    ]
  },
  {
    // ✅ Only lint src folder
    files: ['src/**/*.{ts,tsx}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
       '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  storybook.configs['flat/recommended']
)
