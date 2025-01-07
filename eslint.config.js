module.exports = [
    {
        files: ["**/*.js", "**/*.cjs", "**/*.mjs"],
        ignores: ["dist/**"],
        rules: {
            "prefer-const": "warn",
            "no-constant-binary-expression": "error"
        }
    }
];