module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: '.',
  },
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  plugins: ['@typescript-eslint', 'react-hooks', 'prettier'],
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'prettier',
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
    'react/jsx-filename-extension': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    'import/extensions': 0,
    'consistent-return': 0,
    'import/no-unresolved': [2, { ignore: ['antd-coffee'] }],
    'no-unused-expressions': [2, { allowShortCircuit: true }],
    'import/no-extraneous-dependencies': 0,
    'prettier/prettier': 'error',
  },
}
