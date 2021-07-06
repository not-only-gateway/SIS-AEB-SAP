import PropTypes from 'prop-types'
import styles from "../styles/Styles.module.css";
import {ArrowForwardIosRounded} from "@material-ui/icons";
import React from "react";

export default function Connection(props) {
    return (
        <div className={styles.lineContainer}
             style={{
                 cursor: props.editable ? 'pointer' : 'default',
                 // background: props.editable ? undefined : 'red'
             }}
             id={props.parent + '-line-' + props.entityKey}>
            <div id={props.parent + '-line-indicator-objective-' + props.entityKey}
                 className={styles.indicatorContainer}>
                <ArrowForwardIosRounded
                    style={{transform: 'rotate(-90deg)', color: props.editable ? undefined : '#777777'}}/>
            </div>
        </div>
    )
}
Connection.propTypes = {
    parent: PropTypes.number,
    entityKey: PropTypes.number,
    editable: PropTypes.bool
}