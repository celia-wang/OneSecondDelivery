module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "standard-with-typescript",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:prettier/recommended"
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script"
      }
    }
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json"
    // requireConfigFile: false,
  },
  plugins: ["react"],
  rules: {
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/semi": [
      "error",
      "always",
      { omitLastInOneLineBlock: true }
    ],
    "@typescript-eslint/quotes": ["error", "double"],
    "@typescript-eslint/comma-dangle": [
      "error",
      {
        arrays: "never",
        objects: "never",
        imports: "never",
        exports: "never",
        functions: "never"
      }
    ],
    "@typescript-eslint/explicit-function-return-type": "off",
    // "@typescript-eslint/space-before-function-paren": ["error", "never"],
    "no-console": "error"
  }
};
