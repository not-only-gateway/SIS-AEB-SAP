import {FolderRounded} from "@material-ui/icons";
import React from "react";
import styles from './Indicator.module.css'
import PropTypes from "prop-types";

export default function EmptyListIndicator(props) {
    return (
        <div className={styles.content}>
            <FolderRounded style={{fontSize: '130px'}}/>
            <h5 className={styles.label}>{props.customLabel ? props.customLabel : "Lista vazia, nada encontrado."}</h5>
        </div>
    )
}

EmptyListIndicator.propTypes={
    customLabel: PropTypes.string
}
