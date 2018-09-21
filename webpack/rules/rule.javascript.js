/* eslint-disable import/no-extraneous-dependencies */
const usesExtension = require('./../utils/usesExtension');
const colors = require('colors');

/**
 * Webpack rules to load javascript assets
 *
 * @param {Object} env
 * @param {Object} argv
 */
// eslint-disable-next-line no-unused-vars
module.exports = (env, argv) => {
	// When we already use typescript we don't
	// need the javascript rule anymore as it
	// conflicts with the typescript setup
	const usesTypescript = usesExtension(
		env,
		usesExtension.type.rules,
		'typescript'
	);

	if (usesTypescript) {
		throw new Error(
			colors.red(
				"ERROR: Addon rule.javascript.js doesn't work together with rule.typescript.js - use only one of them!"
			)
		);
	}

	return {
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					use: [
						{
							loader: 'babel-loader',
							options: {
								// The current active environment used for babel during configuration loading.
								envName:
									argv.mode === 'development' ? 'development' : 'production',
							},
						},
					],
					exclude: [/node_modules/],
				},
			],
		},
	};
};
