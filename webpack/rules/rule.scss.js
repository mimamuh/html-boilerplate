/* eslint-disable import/no-extraneous-dependencies */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

/**
 * Webpack rules to load scss assets
 *
 * @param {Object} env
 * @param {Object} argv
 */
// eslint-disable-next-line no-unused-vars
module.exports = (env, argv) => ({
	module: {
		rules: [
			{
				// scss loader - uses postcss and autoprefixer
				test: /\.(scss|css)$/,
				use: [
					{
						loader:
							argv.mode === 'production'
								? MiniCssExtractPlugin.loader
								: 'style-loader',
					},
					{
						loader: 'css-loader',
						options: {
							// Path to resolve URLs, URLs starting
							// with / will not be translated
							minimize: argv.mode === 'production',
							sourceMap: true,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins() {
								return [autoprefixer];
							},
							sourceMap: false, // NOTE: TODO: normally it should be true, but set to false because of issues.
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: false, // NOTE: TODO: normally it should be true, but set to false because of issues.
						},
					},
				],
			},
		],
	},

	plugins: [
		new MiniCssExtractPlugin({
			filename:
				argv.mode === 'development' ? '[name].css' : '[name].[contenthash].css',
			chunkFilename:
				argv.mode === 'development' ? '[id].css' : '[id].[contenthash].css',
		}),
	],
});
