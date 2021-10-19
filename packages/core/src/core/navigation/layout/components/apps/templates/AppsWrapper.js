import PropTypes from "prop-types";
import React from "react";
import styles from '../styles/Apps.module.css'

export default function AppsWrapper(props) {
    return (
        <div className={styles.appsWrapper}>
            {props.children}
        </div>
    )
}

AppsWrapper.propTypes = {
    children: PropTypes.node
}