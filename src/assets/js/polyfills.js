// polyfill for ES standard features
import '@babel/polyfill';

// polyfill for <picture> elements
import 'picturefill';

// polyfill for IntersectionObserver
// from: https://github.com/w3c/IntersectionObserver
import 'intersection-observer';

// polyfill for window.matchMedia
// https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia
// from: https://github.com/paulirish/matchMedia.js
import 'matchmedia-polyfill/matchMedia.js';
import 'matchmedia-polyfill/matchMedia.addListener.js';

// polyfill for: CustomEvent
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
// from: https://github.com/krambuhl/custom-event-polyfill
// needed for vanilla-lazyload
import 'custom-event-polyfill';

// polyfill for NodeList.forEach
// from: https://github.com/imagitama/nodelist-foreach-polyfill
import 'nodelist-foreach-polyfill';
