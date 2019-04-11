module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "extends": ["airbnb-base"],
  "plugins": [
    "@typescript-eslint"
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
    "project": "./tsconfig.json"
  },
  "rules": {
    "no-underscore-dangle": ["error", { "allowAfterThis": true }],
    "no-unused-vars": "off",
    "no-useless-constructor": "off",
    "no-empty-function": "off",// until typescript-eslint/no-empty-function is valid
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-useless-constructor": "error"
  },
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
};