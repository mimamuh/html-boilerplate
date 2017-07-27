/* eslint-disable prefer-arrow-callback */

// storybook imports
import React from 'react';
import { storiesOf, action } from '@storybook/react'; // eslint-disable-line no-unused-vars
import {
    text,
    boolean,
    number,
    color,
    object,
    array,
    select,
    date,
} from '@storybook/addon-knobs'; // eslint-disable-line no-unused-vars

// testing
// import { mount } from 'enzyme'; // eslint-disable-line no-unused-vars
// import { expect } from 'chai'; // eslint-disable-line no-unused-vars
// import { specs, describe, it } from 'storybook-addon-specifications'; // eslint-disable-line no-unused-vars

// your imports
import HtmlToStory from './../../../.storybook/HtmlToStory';
/* inject:imports */
import htmlTemplate from './../AButtonMenu.html';
/* endinject */

storiesOf(/* inject:filename */'AButtonMenu'/* endinject */, module)
    .add('default', () => (
        <HtmlToStory
            htmlTemplate={htmlTemplate}
        />
    ));
