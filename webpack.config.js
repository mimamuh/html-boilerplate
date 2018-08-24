/* eslint-disable import/no-extraneous-dependencies, import/no-dynamic-require, global-require */
const commonConfig = require('./webpack/webpack.common');
const webpackMerge = require('webpack-merge');
const {
	getAddons,
	getRules,
	getVendors,
	getOptimizations,
} = require('./webpack/utils/getExtension');

/**
 * @param {Object} env 	Webpack environment variables passed by
 * 											the cli flag --env like --env.foo=bar
 * @param {Object} argv Webpack defined cli flags like --mode
 * 											are passed to it
 */
module.exports = (env, argv) => {
	const envConfig = require(`./webpack/webpack.${argv.mode}.js`);
	const mergedConfig = webpackMerge(
		commonConfig(env, argv),
		envConfig(env, argv),
		...getAddons(env, argv),
		...getRules(env, argv),
		...getVendors(env, argv),
		...getOptimizations(env, argv)
	);

	return mergedConfig;
};
