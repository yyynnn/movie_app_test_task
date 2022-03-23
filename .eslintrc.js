module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ["plugin:react/recommended", "standard", "prettier"],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 13,
        sourceType: "module"
    },
    plugins: ["react"],
    rules: {
        indent: ["off"],
        semi: [2, "always"],
        "space-before-function-paren": [
            "error",
            {
                anonymous: "always",
                named: "never"
            }
        ],
        quotes: ["error", "double", { allowTemplateLiterals: true, avoidEscape: true }],
        "multiline-ternary": ["off"]
    }
};
