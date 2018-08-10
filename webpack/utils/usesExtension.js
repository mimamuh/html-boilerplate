/* eslint-disable import/no-extraneous-dependencies, global-require, import/no-dynamic-require */

const types = {
	addons: 'addons',
	rules: 'rules',
	vendors: 'vendors',
	optimizations: 'optimizations',
};

/**
 * Checks a webpack 'env' object if it includes a specific
 * extension. It uses the naming conventions of a extension
 * file: type.name.js
 * @param {Object} env webpacks env object
 * @param {String} type extension type, one of 'addons', 'rules', 'vendors'
 * @param {String} name name of the extension like 'browsersync', 'critical', ...
 */
function usesExtension(env = {}, type, name) {
	if (typeof env !== 'object') {
		throw new TypeError('First parameter "env" has to be of type "Object".');
	}

	if (typeof type !== 'string') {
		throw new TypeError('Second parameter "type" has to be of type "string".');
	}

	if (!Object.values(types).includes(type)) {
		throw new TypeError(
			`Second parameter "type" has to be one of "${Object.values[types]}"`
		);
	}

	if (typeof type !== 'string') {
		throw new TypeError('Third parameter "name" has to be of type "string".');
	}

	if (Object.prototype.hasOwnProperty.call(env, type)) {
		// env[type] could be either an array when multiple
		// extensions are set or a string when only one
		// extension is set up
		if (Array.isArray(env[type])) {
			return env[type].includes(name);
		}
		return env[type] === name;
	}
	return false;
}

usesExtension.type = types;

module.exports = usesExtension;
