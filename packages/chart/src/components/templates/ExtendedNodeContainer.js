import PropTypes from "prop-types";
import React from 'react'
import styles from '../styles/Canvas.module.css'
export default function ExtendedNodeContainer(props) {

    return (

        <div style={{
            boxShadow: props.showExtendedDependents ? 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' : undefined,
            border: props.showExtendedDependents ? '#0095ff 1px solid' : 'none',
            background: props.showExtendedDependents ? '#f4f5fa' : null,
            padding: props.showExtendedDependents ? '16px' : undefined,
            display: 'grid',
            placeContent: 'center',
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
