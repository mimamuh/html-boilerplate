/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const commonPaths = require('./../commonPaths');

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
							name: pathString => {
								const fromSrc = path.relative(
									commonPaths.sourcePath,
									pathString
								);
								const { dir } = path.parse(fromSrc);
								return `${dir}/[name]-[hash].[ext]`;
							},
						},
					},
				],
				exclude: [commonPaths.fontsSrcPath],
			},
		],
	},
});
