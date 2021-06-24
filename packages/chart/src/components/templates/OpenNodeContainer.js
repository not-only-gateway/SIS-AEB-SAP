import PropTypes from "prop-types";
import React from 'react'

export default function OpenNodeContainer(props) {
    return (

        <span
            id={"node-" + props.entityKey}
            style={{
                border: props.isExtendedChild ? 'none' : (props.open ? '#0095ff 1px solid' : 'transparent 1px solid'),
                padding: props.open && !props.isExtendedChild ? '16px' : '0',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                borderRadius: '8px',
                transition: '250ms ease-in-out',
                position: 'relative'
            }}

        >

           {props.children}

       </span>
    )
}
OpenNodeContainer.propTypes = {
    open: PropTypes.bool,
    isExtendedChild: PropTypes.bool,
    entityKey: PropTypes.any
}
