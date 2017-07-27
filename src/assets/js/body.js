/*
    Import stuff which should be placed at
    the end of the <body> section
 */

import $ from 'jquery';

// This will emulate a full ES2015 environment and is
// intended to be used in an application rather than a library/tool.
import 'babel-polyfill';

import './../scss/main.scss';

// needed plugins for scrollmagic
// NOTE: we has to use the import-loader?define=>false as we
// get an error otherwise using webpack to import. it
// see: https://www.reddit.com/r/Frontend/comments/4dshb8/new_to_webpack_problem_using_scrollmagic_gsap/
import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap';

// we only load this plugin on development
if (process.env.NODE_ENV === 'development') {
    require('imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators');
}


$(document).ready(() => {
    console.log('Page ready');
});
