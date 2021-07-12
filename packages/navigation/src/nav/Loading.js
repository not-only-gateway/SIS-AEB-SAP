import PropTypes from "prop-types";
import styles from './styles/Loading.module.css'
import React from 'react'

export default function Loading(props) {

    if (props.loading)
        return (

            <div className={styles.loading}/>
        )
    else
        return null
}

Loading.propTypes = {
    loading: PropTypes.bool
}
