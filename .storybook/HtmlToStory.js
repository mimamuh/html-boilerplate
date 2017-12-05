// @flow
import React, { Component } from 'react';
import IniVueApp from './IniVueApp';

// flow types
type DefaultProps = {};
type Props = {
	htmlTemplate: string,
};
type State = {
	element: ?HTMLElement,
};

/**
 * HtmlToStory - …
 **/
class HtmlToStory extends Component {
	props: Props;
	state: State;
	static defaultProps: DefaultProps;
	static defaultProps = {};

	constructor(props) {
		super(props);

		this.state = {
			element: null,
		};
	}

	render() {
		const { htmlTemplate } = this.props;
		const parsedHtml = htmlTemplate;

		return (
			<div>
				<IniVueApp element={this.state.element} />
				<div
					dangerouslySetInnerHTML={{ __html: parsedHtml }}
					ref={this.storeRef}
				/>
			</div>
		);
	}

	storeRef = (node: ?HTMLElement) => {
		this.setState({ element: node });
	};
}
export default HtmlToStory;
