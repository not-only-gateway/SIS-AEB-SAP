import PropTypes from "prop-types";
import styles from '../styles/Apps.module.css'
import ToolTip from "../../../../../misc/tooltip/ToolTip";
import React from "react";

export default function App(props) {
    return (
        <button disabled={props.disabled} onClick={() => props.redirect(props.path)} className={[styles.appButton, styles.overflowEllipsis].join(' ')}>
            {props.icon}
            <div className={styles.appLabel}>
                {props.label}
            </div>
            <ToolTip content={props.label}/>
        </button>
    )
}
App.propTypes = {
    disabled: PropTypes.bool,
    path: PropTypes.string,
    redirect: PropTypes.func,
    icon: PropTypes.object,
    label: PropTypes.string
}
