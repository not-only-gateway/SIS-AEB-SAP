import {FolderRounded} from "@material-ui/icons";
import React from "react";
import ListsPT from "../list/locales/ListsPT";
import styles from '../list/styles/Indicator.module.css'
import PropTypes from "prop-types";

export default function EmptyListIndicator(props) {
    const lang = ListsPT

    return (

        <div className={styles.content}>
            <FolderRounded style={{fontSize: '130px', color: '#999999'}}/>
            <h5 style={{textAlign: 'center', color: '#777777'}}>{props.customLabel ? props.customLabel : lang.nothingFound}</h5>
        </div>
    )
}

EmptyListIndicator.propTypes={
    customLabel: PropTypes.string
}