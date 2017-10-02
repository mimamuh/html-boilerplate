'use strict';

const HTMLWebpackPlugin = require('html-webpack-plugin');

// based on HTMLWebpackPlugin
const defaultConfig = {
    // // if the html files should be minified
    // minify: false,
    // where to inject the bundle files.
    // One of true | 'head' | 'body' | false
    inject: false,
    // the relative output path of the files, defaults to '/'
    outputPath: '/',
    // Adjust the URL for relative URLs in the document
    // see: https://developer.mozilla.org/en/docs/Web/HTML/Element/base
    baseHref: 'http://localhost:8080',
    // insert the webpack-dev-server hot reload script
    // at this host:port/path; e.g., http://localhost:3000.
    devServer: 'http://localhost:8080',
    // Track usage of your site via Google Analytics.
    googleAnalytics: null,
};

/** CONFIG YOUR HTML PAGES HERE **/
// Add all pages you wanna build here to the array.
// We use the HTMLWebpackPlugin to extract. You could
// use either html files or handlebars files (.hbs).
const pages = [
    // index.hbs -> index.html
    {
        // path of the html template in src
        template: './src/404/P404.hbs',
        // page title
        title: '404',
        // description text for search engines – max 160 chars!
        description:
            'Squares And Brackets erstellt Webseiten, Apps & WebApps in hoher Qualität.',
        // filename after build
        filename: '404.html',
    },
    // // example.html
    // {
    //     // path of the html template in src
    //     template: './src/example/example.html',
    //     // page title
    //     title: 'Another example page',
    //     // description text for search engines – max 160 chars!
    //     description: '…',
    //     // filename after build
    //     filename: 'example.html'
    // }
];

// merge the pages config with the defaultConfig
// and the overwrites and pass them to the
// HTMLWebpackPlugin plugin.
function getPages(overwrites) {
    return pages.map(page => {
        return new HTMLWebpackPlugin(
            Object.assign(
                page,
                defaultConfig, // base config …
                overwrites, // overwrite defaults …
            ),
        );
    });
}

// export stuff
module.exports = {
    getPages,
};
