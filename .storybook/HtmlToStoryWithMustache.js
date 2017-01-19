/**
* @Author: Matthias Gohla <Matze>
* @Date:   2016-12-20T13:37:26+01:00
* @Email:  matze_lebt@gmx.de
* @Last modified by:   Matze
* @Last modified time: 2017-01-16T12:15:32+01:00
*/
import React, { Component, PropTypes } from 'react';
// import mustache from 'mustache';

/**
 * HtmlToStoryWithMustache - …
**/
class HtmlToStoryWithMustache extends Component {

    render() {
        const { htmlTemplate } = this.props;
        // const parsedHtml = this.replaceTokensWithText(htmlTemplate);
        const parsedHtml = htmlTemplate;
        return (
            <div
                dangerouslySetInnerHTML={{ __html: parsedHtml }}
            />
        );
    }

    // replaceTokensWithText(textWithTokens) {
    //     const { templateVars } = this.props;
    //     return mustache.render(textWithTokens, templateVars);
    // }
}
HtmlToStoryWithMustache.propTypes = {
    htmlTemplate: PropTypes.string.isRequired,
    templateVars: PropTypes.shape({
        team: PropTypes.string.isRequired,
        sessionStartDate: PropTypes.string.isRequired,
    }),
};
HtmlToStoryWithMustache.defaultProps = {};
export default HtmlToStoryWithMustache;
