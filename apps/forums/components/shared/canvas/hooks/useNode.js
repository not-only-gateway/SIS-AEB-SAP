import Move from "../methods/move/MoveElement";
import React from "react";
import PropTypes from "prop-types";

export default function useNode(props) {
    if (props.linkable !== props.link) {
        props.setLink(props.linkable)
        if (props.linkable && props.toBeLinked.id !== props.entity.id) {
            if (props.openMenu === props.entity.id)
                props.setOpenContext(null, null, null, null)
        }
    }


    if (props.elementRef.current.offsetWidth > props.elementRef.current.offsetHeight) {
        props.ref.current.style.width = (Math.ceil((props.elementRef.current.offsetWidth) / 30) * 30) + 'px'
        props.ref.current.style.height = (Math.ceil((props.elementRef.current.offsetHeight) / 30) * 30) + 'px'

    } else
        props.ref.current.style.width = (Math.ceil((props.elementRef.current.offsetHeight) / 30) * 30) + 'px'


}
useNode.propTypes = {
    handleChange: PropTypes.func,
    canvasRef: PropTypes.object,
    overflowRef: PropTypes.object,
    ref: PropTypes.object,
    root: PropTypes.object,

    elementRef: PropTypes.object,

    link: PropTypes.bool,
    updateEntity: PropTypes.func,
    setLink: PropTypes.func,
    triggerUpdate: PropTypes.bool
}