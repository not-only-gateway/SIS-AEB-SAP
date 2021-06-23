import PropTypes from "prop-types";
import React from 'react'

export default function ExtendedNodeContainer(props){
    return(
        <span style={{
            boxShadow: props.showExtendedDependents ? 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' : undefined,
            border: props.showExtendedDependents ? '#0095ff 1px solid' : 'none',
            background: props.showExtendedDependents ? '#f4f5fa' : null,
            padding: props.showExtendedDependents ? '16px  8px ' : undefined,
            display: 'grid',
            placeContent: 'center',
            position: 'relative',
            cursor: 'default'
        }}>
            {props.children}
        </span>
    )
}
ExtendedNodeContainer.propTypes={
    showExtendedDependents: PropTypes.bool
}