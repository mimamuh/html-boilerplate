/**
* @Author: Matthias Gohla <Matze>
* @Date:   2016-12-16T17:47:26+01:00
* @Email:  matze_lebt@gmx.de
* @Last modified by:   Matze
* @Last modified time: 2017-01-19T14:49:21+01:00
*/

import { configure, addDecorator } from '@kadira/storybook';
import backgrounds from 'react-storybook-addon-backgrounds';
import { withKnobs } from '@kadira/storybook-addon-knobs';

// picturefill
import 'picturefill';

// global css files
import './../src/assets/scss/main.scss';


// global background decorator
addDecorator(backgrounds([
    { name: 'white', value: '#fff', default: true },
    { name: 'grey', value: '#e5e9e9' },
    { name: 'black', value: '#000' },
]));

// global knobs decorator
addDecorator(withKnobs);


// require all stories by using a convention:
const req = require.context('./../src/', true, /\/stories\/[A-Z,a-z,0-9,.]*\.js$/);

function loadStories() {
    req.keys().forEach(req);
}

configure(loadStories, module);
