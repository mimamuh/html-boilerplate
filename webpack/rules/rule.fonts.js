/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const commonPaths = require('./../commonPaths');

/**
 * Webpack rules to load font assets
 *
 * @param {Object} env
 * @param {Object} argv
 */
// eslint-disable-next-line no-unused-vars
module.exports = (env, argv) => ({
	module: {
		rules: [
			{
				test: /\.(woff|woff2|eot|ttf|svg)$/,
				include: [commonPaths.fontsSrcPath],
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
			},
		],
	},
});
