/**
* @Author: Michael Neumair <mBook>
* @Date:   2017-02-14T16:50:26+01:00
* @Email:  7q7w7e7r@gmail.com
* @Last modified by:   mBook
* @Last modified time: 2017-02-22T16:49:30+01:00
*/

'use strict';

const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

function defaultValue(options, optionKey, defaultVal) {
    return Object.prototype.hasOwnProperty.call(options, optionKey)
        ? options[optionKey]
        : defaultVal;
}

// Uses a html template and outputs it.
// see also: https://github.com/jantimon/html-webpack-plugin#configuration
function useHtmlTemplateFactory(globalOptions) {
    // Track usage of your site via Google Analytics.
    let googleAnalytics = defaultValue(globalOptions, 'googleAnalytics', null);
    if (googleAnalytics) {
        googleAnalytics = {
            // the tracking id for your site
            trackingId: defaultValue(
                googleAnalytics,
                'trackingId',
                'UA-XXXX-XX'
            ),
            // Log a pageview event after the analytics code loads.
            pageViewOnLoad: defaultValue(
                googleAnalytics,
                'pageViewOnLoad',
                true
            ),
            // if the ip of the visitors should be anonymized
            // needed by german privacy law
            anonymizeIp: defaultValue(googleAnalytics, 'anonymizeIp', true),
        };
    }

    globalOptions = {
        // if the html files should be minified
        minify: defaultValue(globalOptions, 'minify', false),
        // where to inject the bundle files.
        // One of true | 'head' | 'body' | false
        inject: defaultValue(globalOptions, 'inject', false),
        // the relative output path of the files, defaults to '/'
        outputPath: defaultValue(globalOptions, 'outputPath', '/'),
        // Adjust the URL for relative URLs in the document
        // see: https://developer.mozilla.org/en/docs/Web/HTML/Element/base
        baseHref: defaultValue(
            globalOptions,
            'baseHref',
            'http://localhost:8080'
        ),
        // insert the webpack-dev-server hot reload script
        // at this host:port/path; e.g., http://localhost:3000.
        devServer: defaultValue(
            globalOptions,
            'devServer',
            'http://localhost:8080'
        ),
        // Track usage of your site via Google Analytics.
        googleAnalytics,
        // inlineManifestWebpackName: For use with inline-manifest-webpack-plugin.
    };

    return options => {
        console.log(
            path.resolve(
                __dirname,
                globalOptions.outputPath,
                path.parse(options.template).base
            )
        );

        if (typeof options.template !== 'string') {
            throw new Error('Needs template path in options');
        }

        return new HTMLWebpackPlugin({
            // path of the html template in src
            template: path.resolve(__dirname, options.template),
            // page title
            title: defaultValue(options, 'title', 'NEEDS AN TITLE'),
            // description text for search engines – max 160 chars!
            description: defaultValue(options, 'description', ''),

            // -- global options
            filename: path.resolve(
                __dirname,
                globalOptions.outputPath,
                path.parse(options.template).name + '.html'
            ),
            minify: globalOptions.minify,
            inject: globalOptions.inject,
            outputPath: globalOptions.outputPath,
            baseHref: globalOptions.baseHref,
            devServer: globalOptions.devServer,
            googleAnalytics: globalOptions.googleAnalytics
        });
    };
}

/** CONFIG YOUR HTML PAGES HERE **/
// config your html pages here ...
function getHtmlFilePlugins(options) {
    const useHtml = useHtmlTemplateFactory(options);

    return [
        useHtml({
            title: '404',
            description:
                'Squares And Brackets erstellt Webseiten, Apps & WebApps in hoher Qualität.',
            template: './src/404/P404.hbs'
        }),
    ];
}

// export stuff
module.exports = {
    getHtmlFilePlugins
};
