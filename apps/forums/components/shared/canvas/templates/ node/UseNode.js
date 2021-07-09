import NodeContextMenu from "./NodeContextMenu";
import Move from "../../methods/move/MoveElement";
import React from "react";
import PropTypes from "prop-types";
import RefreshLinks from "./RefreshLinks";


export default function UseNode(props) {
    if (props.ref.current !== null)
        props.ref.current.addEventListener('contextmenu', function (e) {
            if (!props.linkable) {
                if (props.openMenu === props.entityKey)
                    props.setOpenMenu(null, null, null, null)
                else
                    props.setOpenMenu(
                        <NodeContextMenu setLink={props.setLink} link={props.link}
                            entity={props.containerRef} editable={props.options.edit}
                            edit={props.edit} linkable={props.linkable}
                            show={props.show} handleLink={props.handleLink}
                            setLinkable={props.setLinkable}/>, (e.clientX), (e.clientY - props.root.offsetTop - props.ref.current.offsetHeight / 2), props.entityKey)
            }

            e.preventDefault();
        }, false);


    props.setNodeColor(props.getNodeColor(props.entity))
    if (props.linkable !== props.link) {
        props.setLink(props.linkable)
        if (props.linkable && props.getEntityKey(props.toBeLinked) !== props.getEntityKey(props.containerRef.current)) {
            if (props.openMenu === props.entityKey)
                props.setOpenMenu(null, null, null, null)

            const entity = document.getElementById(props.getEntityKey(props.toBeLinked) + '-node')
            if (entity !== null && entity.getBoundingClientRect().top >= props.ref.current.getBoundingClientRect().top || props.parents.includes(props.getEntityKey(props.toBeLinked)))
                props.setNotAvailable(true)
        } else if (!props.linkable)
            props.setNotAvailable(false)
    }
    RefreshLinks({
        parents: props.parents,
        ref: props.ref,
        entityKey: props.entityKey,
        getLinkParent: props.getLinkParent
    })
    if (props.triggerUpdate) {
        props.setLink(false)
        props.updateEntity({
            id: props.entityKey,
            x: props.ref.current.offsetLeft,
            y: props.ref.current.offsetTop
        })
    }
    if (props.link && props.parents.length !== props.getParentKeys(props.containerRef.current)) {
        props.setChildren(props.getChildrenKeys(props.containerRef.current))
        props.setParents(props.getParentKeys(props.containerRef.current))
    }
    if (!props.fetched) {

        props.containerRef.current = props.entity

        props.setParents(props.getParentKeys(props.entity))
        props.setChildren(props.getChildrenKeys(props.entity))

        props.setFetched(true)

        if (props.elementRef.current.offsetWidth > props.elementRef.current.offsetHeight) {
            props.ref.current.style.width = (props.elementRef.current.offsetWidth + 16) + 'px'
            props.ref.current.style.height = (props.elementRef.current.offsetWidth + 16) + 'px'
        } else {
            props.ref.current.style.width = props.elementRef.current.offsetHeight + 'px'
            props.ref.current.style.height = props.elementRef.current.offsetHeight + 'px'
        }
    }

    if (props.ref.current !== null) {
        Move({
            element: props.ref.current,
            children: props.children,
            getLinkChild: props.getLinkChild,
            refreshLinks: () => RefreshLinks({
                parents: props.parents,
                ref: props.ref,
                entityKey: props.entityKey,
                getLinkParent: props.getLinkParent
            }),
            parents: props.parents,
            getLinkParent: props.getLinkParent,
            root: props.root,
            color: props.nodeColor

        })
    }
}
UseNode.propTypes = {
    ref: PropTypes.object,
    getLinkParent: PropTypes.func,
    parents: PropTypes.array,
    root: PropTypes.object,
    nodeColor: PropTypes.string,
    children: PropTypes.array,
    elementRef: PropTypes.object,
    getChildrenKeys: PropTypes.func,
    getParentKeys: PropTypes.func,
    setParents: PropTypes.func,
    setChildren: PropTypes.func,
    setFetched: PropTypes.func,
    containerRef: PropTypes.object,
    link: PropTypes.bool,
    updateEntity: PropTypes.func,
    setLink: PropTypes.func,
    triggerUpdate: PropTypes.bool,
    getEntityKey: PropTypes.func,
    setOpenMenu: PropTypes.func,
    openMenu: PropTypes.bool,
    setNodeColor: PropTypes.func,
}