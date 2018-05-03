// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  env: { browser: true },
  extends: ['airbnb'],
  rules: {
    indent: ['error', 2],
    semi: ['error', 'never'],
    'react/react-in-jsx-scope': 0,
    'react/jsx-filename-extension': 0,
    'react/no-string-refs': 0,
    'react/no-unknown-property': 0,
    'react/prop-types': 0,
  }
}
