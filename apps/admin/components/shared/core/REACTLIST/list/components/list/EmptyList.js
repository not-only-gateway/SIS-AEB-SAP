import {FolderRounded} from "@material-ui/icons";
import React from "react";
import styles from '../../styles/Indicator.module.css'
import PropTypes from "prop-types";

export default function EmptyList(props) {
    return (
        <div className={styles.content}>
            <FolderRounded style={{fontSize: '130px', color: '#999999'}}/>
            <h5 style={{textAlign: 'center', color: '#777777'}}>{props.customLabel ? props.customLabel : 'Lista vazia'}</h5>
        </div>
    )
}

EmptyList.propTypes={
    customLabel: PropTypes.string
}