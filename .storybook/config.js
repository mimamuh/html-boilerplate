import { configure, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

// picturefill
import 'picturefill';

// global css files
import './../src/assets/scss/global.scss';

// global knobs decorator
addDecorator(withKnobs);

// ini storybook
function configureStories() {
    // 1. identify sotires
    const req = require.context(
        './../src/',
        true,
        /\/stories\/[A-Z,a-z,0-9,\.]*\.js$/,
    );

    // 2. load and configure them
    function loadStories() {
        req.keys().forEach(req);
    }

    configure(loadStories, module);
}

configureStories();
