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
		// NOTE: The decorator plugin is somehow needed for the flow types and
		// because of that, we have to set class-properties to loose mode
		//
		// See more here: https://github.com/babel/babel/issues/8041
		//
		// Compatibility with @babel/plugin-proposal-class-properties
		// If you are including your plugins manually and using @babel/plugin-proposal-class-properties,
		// make sure that @babel/plugin-proposal-decorators comes before @babel/plugin-proposal-class-properties.
		// When using the legacy: true mode, @babel/plugin-proposal-class-properties must be used in loose mode
		// to support the @babel/plugin-proposal-decorators.
		['@babel/plugin-proposal-decorators', { legacy: true }],
		['@babel/plugin-proposal-class-properties', { loose: true }],
		'add-module-exports',
		'@babel/plugin-syntax-dynamic-import',
		'@babel/plugin-syntax-import-meta',
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
