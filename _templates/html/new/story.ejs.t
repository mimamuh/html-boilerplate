---
to: src/<%= category %>/stories/<%= name %>.js
---
/* eslint-disable prefer-arrow-callback, eslint-disable-line, no-unused-vars */

// storybook imports
import React from 'react';
import { storiesOf, action } from '@storybook/react';
import {
	text,
	boolean,
	number,
	color,
	object,
	array,
	select,
	date,
} from '@storybook/addon-knobs';

// your imports
import HtmlToStory from './../../../.storybook/HtmlToStory';
import htmlTemplate from './../<%= name %>.html';

storiesOf('<%= name %>', module).add(
	'default',
	() => <HtmlToStory htmlTemplate={htmlTemplate} />
);




