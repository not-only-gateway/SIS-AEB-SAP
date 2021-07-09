import PropTypes from 'prop-types'
import React, {useEffect, useRef, useState} from "react";
import adjustLine from "../../methods/AdjustLine";
import Move from "../../methods/move/MoveElement";
import styles from "../../styles/Styles.module.css";
import {DeleteForeverRounded, EditRounded, LinkRounded, VisibilityRounded} from "@material-ui/icons";
import Connection from "../connection/Connection";
import NodeContextMenu from "./NodeContextMenu";
import UseNode from "./UseNode";


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

    useEffect(() => UseNode({
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
                {parents.map(link => <Connection
                    getLinkType={props.getLinkType} renderOnRoot={props.renderOnRoot}
                    getLinkContent={props.getLinkContent} root={props.root}
                    color={nodeColor} getLinkParent={props.getLinkParent}
                    link={link} editable={props.options.edit}
                    entityKey={props.entityKey} canDelete={props.options.edit}/>)}
                <div id={props.entityKey + '-node'}
                     className={[props.linkable && props.getEntityKey(props.toBeLinked) !== props.getEntityKey(entity.current) && !notAvailable ? styles.pulse : '', styles.entityContainer].join(' ')}
                     style={{
                         cursor: props.linkable ? (notAvailable ? 'default' : 'pointer') : 'pointer',
                         background: 'white',
                         border: nodeColor !== undefined && nodeColor !== null ? nodeColor + ' 2px solid' : '#e0e0e0 2px solid',
                         top: entity.current.y,
                         left: entity.current.x,
                         transform: 'translate(' + entity.current.x + ',' + entity.current.y + ')',
                         opacity: notAvailable ? .5 : undefined
                     }} ref={ref}>
                    {ref.current !== undefined && ref.current !== null ?

                        <div id={props.entityKey + '-bottom-connector'}
                             style={{
                                 position: 'absolute',
                                 bottom: 0,
                                 left: (ref.current.offsetWidth / 2) + 'px',
                                 // background: 'blue',
                                 // width: '20px',
                                 // height: '20px'
                             }}/>

                        :
                        null}
                    {ref.current !== undefined && ref.current !== null ?

                        <div id={props.entityKey + '-top-connector'}
                             style={{
                                 position: 'absolute',
                                 top: 0,
                                 left: (ref.current.offsetWidth / 2) + 'px',
                                 // background: 'red',
                                 // width: '20px',
                                 // height: '20px'
                             }}/>


                        :
                        null}
                    <div ref={elementRef}
                         style={{width: 'fit-content', height: 'fit-content'}}
                         onClick={() => {
                             if (props.linkable && !notAvailable)
                                 props.handleLink(entity.current, setLink)
                             if (props.openMenu === props.entityKey)
                                 props.setOpenMenu(null, null, null, null)
                         }}>

                        {props.renderNode(props.entity)}
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
    toBeLinked: PropTypes.object,
    updateEntity: PropTypes.func,
    triggerUpdate: PropTypes.bool,
    entity: PropTypes.object,
    root: PropTypes.object,
    renderNode: PropTypes.func,
    entityKey: PropTypes.any,
    getEntityKey: PropTypes.func,
    getChildrenKeys: PropTypes.func,
    getNodeColor: PropTypes.func,
    handleDelete: PropTypes.func,
    getLinkParent: PropTypes.func,
    getLinkChild: PropTypes.func,
    getLinkType: PropTypes.func,
    getLinkContent: PropTypes.func,
    renderOnRoot: PropTypes.func
}