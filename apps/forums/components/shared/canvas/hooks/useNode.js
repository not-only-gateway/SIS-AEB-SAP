import NodeContextMenu from "../modules/ node/NodeContextMenu";
import Move from "../methods/move/MoveElement";
import React from "react";
import PropTypes from "prop-types";

export default function useNode(props) {
    props.setNodeColor(props.entity.highlight_color)
    if (props.linkable !== props.link) {
        props.setLink(props.linkable)
        if (props.linkable && props.toBeLinked.id !== props.entity.id) {
            if (props.openMenu === props.entity.id)
                props.setOpenContext(null, null, null, null)

            const entity = document.getElementById(props.toBeLinked.id + '-node')
            if (entity !== null && entity.getBoundingClientRect().top >= props.ref.current.getBoundingClientRect().top || props.parents.includes(props.toBeLinked.id))
                props.setNotAvailable(true)
        } else if (!props.linkable)
            props.setNotAvailable(false)
    }

    if (props.link && props.parents.length !== props.entity.parents) {
        props.setChildren(props.entity.children)
        props.setParents(props.entity.parents)
    }
    if (!props.fetched) {
        props.setParents(props.entity.parents)
        props.setChildren(props.entity.children)

        props.setFetched(true)

        if (props.elementRef.current.offsetWidth > props.elementRef.current.offsetHeight) {
            props.ref.current.style.width = (Math.ceil((props.elementRef.current.offsetWidth) / 30) * 30) + 'px'
            props.ref.current.style.height = (Math.ceil((props.elementRef.current.offsetHeight) / 30) * 30) + 'px'

        } else
            props.ref.current.style.width = (Math.ceil((props.elementRef.current.offsetHeight) / 30) * 30) + 'px'

    }

    if (props.ref.current !== null) {
        Move({
            handleChange: props.handleChange,
            element: props.ref.current,
            children: props.children,
            getLinkChild: props.getLinkChild,
            parents: props.parents,
            root: props.root,
            color: props.entity.highlight_color,
            overflowRef: props.overflowRef,
            entityKey: props.entity.id,
            canvasRef: props.canvasRef,
            index: props.index,
            scrollableDivID: props.scrollableDivID
        })
    }

}
useNode.propTypes = {
    scrollableDivID: PropTypes.any,
    index: PropTypes.number,
    handleChange: PropTypes.func,
    canvasRef: PropTypes.object,
    overflowRef: PropTypes.object,
    ref: PropTypes.object,
    parents: PropTypes.array,
    root: PropTypes.object,
    nodeColor: PropTypes.string,
    children: PropTypes.array,
    elementRef: PropTypes.object,
    setParents: PropTypes.func,
    setChildren: PropTypes.func,
    setFetched: PropTypes.func,
    link: PropTypes.bool,
    updateEntity: PropTypes.func,
    setLink: PropTypes.func,
    triggerUpdate: PropTypes.bool,

    openMenu: PropTypes.bool,
    setNodeColor: PropTypes.func,
}