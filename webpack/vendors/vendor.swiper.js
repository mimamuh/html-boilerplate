/* eslint-disable import/no-extraneous-dependencies */

/**
 * Webpack rules/config to use the swiper.js library
 * https://www.npmjs.com/package/swiper
 *
 * @param {Object} env
 * @param {Object} argv
 */
// eslint-disable-next-line no-unused-vars
module.exports = (env, argv) => ({
	resolve: {
		alias: {
			swiper:
				argv.mode === 'development'
					? 'swiper/dist/js/swiper.js'
					: 'swiper/dist/js/swiper.min.js',
		},
	},
});
