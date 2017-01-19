/**
* @Author: Matthias Gohla <Matze>
* @Date:   2016-12-16T17:47:26+01:00
* @Email:  matze_lebt@gmx.de
* @Last modified by:   Matze
* @Last modified time: 2017-01-19T10:32:41+01:00
*/

import { configure } from '@kadira/storybook';

// picturefill
import 'picturefill';

// global css files
import './../code/src/scss/_main.scss';

// require all stories by using a convention:
const req = require.context('./../code/src/', true, /\/stories\/[A-Z,a-z,0-9]*\.js$/);


function loadStories() {
    req.keys().forEach(req);
}

configure(loadStories, module);
