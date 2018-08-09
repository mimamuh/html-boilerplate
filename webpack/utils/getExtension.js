/* eslint-disable import/no-extraneous-dependencies, global-require, import/no-dynamic-require */

// helper to load addons (plugins) from external files
const getAddons = (env = {}, argv = {}) => {
	const addons = [].concat
		.apply([], [env.addons]) // normalize array of addons (flatten)
		.filter(Boolean); // if addons is undefined, filter it out

	return addons.map(addonName => {
		const addon = require(`./../addons/addon.${addonName}.js`);
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
		const rule = require(`./../rules/rule.${ruleName}.js`);
		// execute module function with webpack env and argv context
		if (typeof rule === 'function') {
			return rule(env, argv);
		}
		return rule;
	});
};

// helper to load vendor rules from external files
const getVendors = (env = {}, argv = {}) => {
	const vendors = [].concat
		.apply([], [env.vendors]) // normalize array of vendors (flatten)
		.filter(Boolean); // if vendors is undefined, filter it out

	return vendors.map(vendorName => {
		const vendor = require(`./../vendors/vendor.${vendorName}.js`);
		// execute module function with webpack env and argv context
		if (typeof vendor === 'function') {
			return vendor(env, argv);
		}
		return vendor;
	});
};

module.exports = {
	getAddons,
	getRules,
	getVendors,
};
