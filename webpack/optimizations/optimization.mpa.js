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
			// This indicates which chunks will be selected for optimization.
			// If a string is provided, possible values are all, async, and
			// initial. Providing all can be particularly powerful because
			// it means that chunks can be shared even between async and
			// non-async chunks.
			chunks: 'all',
			// Create a commons chunk, which includes all code shared between entry points.
			cacheGroups: {
				commons: {
					name: 'commons',
					chunks: 'initial',
					minChunks: 2,
				},
			},
		},
	},
});
