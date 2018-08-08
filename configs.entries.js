const path = require('path');

/* CONFIGURE YOUR HTML PAGES HERE */
// Add all pages you wanna build here to the array.
// We use the HTMLWebpackPlugin to extract. You could
// use either html files or handlebars files (.hbs).
module.exports = {
	// main bundles
	main: path.resolve(__dirname, './src/assets/js/', 'main.js'),

	// page specific bundles
	'404': path.resolve(__dirname, './src/404/js/', '404.js'),
};
