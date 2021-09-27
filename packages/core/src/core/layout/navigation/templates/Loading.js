import PropTypes from "prop-types";
import styles from '../styles/Animations.module.css'
import React from 'react'

export default function Loading(props) {
    return (
        <div className={styles.loading} style={{display: props.loading? undefined : 'none'}}/>
    )
}

Loading.propTypes = {
    loading: PropTypes.bool
}
