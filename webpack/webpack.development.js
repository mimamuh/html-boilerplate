/* eslint-disable import/no-extraneous-dependencies, import/no-dynamic-require, global-require */

// eslint-disable-next-line no-unused-vars
module.exports = (env, argv) => {
	return {
		devtool: 'eval-source-map',

		resolve: {
			// TODO: Make it part of the common config
			alias: {
				swiper: 'swiper/dist/js/swiper.js',
			},
		},
	};
};
