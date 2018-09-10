/* eslint-disable import/no-extraneous-dependencies */
const usesExtension = require('./../utils/usesExtension');
const colors = require('colors');

/**
 * Webpack rules to load font assets
 *
 * @param {Object} env
 * @param {Object} argv
 */
// eslint-disable-next-line no-unused-vars
module.exports = (env, argv) => {
	// When we already use javascript we don't
	// need the typescript rule anymore as it
	// conflicts with the javascript setup
	const usesJavascript = usesExtension(
		env,
		usesExtension.type.rules,
		'typescript'
	);

	if (usesJavascript) {
		throw new Error(
			colors.red(
				"ERROR: Addon rule.typescript.js doesn't work together with rule.javascript.js - use only one of them!"
			)
		);
	}

	return {
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: 'ts-loader',
					exclude: /node_modules/,
				},
			],
		},
		resolve: {
			// Using this will override the default array (['.wasm', '.mjs', '.js', '.json']),
			// meaning that webpack will no longer try to resolve modules
			// using the default extensions. For modules that are imported
			// with their extension, e.g. import SomeFile from "./somefile.ext",
			// to be properly resolved, a string containing "*" must be included
			// in the array.
			extensions: ['.tsx', '.ts', '.js'],
		},
	};
};
