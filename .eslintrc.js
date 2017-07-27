module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    parser: 'babel-eslint',
    parserOptions: {
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
            jsx: true,
        },
        sourceType: 'module',
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'airbnb',
        'prettier',
        'prettier/flowtype',
        'prettier/react',
    ],
    plugins: [
        'flowtype',
        'flowtype-errors',
        'import',
        'promise',
        'compat',
        'react',
    ],
    settings: {
        // 'import/resolver': {
        //     webpack: {
        //         config: 'webpack.config.eslint.js',
        //     },
        // },
    },
    rules: {
        // // allow ~ bitwise operator
        // http://eslint.org/docs/rules/no-bitwise
        'no-bitwise': ['error', { allow: ['~'] }],

        // allow the unary operators ++ and --
        // http://eslint.org/docs/rules/no-plusplus
        'no-plusplus': 0,

        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        // 'generator-star-spacing': 'off',
        // 'no-console': 'off',

        // compat plugin
        'compat/compat': 'error',

        // flow tpyes plugin
        // 'flowtype-errors/show-errors': 'error',

        // import plugin
        // 'import/no-unresolved': 'error',
        // 'import/no-extraneous-dependencies': 'off',

        // Promise plugin
        'promise/param-names': 'error',
        'promise/always-return': 'error',
        'promise/catch-or-return': 'error',
        'promise/no-native': 'off',

        'react/jsx-filename-extension': [
            'error',
            { extensions: ['.js', '.jsx'] },
        ],
        // 'react/prefer-stateless-function': 'off',

        // disable eslints no-duplicate-imports as it is covered by
        // import/no-duplicates which do cover flow types
        // https://github.com/airbnb/javascript/blob/8d0fda975c1b52dd6696d8f70219a00f9703871d/packages/eslint-config-airbnb-base/rules/imports.js#L106
        // 'no-duplicate-imports': 0,

        // 'comma-dangle': ['error', 'always-multiline'],
        // 'max-len': [
        //     'warn',
        //     { code: 80, ignoreTrailingComments: true, ignoreUrls: true },
        // ],
        // 'no-use-before-define': 1,
        'no-underscore-dangle': [
            'error',
            { allowAfterThis: true, allow: ['_id'] },
        ],

        // /** Overwrite airbnb-react **/
        // Enforce defaultProps
        // INFO: We disable it, because we use flow ...
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/require-default-props.md
        // 'react/require-default-props': 0,

        // Enforce component methods order
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/sort-comp.md
        'react/sort-comp': [
            2,
            {
                order: [
                    'type-annotations',
                    'static-methods',
                    'lifecycle',
                    'render',
                    '/^_?render.+$/',
                    '/^ref.+$/',
                    '/^(on|handle).+$/',
                    'everything-else',
                ],
            },
        ],
    },
};
