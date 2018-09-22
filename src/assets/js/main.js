/* eslint-disable import/first */

// –– lazysizes (lazyloading)
// see: https://www.npmjs.com/package/lazysizes
import 'lazysizes';

// –– scss
// imports all our scss with webpack
import './../scss/global.scss';

// –– vue.js
// ini vue app
import iniVueApp from './iniVueApp';

// –– ini website
// more about the ready states:
// https://javascript.info/onload-ondomcontentloaded

// The DOMContentLoaded event is fired when the initial
// HTML document has been completely loaded and parsed,
// without waiting for stylesheets, images, and
// subframes to finish loading.
// eslint-disable-next-line no-unused-vars
document.addEventListener('DOMContentLoaded', event => {
	const vueContainers = document.querySelectorAll('.vue-app');
	vueContainers.forEach(element => {
		iniVueApp({
			element,
		});
	});

	console.log(
		'%cDOM fully loaded and parsed',
		'background: #8be09f; color: #39485e'
	);
});

// The load event is fired when a resource and its
// dependent resources have finished loading.
// eslint-disable-next-line no-unused-vars
window.addEventListener('load', event => {
	console.log(
		'%cAll resources finished loading!',
		'background: #8be09f; color: #39485e'
	);
});
