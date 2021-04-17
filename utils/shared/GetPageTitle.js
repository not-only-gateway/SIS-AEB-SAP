import Head from "next/head";
import {getPrimaryColor, getTertiaryColor} from "../../styles/shared/MainStyles";
import mainStyles from "../../styles/shared/Main.module.css";
import React from "react";
import PropTypes from "prop-types";

export default function GetPageTitle(props){
    return (
        <div style={{marginBottom: '2vh'}}>
            {props.pageName !== undefined ?
                <Head>
                    <title>{props.pageName}</title>
                </Head> : null}
            <div style={{margin: 'auto', width: '45vw'}}>
                <p style={getPrimaryColor({dark: props.dark})} className={mainStyles.primaryHeader}>{props.pageTitle}</p>
                <p className={mainStyles.secondaryParagraph} style={getTertiaryColor({dark: props.dark})}>{props.pageInfo}</p>
            </div>
        </div>
    )
}
GetPageTitle.propTypes ={
    pageTitle: PropTypes.string,
    pageName: PropTypes.string,
    pageInfo: PropTypes.string,
    dark: PropTypes.bool
}
