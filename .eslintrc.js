module.exports = {
  extends: [
    'react-app',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  rules: {
    'prettier/prettier': [
      'error',
      { singleQuote: true, tabWidth: 4, trailingComma: 'es5' },
    ],
    // Temporarily disabled due to version inconsistencies
    // between tsdx & eslint-config-react-app
    '@typescript-eslint/consistent-type-assertions': 'off',
  },
};
