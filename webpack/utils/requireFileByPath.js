const path = require('path');

module.export = function requireFileByPath(
	filePath,
	filename,
	required = true
) {
	let pageConfig = null;
	const pageConfigPath = path.resolve(filePath, filename);

	try {
		pageConfig = require(pageConfigPath);
	} catch {
		if (required) {
			throw new Error(`Can't find ${filename} in ${filePath}`);
		}
	}

	return pageConfig;
};
