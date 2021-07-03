import PropTypes from "prop-types";
import React from 'react'
import styles from '../styles/Canvas.module.css'

export default function ExtendedNodeContainer(props) {

    return (

        <div style={{

            border: props.showExtendedDependents ? '#e0e0e0 1px solid' : 'none',
            padding: props.showExtendedDependents ? '16px' : undefined,
            display: 'grid',
            placeContent: 'center',
            background: props.showExtendedDependents ? 'white' : undefined,
            position: 'relative',
            cursor: 'default',
            width: 'fit-content',
            borderRadius: '8px',
            margin: props.showExtendedDependents ? '0 auto 24px' : '0 auto',

        }} className={props.row === 0 ? styles.noOutline : props.showExtendedDependents ? styles.transformElement : ''}>
            {props.children}
        </div>
    )
}
ExtendedNodeContainer.propTypes = {
    showExtendedDependents: PropTypes.bool,
    row: PropTypes.number
}
