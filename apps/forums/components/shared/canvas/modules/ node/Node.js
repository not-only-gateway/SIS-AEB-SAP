import PropTypes from 'prop-types'
import React, {useEffect, useRef, useState} from "react";
import styles from "../../styles/Node.module.css";
import useNode from "../../hooks/useNode";
import NodeContextMenu from "./NodeContextMenu";
import NodeTemplate from "../../templates/NodeTemplate";


export default function Node(props) {
    const ref = useRef()
    const elementRef = useRef()
    const [link, setLink] = useState(false)
    const [size, setSize] = useState(undefined)
    useEffect(() => {
        setSize(ref.current.offsetHeight > ref.current.offsetWidth ? ref.current.offsetHeight : ref.current.offsetWidth)

        useNode({
            ...props, ...{
                ref: ref, elementRef: elementRef,
                link: link, setLink: setLink
            }
        })
    }, [])

    return (

        <div
            id={props.node.id + '-node'}
            onClick={() => {
                if (props.linkable)
                    props.handleLink(props.node, setLink)
                props.openOverview()
            }}
            onMouseDown={event => {
                if (typeof event === 'object' && event.button === 0 && !props.inGroup) {
                    props.move({
                        node: props.node
                    })
                }
            }}
            onContextMenu={e => {
                if (!props.linkable) {
                    props.setOpenContext(
                        <NodeContextMenu
                            setLink={setLink} link={link}
                            handleClose={() => props.setOpenContext(null, null, null, null)}
                            entity={props.node} editable={props.options.edit}
                            edit={props.edit} linkable={props.linkable}
                            show={props.show} handleLink={props.handleLink}
                            setLinkable={props.setLinkable}/>,
                        (e.clientX - props.root.offsetLeft),
                        (e.clientY - props.root.offsetTop),
                        props.index)
                }
            }}
            className={styles.entityContainer}
            style={{
                cursor: props.options.edit && !props.inGroup ? 'move' : "unset",
                border: props.node.color !== undefined && props.node.color !== null ? props.node.color + ' 2px solid' : '#e0e0e0 2px solid',
                left: props.inGroup ? undefined : `${props.node.placement.x}px`,
                top: props.inGroup ? undefined : `${props.node.placement.y}px`,
                position: props.inGroup ? 'relative' : undefined,
                borderRadius: props.inGroup || props.node.shape === 'circle' ? '50%' : '5px',
                width: props.inGroup || props.node.shape === 'circle' ? size + 'px' : undefined,
                height: props.inGroup || props.node.shape === 'circle' ? size + 'px' : '80px',
                boxShadow: props.inGroup ? 'none' : undefined,
                minWidth: props.inGroup || props.node.shape === 'circle' ? undefined : '160px',
            }} ref={ref}>

            <div ref={elementRef}
                 style={{width: 'fit-content', height: 'fit-content'}}
            >
                <div className={styles.nodeContent}>
                    <div style={{
                        margin: 'auto', overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        fontWeight: 585
                    }}>
                        {props.node.title}
                    </div>
                </div>
            </div>
        </div>
    )

}

Node.propTypes = {
    inGroup: PropTypes.bool,
    setOpenContext: PropTypes.func,
    openMenu: PropTypes.number,
    show: PropTypes.func,
    edit: PropTypes.func,
    handleLink: PropTypes.func,
    options: PropTypes.shape({edit: PropTypes.bool, move: PropTypes.bool, show: PropTypes.bool,}),
    linkable: PropTypes.bool,
    setLinkable: PropTypes.func,
    root: PropTypes.object,
    node: NodeTemplate,
    openOverview: PropTypes.func
}