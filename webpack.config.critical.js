// Critical extracts & inlines critical-path
// (above-the-fold) CSS from HTML. This config
// is based on https://github.com/addyosmani/critical
module.exports = {
	// Inline the generated critical-path CSS
	// - true generates HTML
	// - false generates CSS
	inline: false,

	// Viewport width
	width: 1800,

	// Viewport height
	height: 1600,

	// Minify critical-path CSS when inlining
	minify: true,

	// Extract inlined styles from referenced stylesheets
	extract: false,

	// Complete Timeout for Operation
	timeout: 30000,

	// ignore CSS rules
	ignore: ['font-face', '@font-face'],

	// overwrite default options
	ignoreOptions: {},
};
