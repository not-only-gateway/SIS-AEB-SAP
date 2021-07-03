import styles from "../styles/Canvas.module.css";
import React from "react";
import PropTypes from "prop-types";

export default function NodeContent(props) {
  return (
    <span
      onClick={() => {
          props.setOpen(!props.open)
      }}
      onMouseOver={() => props.setHovered(true)}
      onMouseLeave={() => props.setHovered(false)}
      style={{
        border: ((props.hovered || props.hoveredParent) && !props.open && !props.showExtendedDependents ? '#0095ff 1px solid' : '#e0e0e0 1px solid'),
        width: props.open ? '100%' : 'auto',
        minWidth: '110px',
        background: 'white',
        height: '100%',
        margin: 'auto',
        cursor: props.showExtendedDependents ? 'default': 'pointer'
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
