/**
* @Author: Michael Neumair <mimamuh>
* @Date:   2016-07-28T10:42:41+02:00
* @Email:  7q7w7e7r@gmail.com
* @Last modified by:   mBook
* @Last modified time: 2017-01-19T13:47:26+01:00
*/


/**
* @Author: Michael Neumair <mimamuh>
* @Date:   2016-07-28T10:42:41+02:00
* @Email:  7q7w7e7r@gmail.com
* @Last modified by:   mBook
* @Last modified time: 2017-01-19T13:47:26+01:00
*/


module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jasmine": true,
        "mocha": true,
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "extends": ["eslint:recommended", "plugin:react/recommended", "airbnb"],
    "plugins": [
        "react",
        "mocha",
        "babel" // see from time to time: https://github.com/babel/eslint-plugin-babel
    ],
    "settings": {
        "import/resolver": "meteor"
    },
    "rules": {

        // allow ~ bitwise operator
        // http://eslint.org/docs/rules/no-bitwise
        "no-bitwise": ["error", { "allow": ["~"] }],

        // eslint-import
        "import/no-extraneous-dependencies": ["error", { "devDependencies": true, "optionalDependencies": true, "peerDependencies": false }],

        // disallow the unary operators ++ and --
        // http://eslint.org/docs/rules/no-plusplus
        "no-plusplus": 0,

        // disable eslints no-duplicate-imports as it is covered by
        // import/no-duplicates which do cover flow types
        // https://github.com/airbnb/javascript/blob/8d0fda975c1b52dd6696d8f70219a00f9703871d/packages/eslint-config-airbnb-base/rules/imports.js#L106
        "no-duplicate-imports": 0,

        // always require parens on arrow functions
        // http://eslint.org/docs/rules/arrow-parens
        "arrow-parens": ["error", "always"],

        // eslint-babel-plugin
        "babel/generator-star-spacing": 0,
        "babel/new-cap": 1,
        "babel/array-bracket-spacing": 1,
        // "babel/object-curly-spacing": 1,
        "babel/object-shorthand": 1,
        "babel/no-await-in-loop": 1,
        // "babel/flow-object-type": 1 // only needed for flow-typechecking

        "indent": ["warn", 4, { "SwitchCase": 1 }],
        "linebreak-style": ["error", "unix"],
        "quotes": ["error", "single"],
        "semi": ["error", "always"],
        "comma-dangle": ["error", "always-multiline"],
        "max-len": ["warn", { "code": 120, "ignoreTrailingComments": true, "ignoreUrls": true,  }],
        "no-use-before-define": 1,
        "no-underscore-dangle": ["error", { "allowAfterThis": true, "allow": ["_id"] }],

        /** Overwrite airbnb-react **/
        // // Enforce JSX indentation
        // // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-indent.md
        'react/jsx-indent': [2, 4],

        // Validate props indentation in JSX
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-indent-props.md
        'react/jsx-indent-props': [2, 4],

        // Enforce component methods order
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/sort-comp.md
        'react/sort-comp': [2, {
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
        }],

        // NOT ;) only .jsx files may have JSX
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
        'react/jsx-filename-extension': [2, { extensions: ['.jsx', '.js'] }],
    }
};
