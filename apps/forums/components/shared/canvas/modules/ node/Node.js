import PropTypes from 'prop-types'
import React, {useEffect, useRef, useState} from "react";
import styles from "../../styles/Node.module.css";
import useNode from "../../hooks/useNode";
import NodeContextMenu from "./NodeContextMenu";
import NodeTemplate from "../../templates/NodeTemplate";


export default function Node(props) {
    const ref = useRef()
    const [link, setLink] = useState(false)
    const [size, setSize] = useState(undefined)
    useEffect(() => {
        setSize(ref.current.offsetHeight > ref.current.offsetWidth ? ref.current.offsetHeight : ref.current.offsetWidth)

        useNode({
            ...props, ...{
                ref: ref,
                link: link, setLink: setLink
            }
        })
    }, [])

    return (

        <div
            id={props.node.id + '-node'}
            onDoubleClick={() => {
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
                cursor: "pointer",
                border: props.node.color !== undefined && props.node.color !== null ? props.node.color + ' 2px solid' : '#e0e0e0 2px solid',
                left: props.inGroup ? undefined : `${props.node.placement.x}px`,
                top: props.inGroup ? undefined : `${props.node.placement.y}px`,
                position: props.inGroup ? 'relative' : undefined,
                borderRadius: props.node.shape === 'circle' ? '50%' : '5px',
                width: props.node.shape === 'circle' ? size + 'px' : undefined,
                height: props.node.shape === 'circle' ? size + 'px' : '80px',
                boxShadow: props.inGroup ? 'none' : undefined,
                minWidth: props.node.shape === 'circle' ? '80px' : '230px',
            }}
            ref={ref}
        >
            <div className={props.node.shape === 'circle' ? styles.headerCircle : styles.header}>
                {props.node.title}
            </div>
            <div className={styles.body} style={{display: props.node.shape === 'circle' ? 'none' : undefined}}>
                {props.node.description}
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