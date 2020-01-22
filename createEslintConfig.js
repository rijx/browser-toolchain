module.exports = () => {
  return {
    parser: "babel-eslint",
    extends: ["eslint:recommended", "plugin:react/recommended"],
    plugins: ["import", "jest", "prettier", "react"],
    parserOptions: {
      sourceType: "module",
      ecmaFeatures: {
        jsx: true
      }
    },
    env: {
      es6: true,
      browser: true,
      node: true,
      "jest/globals": true
    },
    settings: {
      "import/internal-regex": "^@internal/"
    },
    rules: {
      "prettier/prettier": "error",
      "no-unused-vars": ["error", { varsIgnorePattern: "^h$" }],
      "max-lines": ["error", { max: 180 }],
      "no-warning-comments": "error",
      "react/react-in-jsx-scope": "off",
      "react/display-name": "off",
      "react/prop-types": "off",
      "react/style-prop-object": "error",
      "react/no-this-in-sfc": "error",
      "react/prefer-stateless-function": "error",
      "react/jsx-uses-vars": 1,
      "react/no-unescaped-entities": [
        "error",
        {
          forbid: [
            {
              char: ">",
              alternatives: ["&gt;"]
            },
            {
              char: "}",
              alternatives: ["&#125;"]
            }
          ]
        }
      ],
      "no-constant-condition": ["error", { checkLoops: false }],
      "import/order": [
        "error",
        {
          groups: [
            ["builtin", "external"],
            "internal",
            "parent",
            ["sibling", "index"]
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc"
          }
        }
      ],
      "import/no-self-import": "error",
      "import/no-useless-path-segments": [
        "error",
        {
          noUselessIndex: true
        }
      ],
      "import/newline-after-import": "error"
    }
  };
};
