module.exports = {
	env: {
		browser: true,
		es6: true,
	},
	parser: 'babel-eslint',
	parserOptions: {
		ecmaVersion: 9, // equals 2018
		ecmaFeatures: {
			jsx: true,
		},
		sourceType: 'module',
	},
	extends: [
		// 'eslint:recommended',
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
		'import/resolver': {
			webpack: {
				config: 'webpack.config.renderer.dev.js',
			},
		},
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

		// compat plugin
		'compat/compat': 'error',

		// Promise plugin
		'promise/param-names': 'error',
		'promise/always-return': 'error',
		'promise/catch-or-return': 'error',
		'promise/no-native': 'off',

		'react/jsx-filename-extension': [
			'error',
			{ extensions: ['.js', '.jsx'] },
		],

		// 'no-use-before-define': 1,
		'no-underscore-dangle': [
			'error',
			{ allowAfterThis: true, allow: ['_id'] },
		],

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
