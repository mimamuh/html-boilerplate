/*
    Import stuff which should be placed at
    the end of the <body> section
 */
import './polyfills';

// –– vanilla-lazyload
// see: https://github.com/verlok/lazyload
import LazyLoad from 'lazyload';

// –– jquery
// (optional)
// import $ from 'jquery';

// –– scss
// imports all our scss with webpack
import './../scss/global.scss';

// –– vue.js
// (optional)
// inis our vue app
import iniVueApp from './iniVueApp';

// –– inis our website
// run all your global ini code for your website here ...
window.onload = () => {
	iniVueApp({ element: '.vue-app' });

	// ini lazyloading
	// see: https://github.com/verlok/lazyload
	const lazyLoad = new LazyLoad();

	console.log('%cPage ready', 'background: #8be09f; color: #39485e');
};
