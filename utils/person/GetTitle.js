import React from "react";
import PropTypes from 'prop-types'
import mainStyles from '../../styles/shared/Main.module.css'
import {getPrimaryColor, getSecondaryColor, getTertiaryColor} from "../../styles/shared/MainStyles";

export default function getTitle(props) {
    return (
        <div className={mainStyles.baseWidth} style={{marginBottom: '2vh'}}>
            <p className={mainStyles.primaryParagraph} style={getPrimaryColor({dark: props.dark})}>{props.pageTitle}</p>
            <p className={mainStyles.tertiaryParagraph} style={getTertiaryColor({dark: props.dark})}>{props.pageInfo}</p>
        </div>
    )
}

getTitle.propTypes = {
    pageTitle: PropTypes.string,
    pageInfo: PropTypes.string,
    dark: PropTypes.bool
}