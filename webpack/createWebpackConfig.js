/* eslint-disable import/no-extraneous-dependencies, import/no-dynamic-require, global-require */
const commonConfig = require('./webpack.common');
const webpackMerge = require('webpack-merge');
const {
	getAddons,
	getRules,
	getVendors,
	getOptimizations,
} = require('./utils/getExtension');

/**
 * Function returning a webpack config which is
 * customizable through the webpack script by
 * using attributes like --env.addons=htmlpages
 * --env.rules=html and similar.
 * @param {Object} customWebpackConfig A custom webpack config
 * 																		 merged with the other settings
 */
module.exports = (customWebpackConfig = {}) => (env, argv) => {
	const envConfig = require(`./webpack.${argv.mode}.js`);
	const mergedConfig = webpackMerge(
		commonConfig(env, argv),
		envConfig(env, argv),
		...getAddons(env, argv),
		...getRules(env, argv),
		...getVendors(env, argv),
		...getOptimizations(env, argv),
		typeof customWebpackConfig === 'function'
			? customWebpackConfig(env, argv)
			: customWebpackConfig
	);

	return mergedConfig;
};
