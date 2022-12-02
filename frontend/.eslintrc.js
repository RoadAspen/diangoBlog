module.exports = {
  extends: ['alloy', 'alloy/react', 'alloy/typescript', 'plugin:prettier/recommended'],
  plugins: ['react-hooks'],
  env: {
    jest: true,
  },
  globals: {
    TezignTracer: false,
    React: true,
    JSX: true,
    TODO: false,
    NodeJS: true,
  },
  rules: {
    'max-len': ['error', { code: 120 }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': [
      'warn',
      {
        additionalHooks: 'useRecoilCallback',
      },
    ],
    'prefer-const': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'no-return-assign': 'off',
    'max-nested-callbacks': ['warn', { max: 5 }],
    '@typescript-eslint/prefer-optional-chain': 'off',
  },
};
