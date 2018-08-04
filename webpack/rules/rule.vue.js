/* eslint-disable import/no-extraneous-dependencies */

/**
 * Webpack rules to load vue assets
 *
 * @param {Object} env
 * @param {Object} argv
 */
// eslint-disable-next-line no-unused-vars
module.exports = (env, argv) => ({
	resolve: {
		alias: {
			// using the standalone build (compiler + runtime)
			// instead of the default runtime-only build
			// see: https://github.com/vuejs/vue/tree/dev/dist#explanation-of-build-files
			vue: argv.development ? 'vue/dist/vue.js' : 'vue/dist/vue.min.js',
		},
	},

	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
			},
		],
	},
});
