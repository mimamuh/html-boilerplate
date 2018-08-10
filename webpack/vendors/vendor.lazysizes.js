/* eslint-disable import/no-extraneous-dependencies */

/**
 * Webpack rules/config to use the lazysizes.js library
 * https://www.npmjs.com/package/lazysizes/
 *
 * @param {Object} env
 * @param {Object} argv
 */
// eslint-disable-next-line no-unused-vars
module.exports = (env, argv) => ({
	resolve: {
		alias: {
			lazysizes:
				argv.mode === 'development'
					? 'lazysizes/lazysizes-umd.js'
					: 'lazysizes/lazysizes-umd.min.js',
		},
	},
});
