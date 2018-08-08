/* CONFIGURE YOUR HTML PAGES HERE */
// Add all pages you wanna build here to the array.
// We use the HTMLWebpackPlugin to extract. You could
// use either html files or handlebars files (.hbs).
module.exports = [
	// index.html
	{
		// path of the html template in src
		template: './src/pages/toc.page',
		// filename after build
		filename: 'index.html',
		// page title
		title: 'TOC',
		// description text for search engines – max 160 chars!
		description: '…',
	},
	// 404.html
	{
		// path of the html template in src
		template: './src/pages/404.page',
		// filename after build
		filename: '404.html',
		// page title
		title: '404',
		// description text for search engines – max 160 chars!
		description: '…',
	},
];
