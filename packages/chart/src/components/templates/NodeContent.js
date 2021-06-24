import styles from "../styles/Canvas.module.css";
import React from "react";
import PropTypes from "prop-types";

export default function NodeContent(props) {
    return (
        <span
            onClick={() => {
                if (!props.open)
                    props.setOpen(true)
            }}
            onMouseOver={() => props.setHovered(true)}
            onMouseLeave={() => props.setHovered(false)}
            style={{
                border: ((props.hovered || props.hoveredParent) && !props.open ? '#0095ff 1px solid' : '#e0e0e0 1px solid'),
                width: props.open ? '100%' : 'auto',
                background: (props.hovered || props.hoveredParent) && !props.isExtendedChild && !props.showExtendedDependents ? '#f4f5fa' : 'white',
                height: '100%',
                margin: 'auto'
            }}
            className={[styles.fadeIn, styles.nodeContentContainer].join(' ')}
        >
                        {props.renderEntity(props.entity)}
                    </span>
    )
}
NodeContent.propTypes = {
    setOpen: PropTypes.func,
    setHovered: PropTypes.func,

    entity: PropTypes.object,
    showExtendedDependents: PropTypes.bool,
    isExtendedChild: PropTypes.bool,
    hoveredParent: PropTypes.bool,
    hovered: PropTypes.bool,
    open: PropTypes.bool,

    renderEntity: PropTypes.func
}