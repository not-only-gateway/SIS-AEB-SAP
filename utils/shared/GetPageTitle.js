import Head from "next/head";
import {getTertiaryColor} from "../../styles/shared/MainStyles";
import mainStyles from "../../styles/shared/Main.module.css";
import React from "react";
import PropTypes from "prop-types";

export default function GetPageTitle(props){
    return (
        <div style={{padding: '15px 0px 5px 0px '}}>
            {props.pageName !== undefined ?
                <Head>
                    <title>{props.pageName}</title>
                </Head> : null}
            <div >
                <div style={{color: 'black'}} className={mainStyles.primaryHeader}>{props.pageTitle}</div>
                <div className={mainStyles.secondaryParagraph} style={getTertiaryColor({dark: props.dark})}>{props.pageInfo}</div>
            </div>
        </div>
    )
}
GetPageTitle.propTypes={
    pageTitle: PropTypes.string,
    pageName: PropTypes.string,
    pageInfo: PropTypes.string,
    dark: PropTypes.bool
}
