module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: '.',
  },
  env: {
    browser: true,
  },
  plugins: ['@typescript-eslint', 'react-hooks', 'prettier'],
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'prettier/@typescript-eslint',
    'prettier/react',
  ],
  rules: {
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'react-hooks/rules-of-hooks': 'error',
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.jsx', '.tsx'],
      },
    ],
    'react/jsx-props-no-spreading': 0,
    'react/prop-types': 0,
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false,
      },
    ],
  },
}
