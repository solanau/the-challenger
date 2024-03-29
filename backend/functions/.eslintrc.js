module.exports = {
    root: true,
    env: {
        es6: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'google',
        'plugin:@typescript-eslint/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: [
            './backend/functions/tsconfig.json',
            './backend/functions/tsconfig.dev.json',
        ],
        sourceType: 'module',
    },
    ignorePatterns: [
        '/lib/**/*', // Ignore built files.
    ],
    plugins: ['@typescript-eslint', 'import'],
    rules: {
        'import/no-unresolved': 0,
        indent: ['error', 4],
        'quote-props': false,
        'object-curly-spacing': false,
    },
};
