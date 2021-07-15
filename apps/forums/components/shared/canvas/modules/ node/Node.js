import PropTypes from 'prop-types'
import React, {useRef, useState} from "react";
import styles from "../../styles/Node.module.css";

import NodeContextMenu from "./NodeContextMenu";
import NodeTemplate from "../../templates/NodeTemplate";


export default function Node(props) {
    const ref = useRef()
    const [link, setLink] = useState(false)

    return (

        <div
            id={props.node.id + '-node'}
            onDoubleClick={() => {
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

                props.setOpenContext(
                    <NodeContextMenu
                        setLink={setLink} link={link}
                        handleClose={() => props.setOpenContext(null, null, null, null)}
                        entity={props.node}
                        edit={props.edit} handleDelete={() => props.handleDelete(props.index, props.node.id)}
                        show={props.show} handleLink={props.handleLink}
                    />,
                    (e.clientX),
                    (e.clientY - ref.current.offsetHeight),
                    props.index)

            }}
                className={[styles.entityContainer, props.node.shape === 'circle' ? styles.circleContainer : ''].join(' ')}
                style={{
                cursor: "pointer",
                left: props.inGroup ? undefined : `${props.node.placement.x}px`,
                top: props.inGroup ? undefined : `${props.node.placement.y}px`,
                position: props.inGroup ? 'relative' : undefined,
                borderRadius: props.node.shape === 'circle' ? '50%' : '5px',
                height: props.node.shape === 'circle' ? '90px' : undefined,
                width: props.node.shape === 'circle' ? '90px' : undefined,
                padding: props.node.shape === 'circle' ? '4px' : undefined,
                minWidth: props.node.shape === 'circle' ? 'unset' : '230px',
                background: props.node.shape === 'circle' ? props.node.color : undefined
            }}
                ref={ref}
                >
                <div
                className={props.node.shape === 'circle' ? styles.headerCircle : styles.header}
                style={{color: props.node.shape === 'circle' ? 'white' : undefined}}>
            {props.node.title}
                <div className={styles.colorIndicator} style={{
                display: props.node.shape === 'circle' ? 'none' : undefined,
                background: props.node.color
            }}/>
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
    root: PropTypes.object,
    node: NodeTemplate,
    openOverview: PropTypes.func
}