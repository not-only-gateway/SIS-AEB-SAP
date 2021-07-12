import PropTypes from 'prop-types'
import React, {useEffect, useRef, useState} from "react";
import styles from "../../styles/Canvas.module.css";
import useNode from "../../hooks/useNode";
import EntityTemplate from "../../templates/EntityTemplate";
import NodeContextMenu from "./NodeContextMenu";


export default function Node(props) {
    const ref = useRef()
    const elementRef = useRef()
    const [nodeColor, setNodeColor] = useState(null)
    const [parents, setParents] = useState([])
    const [children, setChildren] = useState([])
    const [fetched, setFetched] = useState(false)
    const [link, setLink] = useState(false)
    const [notAvailable, setNotAvailable] = useState(false)


    useEffect(() => {
        useNode({
            ...props, ...{
                nodeColor: nodeColor, setNodeColor: setNodeColor,
                setParents: setParents, parents: parents,
                children: children, setChildren: setChildren,
                notAvailable: notAvailable, setNotAvailable: setNotAvailable,
                ref: ref, elementRef: elementRef,
                fetched: fetched, setFetched: setFetched,
                link: link, setLink: setLink
            }
        })
    })


    if (props.entity !== undefined && props.entity !== null)
        return (

            <div id={props.entity.id + '-node'}

                 onContextMenu={e => {
                     if (!props.linkable) {
                         if (props.openMenu === props.entity.id)
                             props.setOpenContext(null, null, null, null)
                         else
                             props.setOpenContext(
                                 <NodeContextMenu
                                     setLink={setLink} link={link}
                                     entity={props.entity} editable={props.options.edit}
                                     edit={props.edit} linkable={props.linkable}
                                     show={props.show} handleLink={props.handleLink}
                                     setLinkable={props.setLinkable}/>,
                                 (e.clientX - props.root.offsetLeft),
                                 (e.clientY - props.root.offsetTop),
                                 props.entity.id)
                     }
                 }}
                 className={[props.linkable && props.toBeLinked.id !== props.entity.id && !notAvailable ? styles.pulse : '', styles.entityContainer].join(' ')}
                 style={{
                     cursor: props.options.edit ? (props.linkable ? (notAvailable ? 'default' : 'pointer') : 'pointer') : 'unset',
                     background: 'white',
                     borderLeft: nodeColor !== undefined && nodeColor !== null ? nodeColor + ' 3px solid' : '#e0e0e0 3px solid',
                     left: `${props.entity.x}px`,
                     top: `${props.entity.y}px`,
                     opacity: notAvailable ? .5 : undefined
                 }} ref={ref}>
                {ref.current !== undefined && ref.current !== null ?

                    <div id={props.entity.id + '-bottom-connector'}
                         style={{
                             position: 'absolute',
                             bottom: 0,
                             left: (ref.current.offsetWidth / 2) + 'px',
                         }}/>
                    :
                    null}
                {ref.current !== undefined && ref.current !== null ?

                    <div id={props.entity.id + '-top-connector'}
                         style={{
                             position: 'absolute',
                             top: 0,
                             left: (ref.current.offsetWidth / 2) + 'px',
                         }}/>
                    :
                    null}
                <div ref={elementRef}
                     style={{width: 'fit-content', height: 'fit-content'}}
                     onClick={() => {
                         if (props.linkable && !notAvailable)
                             props.handleLink(props.entity, setLink)
                         if (props.openMenu === props.entity.id)
                             props.setOpenMenu(null, null, null, null)
                     }}>
                    <div className={styles.nodeContent}>
                        <div style={{
                            margin: 'auto', overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            fontWeight: 585
                        }}>
                            {props.entity.title}
                        </div>
                    </div>
                </div>
            </div>
        )
    else return null
}

Node.propTypes = {
    setOpenContext: PropTypes.func,
    openMenu: PropTypes.number,
    show: PropTypes.func,
    edit: PropTypes.func,
    handleLink: PropTypes.func,
    options: PropTypes.shape({edit: PropTypes.bool, move: PropTypes.bool, show: PropTypes.bool,}),
    linkable: PropTypes.bool,
    setLinkable: PropTypes.func,
    toBeLinked: EntityTemplate,

    root: PropTypes.object,
    entity: EntityTemplate,

    handleDelete: PropTypes.func,
    scale: PropTypes.number,
    renderOnRoot: PropTypes.func,
    index: PropTypes.number,
    handleChange: PropTypes.func,

    scrollableDivID: PropTypes.any
}