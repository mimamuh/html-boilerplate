const path = require('path');

module.exports = {
	// The path where we build our bundles
	outputPath: path.resolve(__dirname, '../', 'dist'),
	// Source path of the project where your source files are ...
	sourcePath: path.resolve(__dirname, '../', 'src'),
	// The general assets folder in our dist project
	assetsPath: path.resolve(__dirname, '../', 'dist/assets/'),
	// In which source directory should we search for fonts
	fontsSrcPath: path.resolve(__dirname, '../', 'src/assets/fonts/'),
	// In which source directory should we search for audio files
	audiosSrcPath: path.resolve(__dirname, '../', 'src/assets/audio/'),
	// Directory where we look for extension specific config files
	configsFilesDir: path.resolve(__dirname, '..', '/'),
	// webpack-dev-server host settings
	devServer: {
		// Specify a host to use. By default this is localhost.
		// If you want your server to be accessible externally,
		// specify it like this: '0.0.0.0'
		host: 'localhost',
		// Specify a port number to listen for requests on.
		port: 8080,
		// By default dev-server will be served over HTTP. It can
		// optionally be served over HTTP/2 with HTTPS
		https: false,
	},
};
