import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import backgrounds from '@storybook/addon-backgrounds';

// –– picturefill
import 'picturefill';

// –– scss
// global css files
import './../src/assets/scss/global.scss';

// –– decorators
// global knobs decorator
addDecorator(withKnobs);

// –– backgrounds
addDecorator(
	backgrounds([
		{ name: 'white', value: '#fff', default: true },
		{ name: 'black', value: '#000' },
	])
);

// ini storybook
function configureStories() {
	// 1. identify sotires
	const req = require.context(
		'./../src/',
		true,
		/\/stories\/[A-Z,a-z,0-9,\.]*\.js$/
	);

	// 2. load and configure them
	function loadStories() {
		req.keys().forEach(req);
	}

	configure(loadStories, module);
}

configureStories();
