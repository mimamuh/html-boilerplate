/* eslint-disable import/no-extraneous-dependencies */

/**
 * Optimization rules for a multi page application like
 * a standard website. For easier handling the chunks
 * are splitted by their entry points and common chunks
 * are bundled in a commons file. This increases the
 * file size of the commons file and initial load time
 * but once cached it should be quicker.
 *
 * @param {Object} env
 * @param {Object} argv
 */
// eslint-disable-next-line no-unused-vars
module.exports = (env, argv) => ({
	optimization: {
		splitChunks: {
			// Create a commons chunk, which includes all code shared between entry points.
			cacheGroups: {
				// To disable any of the default cache groups, set them to false
				default: false,
				commons: {
					name: 'commons',
					chunks: 'initial',
					minChunks: 2,
				},
			},
		},
	},
});
