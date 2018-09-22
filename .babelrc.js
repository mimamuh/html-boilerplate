module.exports = function(api) {
	const isDevelopment = api.env('development');

	const presets = [
		[
			'@babel/preset-env',
			{
				useBuiltIns: 'entry',
				ignoreBrowserslistConfig: false,
				targets: {
					node: 8,
					browsers: [
						'last 3 versions',
						'> 1% in DE',
						'Chrome >= 50',
						'Firefox >= 44',
						'Safari >= 9',
						'iOS >= 9',
						'Explorer >= 10',
						'Edge >= 12',
					],
				},
			},
		],
		'@babel/preset-react',
		'@babel/preset-flow',
	];

	const plugins = [
		'add-module-exports',
		'@babel/plugin-syntax-dynamic-import',
		'@babel/plugin-syntax-import-meta',
		'@babel/plugin-proposal-class-properties',
		'@babel/plugin-proposal-json-strings',
		'@babel/plugin-proposal-export-namespace-from',
		'@babel/plugin-proposal-numeric-separator',
		'@babel/plugin-proposal-export-default-from',
		'@babel/plugin-proposal-do-expressions',
	];

	if (isDevelopment) {
		plugins.push([
			'flow-runtime',
			{
				assert: true,
				annotate: true,
			},
		]);
	}

	return {
		presets,
		plugins,
	};
};
