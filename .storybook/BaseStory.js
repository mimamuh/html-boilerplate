/* eslint-disable prefer-arrow-callback */

// storybook imports
import React, { Component, PropTypes } from 'react';
import { storiesOf, action } from '@kadira/storybook'; // eslint-disable-line no-unused-vars
import { WithNotes } from '@kadira/storybook-addon-notes'; // eslint-disable-line no-unused-vars
import { text, boolean, number, object, select } from '@kadira/storybook-addon-knobs'; // eslint-disable-line no-unused-vars

// testing
// import { mount } from 'enzyme'; // eslint-disable-line no-unused-vars
// import { expect } from 'chai'; // eslint-disable-line no-unused-vars
// import { specs, describe, it } from 'storybook-addon-specifications'; // eslint-disable-line no-unused-vars

// your imports
import HtmlToStory from './../../../.storybook/HtmlToStory';
/* inject:imports */
/* endinject */

storiesOf(/* inject:filename *//* endinject */, module)
    .add('default', () => (
        <HtmlToStory
            htmlTemplate={htmlTemplate}
        />
    ));
