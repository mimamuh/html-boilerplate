/**
* @Author: Matthias Gohla <Matze>
* @Date:   2017-01-14T14:25:16+01:00
* @Email:  matze_lebt@gmx.de
* @Last modified by:   Matze
* @Last modified time: 2017-01-16T12:41:41+01:00
*/


// import mustache from 'mustache';
/* eslint-disable prefer-arrow-callback */
// storybook imports
import React, { Component, PropTypes } from 'react';
import { storiesOf, action } from '@kadira/storybook'; // eslint-disable-line no-unused-vars
import { WithNotes } from '@kadira/storybook-addon-notes'; // eslint-disable-line no-unused-vars
import { withKnobs, text, boolean, number, object, select } from '@kadira/storybook-addon-knobs'; // eslint-disable-line no-unused-vars
import backgrounds from 'react-storybook-addon-backgrounds'; // eslint-disable-line no-unused-vars

// testing
// import { mount } from 'enzyme'; // eslint-disable-line no-unused-vars
// import { expect } from 'chai'; // eslint-disable-line no-unused-vars
// import { specs, describe, it } from 'storybook-addon-specifications'; // eslint-disable-line no-unused-vars

// your imports
import HtmlToStoryWithMustache from './../../../../../.storybook/HtmlToStoryWithMustache';
/* inject:imports */
import htmlTemplate from './../AImages.html';
/* endinject */

storiesOf(/* inject:filename */'AImages'/* endinject */, module)
    .addDecorator(withKnobs)
    .addDecorator(backgrounds([
        { name: 'white', value: '#fff' },
        { name: 'grey', value: '#e5e9e9' },
        { name: 'black', value: '#000' },
    ]))
    .add('default', () => (
        <HtmlToStoryWithMustache
            htmlTemplate={htmlTemplate}
        />
    ));
