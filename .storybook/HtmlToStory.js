// @flow
import React, { Component } from 'react';

// flow types
type DefaultProps = {};
type Props = {
	htmlTemplate: string,
};
type State = {};

/**
 * HtmlToStory - …
 **/
class HtmlToStory extends Component {
	props: Props;
	state: State;
	static defaultProps: DefaultProps;
	static defaultProps = {};

	render() {
		const { htmlTemplate } = this.props;
		const parsedHtml = htmlTemplate;
		return <div dangerouslySetInnerHTML={{ __html: parsedHtml }} />;
	}
}
export default HtmlToStory;
