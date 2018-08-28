module.exports = {
	// takes the dist folder as root
	filesToClean: [
		'./assets/js/*.js',
		'./assets/js/*.js.map',
		'./critical/*.css',
		'./critical/*.css.map',
		'./*.css',
		'./*.css.map',
	],
	// Write logs to console.
	verbose: true,
	// Use boolean "true" to test/emulate delete.
	// Default: false - remove files
	dry: false,
	// Instead of removing whole path recursively,
	// remove all path's content with exclusion of provided immediate children.
	// Good for not removing shared files from build directories.
	exclude: [
		/* 'files', 'to', 'ignore' */
	],
};
