/* eslint-disable import/no-extraneous-dependencies */
const commonPaths = require('./../common-paths');

/**
 * Webpack rules to load image assets
 *
 * @param {Object} env
 * @param {Object} argv
 */
// TODO: add webp support
// see: https://stevenfitzpatrick.io/blog/how-to-add-webp-images-to-your-page
// and: https://www.npmjs.com/package/webp-loader
// eslint-disable-next-line no-unused-vars
module.exports = (env, argv) => ({
	module: {
		rules: [
			{
				test: /\.(png|jpg|jpeg|gif|svg)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'img/[name]-[hash].[ext]',
							outputPath: 'assets/',
						},
					},
				],
				exclude: [commonPaths.fontsSrcPath],
			},
		],
	},
});
