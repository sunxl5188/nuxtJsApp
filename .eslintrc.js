module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jquery: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
  plugins: [],
  // add your custom rules here
  rules: {
    'no-console': 'off'
  },
  globals: {
    '_': true,
    '$moment': true,
    '$lodash': true,
    '$getStorage': true,
    '$setStorage': true,
    '$remStorage': true,
    '$utils': true,
    '$charts': true
  }
}
