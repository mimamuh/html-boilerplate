'use strict';
const webpack = require('webpack');

// export entries
// they will be bundled to the following
// fiel-name structure: 'assets/js/[name].bundle.js'
const entries = {
	// main bundles
	main: './src/assets/js/main.js',

	// page sepific bundles
	'404': './src/404/js/404.js',
};

// which entry chunks should not be included
// within the commons.js bundle ...
// Normally only head should be there ...
var excludedFromCommons = ['head'];

// helper function which exludes values from an array
function excludeFromArray(array, excludeList) {
	return array.filter(entry => !excludeList.includes(entry));
}

// our webpack commons chunk plugin to bundle
// commonly used dependencies/chunks within commons.js
var commonsChunkPlugin = new webpack.optimize.CommonsChunkPlugin({
	name: 'commons',
	filename: '/assets/js/[name]-[hash].bundle.js',
	// The minimum number of chunks which need to contain a
	// module before it's moved into the commons chunk.
	minChunks: 2,
	// To prevent duplication, children common dependencies can be moved into the parent.
	// This reduces overall size, but does have a negative effect on the initial load time
	// children: true,
	chunks: excludeFromArray(Object.keys(entries), excludedFromCommons),
});

console.log(
	'Entries selected for excludedFromCommons.js: ',
	excludeFromArray(Object.keys(entries), excludedFromCommons)
);

module.exports = {
	entries,
	plugins: [commonsChunkPlugin],
};
