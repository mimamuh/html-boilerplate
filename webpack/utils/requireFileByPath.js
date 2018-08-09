/* eslint-disable import/no-extraneous-dependencies, import/no-dynamic-require, global-require */
/* eslint-disable import/no-extraneous-dependencies, global-require, import/no-dynamic-require */
const path = require('path');

module.exports = function requireFileByPath(
	filePath,
	filename,
	required = true
) {
	let config = null;
	const configPath = path.resolve(filePath, filename);

	try {
		config = require(configPath);
	} catch (error) {
		if (required) {
			throw new Error(
				`Can't find ${filename} in '${filePath}': ${error.message}`
			);
		}
	}

	return config;
};
