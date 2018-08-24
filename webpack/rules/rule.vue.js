/* eslint-disable import/no-extraneous-dependencies */
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const usesExtension = require('./../utils/usesExtension');
const colors = require('colors');

/**
 * Webpack rules to load vue assets
 *
 * @param {Object} env
 * @param {Object} argv
 */
// eslint-disable-next-line no-unused-vars
module.exports = (env, argv) => {
	const usesJavascriptRule = usesExtension(
		env,
		usesExtension.type.rules,
		'javascript'
	);

	if (!usesJavascriptRule) {
		console.log(
			colors.yellow(
				'INFO: Rule "vue" may need a rule like "javascript" to work probably. Add "--env.rules=javascript" to your script in package.json.'
			)
		);
	}

	const usesScssRule = usesExtension(env, usesExtension.type.rules, 'scss');

	if (!usesScssRule) {
		console.log(
			colors.yellow(
				'INFO: Rule "vue" may need a rule like "scss" to work probably. Add "--env.rules=scss" to your script in package.json.'
			)
		);
	}

	return {
		resolve: {
			alias: {
				// using the standalone build (compiler + runtime)
				// instead of the default runtime-only build
				// see: https://github.com/vuejs/vue/tree/dev/dist#explanation-of-build-files
				vue:
					argv.mode === 'development'
						? 'vue/dist/vue.js'
						: 'vue/dist/vue.min.js',
			},
		},

		module: {
			rules: [
				{
					test: /\.vue$/,
					loader: 'vue-loader',
				},
			],
		},

		plugins: [new VueLoaderPlugin()],
	};
};
