module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/vue3-essential',
        '@vue/airbnb',
    ],
    parserOptions: {
        parser: '@babel/eslint-parser',
    },
    rules: {
        'max-len': ['error', 160],
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'linebreak-style': 0,
        indent: ['error', 4],
        'import/prefer-default-export': 'off',
        'import/no-unresolved': [2, { ignore: ['catUiWrapper/', 'catUiLibrary/'] }],
        'import/extensions': ['error', 'ignorePackages', { js: 'never' }],
        'vue/script-indent': ['error', 4, {
            baseIndent: 1,
        }],
        'vue/html-indent': ['error', 4, {
            baseIndent: 1,
            alignAttributesVertically: false,
        }],
        'vuejs-accessibility/click-events-have-key-events': 'off',
        'vuejs-accessibility/interactive-supports-focus': 'off'

    },
    overrides: [
        {
            files: ['*.vue'],
            rules: {
                indent: 'off',
            },
        },
    ],
};
