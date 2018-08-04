/* eslint-disable import/no-extraneous-dependencies, import/no-dynamic-require, global-require */
const commonConfig = require('./webpack/webpack.common');
const webpackMerge = require('webpack-merge');

// helper to load addons (plugins) from external files
const getAddons = (env = {}, argv = {}) => {
	const addons = [].concat
		.apply([], [env.addons]) // normalize array of addons (flatten)
		.filter(Boolean); // if addons is undefined, filter it out

	return addons.map(addonName => {
		const addon = require(`./webpack/addons/addon.${addonName}.js`);
		// execute module function with webpack env and argv context
		if (typeof addon === 'function') {
			return addon(env, argv);
		}
		return addon;
	});
};

// helper to load loader rules from external files
const getRules = (env = {}, argv = {}) => {
	const rules = [].concat
		.apply([], [env.rules]) // normalize array of rules (flatten)
		.filter(Boolean); // if rules is undefined, filter it out

	return rules.map(ruleName => {
		const rule = require(`./webpack/rules/rule.${ruleName}.js`);
		// execute module function with webpack env and argv context
		if (typeof rule === 'function') {
			return rule(env, argv);
		}
		return rule;
	});
};

/**
 * @param {Object} env 	Webpack environment variables passed by
 * 											the cli flag --env like --env.foo=bar
 * @param {Object} argv Webpack defined cli flags like --mode
 * 											are passed to it
 */
module.exports = (env, argv) => {
	console.log(env, argv);

	const envConfig = require(`./webpack/webpack.${argv.mode}.js`);
	const mergedConfig = webpackMerge(
		commonConfig,
		envConfig,
		...getAddons(env, argv),
		...getRules(env, argv)
	);

	console.log(mergedConfig);
	return mergedConfig;
};

/*
	TODO: 
	- add getVendors helper to this file
	- cleanup webpack configs ...
	- cleanup packag.json scripts
	- test all ... :)
	- of old production config we still need
		- the CleanWebpackPlugin
		- and WebpackOnBuildPlugin
		- FavocionPlugin stuff ... :)
	- we still need the 
		- getPages config setup, where we load html files as entry
		- find a solution for CommonWebpackPlugin stuff
		- 
*/
