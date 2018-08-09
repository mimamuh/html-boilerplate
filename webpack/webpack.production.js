// eslint-disable-next-line no-unused-vars
module.exports = (env, argv) => ({
	resolve: {
		// TODO: Make it part of the common config
		alias: {
			swiper: 'swiper/dist/js/swiper.min.js',
			lazyload: 'vanilla-lazyload/dist/lazyload.min.js',
		},
	},
});
