// @flow
import React, { Component } from 'react';
import type { Children } from 'react';
import iniVueApp from '../src/assets/js/iniVueApp';

// flow types
type DefaultProps = {};
type Props = {
	element: ?HTMLElement,
};
type State = {};

class IniVueApp extends Component {
	props: Props;
	state: State;
	rootNode: ?HTMLElement;
	static defaultProps: DefaultProps;
	static defaultProps = {};

	componentDidMount() {
		this.iniVueApp();
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.element !== nextProps.element) {
			this.iniVueApp(nextProps.element);
		}
	}

	componentWillUnmount() {
		this.destroyVueApp();
	}

	render() {
		return <div />;
	}

	iniVueApp(element = this.props.element) {
		if (!element) {
			return;
		}

		this.destroyVueApp();

		if (!this._vueApp) {
			console.info('%cini vue', 'color: #54BA81');
			// inis our vue-app stuff here after the story is rendered.
			// This way, we could parse our stories for vue components
			// and render them with vuejs.
			// It needs the vue compiler beside the vue runtime to do so.
			// You need to configure your webpack to include the runtime + compiler
			// build of vue instead just the default runtime-only build.
			// see: https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
			this._vueApp = iniVueApp({
				element,
			});
		}
	}

	destroyVueApp() {
		if (this._vueApp) {
			console.log('%cdestroy vue', 'color: #39485E');
			this._vueApp.$destroy();
			this._vueApp = null;
		}
	}
}
export default IniVueApp;
