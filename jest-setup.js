/* eslint-disable import/no-extraneous-dependencies */

// Setup file to merry enzyme with react
// To use enzyme with jest in this project, add
// this file to your "setupFiles" config of "jest"
// in your "package.json".
// see more: https://facebook.github.io/jest/docs/en/configuration.html#setupfiles-array
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

// Make Enzyme functions available in all test files without importing
global.shallow = shallow;
global.render = render;
global.mount = mount;
