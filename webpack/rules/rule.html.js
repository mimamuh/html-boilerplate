/* eslint-disable import/no-extraneous-dependencies */

/**
 * Webpack rules to get html files
 *
 * @param {Object} env
 * @param {Object} argv
 */
// eslint-disable-next-line no-unused-vars
module.exports = (env, argv) => ({
	module: {
		rules: [
			{
				// load html files
				test: /\.(html|htm)$/,
				use: [
					{
						loader: 'html-loader',
						options: {
							// You can specify which tag-attribute combination
							// should be processed by this loader via the query
							// parameter attrs. Pass an array or a space-separated
							// list of <tag>:<attribute> combinations.
							// (Default: attrs=img:src)
							attrs: [
								':data-src',
								'img:src',
								'img:data-src',
								'img:srcset',
								'img:data-srcset',
								'source:srcset',
								'source:data-srcset',
								'img:data-zoom-target',
							],
							// You can use interpolate flag to enable interpolation
							// syntax for ES6 template strings in html like:
							// ${require('./example.html')}
							interpolate: true,
							// if we should minimize loaded html
							minimize: false,
						},
					},
				],
			},
		],
	},
});
