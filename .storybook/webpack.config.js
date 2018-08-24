const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const vueRule = require('./../webpack/rules/rule.vue');
const htmlRule = require('./../webpack/rules/rule.html');
const fontsRule = require('./../webpack/rules/rule.fonts');
const imagesRule = require('./../webpack/rules/rule.images');
const audioRule = require('./../webpack/rules/rule.audio');

// as the scss rule is so different between storybook and the
// setup we have in our webpack config, we have a custom one here
const scssRule = {
	module: {
		rules: [
			{
				// scss loader - uses postcss and autoprefixer
				test: /\.(scss|css)$/,
				loader: [
					'style-loader',
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							plugins: () => [require('autoprefixer')],
						},
					},
					'sass-loader',
				],
			},
		],
	},
};

// Export a function. Accept the base config as the only param.
module.exports = (storybookBaseConfig, configType) => {
	// configType has a value of 'DEVELOPMENT' or 'PRODUCTION'
	// You can change the configuration based on that.
	// 'PRODUCTION' is used when building the static version of storybook.
	const env = {
		mode: configType === 'DEVELOPMENT' ? 'development' : 'production',
	};

	const argv = {
		mode: configType === 'DEVELOPMENT' ? 'development' : 'production',
	};

	// Return the altered config
	return webpackMerge(
		storybookBaseConfig,
		htmlRule(env, argv),
		scssRule,
		fontsRule(env, argv),
		vueRule(env, argv),
		imagesRule(env, argv),
		audioRule(env, argv)
	);
};
