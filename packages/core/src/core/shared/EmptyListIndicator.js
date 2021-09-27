import {FolderRounded} from "@material-ui/icons";
import React from "react";
import ListsPT from "../list/old/locales/ListsPT";
import styles from './Indicator.module.css'
import PropTypes from "prop-types";

export default function EmptyListIndicator(props) {
    const lang = ListsPT

    return (
        <div className={styles.content}>
            <FolderRounded style={{fontSize: '130px'}}/>
            <h5 className={styles.label}>{props.customLabel ? props.customLabel : lang.nothingFound}</h5>
        </div>
    )
}

EmptyListIndicator.propTypes={
    customLabel: PropTypes.string
}