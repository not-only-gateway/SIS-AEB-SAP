import PropTypes from 'prop-types'
import React, {useEffect, useRef, useState} from "react";
import styles from "../../styles/Canvas.module.css";
import Connection from "../connection/Connection";
import useNode from "../../hooks/useNode";
import EntityTemplate from "../../templates/EntityTemplate";


export default function Node(props) {
    const ref = useRef()
    const elementRef = useRef()
    const entity = useRef({})
    const [nodeColor, setNodeColor] = useState(null)
    const [parents, setParents] = useState([])
    const [children, setChildren] = useState([])
    const [fetched, setFetched] = useState(false)
    const [link, setLink] = useState(false)
    const [notAvailable, setNotAvailable] = useState(false)

    useEffect(() => useNode({
        ...props, ...{
            nodeColor: nodeColor, setNodeColor: setNodeColor,
            setParents: setParents, parents: parents,
            children: children, setChildren: setChildren,
            notAvailable: notAvailable, setNotAvailable: setNotAvailable,
            ref: ref, elementRef: elementRef, containerRef: entity,
            fetched: fetched, setFetched: setFetched,
            link: link, setLink: setLink
        }
    }))


    if (props.entity !== undefined && props.entity !== null)
        return (
            <>
                {parents.map(link => <Connection source={ref.current}
                    entity={props.entity} link={link} root={props.root} renderOnRoot={props.renderOnRoot}
                    canEdit={props.options.edit} canDelete={props.options.edit}/>)}

                <div id={props.entity.id + '-node'} draggable={true}
                     className={[props.linkable && props.toBeLinked.id !== entity.current.id && !notAvailable ? styles.pulse : '', styles.entityContainer].join(' ')}
                     style={{
                         cursor: props.options.edit ? (props.linkable ? (notAvailable ? 'default' : 'pointer') : 'pointer') : 'unset',
                         background: 'white',
                         border: nodeColor !== undefined && nodeColor !== null ? nodeColor + ' 2px solid' : '#e0e0e0 2px solid',
                         top: entity.current.y,
                         left: entity.current.x,
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
                                 props.handleLink(entity.current, setLink)
                             if (props.openMenu === props.entity.id)
                                 props.setOpenMenu(null, null, null, null)
                         }}>
                        <div className={styles.nodeContent}>
                            <div style={{
                                margin: 'auto', overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                fontSize: '1.1rem',
                                fontWeight: 585
                            }}>
                                {props.entity.id}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    else return null
}

Node.propTypes = {
    setOpenMenu: PropTypes.func,
    openMenu: PropTypes.number,
    show: PropTypes.func,
    edit: PropTypes.func,
    handleLink: PropTypes.func,
    options: PropTypes.shape({edit: PropTypes.bool, move: PropTypes.bool, show: PropTypes.bool,}),
    linkable: PropTypes.bool,
    setLinkable: PropTypes.func,
    toBeLinked: EntityTemplate,
    updateEntity: PropTypes.func,
    triggerUpdate: PropTypes.bool,

    root: PropTypes.object,
    entity: EntityTemplate,

    handleDelete: PropTypes.func,
    scale: PropTypes.number,
    renderOnRoot: PropTypes.func
}