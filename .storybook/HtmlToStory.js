import React, { Component, PropTypes } from 'react';

/**
 * HtmlToStory - …
**/
class HtmlToStory extends Component {
    render() {
        const { htmlTemplate } = this.props;
        const parsedHtml = htmlTemplate;
        return <div dangerouslySetInnerHTML={{ __html: parsedHtml }} />;
    }
}
HtmlToStory.propTypes = {
    htmlTemplate: PropTypes.string.isRequired,
    templateVars: PropTypes.shape({
        team: PropTypes.string.isRequired,
        sessionStartDate: PropTypes.string.isRequired,
    }),
};
HtmlToStory.defaultProps = {};
export default HtmlToStory;
