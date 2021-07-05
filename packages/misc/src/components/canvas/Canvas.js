import PropTypes from 'prop-types'
import {useEffect, useRef, useState} from "react";
import React from 'react'
import Node from "./templates/Node";

export default function Canvas(props) {
    const [linkedEntities, setLinkedEntities] = useState(null)
    const ref = useRef()
    const [linkable, setLinkable] = useState(false)
    useState(() => {

        const root = document.getElementById(props.rootElementID)

        if (root !== null) {
            root.style.background = '#f4f5fa radial-gradient(#0095ff 5%, transparent 0)'
            root.style.backgroundSize = '30px 30px'
        }
    })


    if (Array.isArray(props.entities))
        return (
            <div ref={ref} style={{
                position: 'relative',
                width: '100vw',
                marginTop: '0'
            }}>

                {props.entities.map((entity, index) => (
                    <React.Fragment key={props.level + ':level - index:' + index}>
                        <Node
                            renderNode={props.renderNode} entityKey={props.getEntityKey(entity)}
                            updateEntity={props.updateEntity}
                            handleLink={(entity) => {
                                if (entity === null)
                                    setLinkedEntities(entity)

                                if (linkedEntities === null) {
                                    setLinkedEntities(entity)
                                } else if (entity !== linkedEntities && !props.getParentKeys(entity).includes(props.getEntityKey(linkedEntities))) {

                                    entity.parents = [...props.getParentKeys(entity), ...[props.getEntityKey(linkedEntities)]]
                                    setLinkedEntities(null)
                                    setLinkable(false)
                                } else {
                                    setLinkedEntities(null)
                                    setLinkable(false)
                                }
                            }}
                            linkable={linkable}
                            setLinkable={value => {
                                setLinkable(value)
                                if (!value)
                                    setLinkedEntities(null)
                            }}
                            toBeLinked={linkedEntities}
                            entity={entity} root={ref.current} options={props.options} getEntityKey={props.getEntityKey}
                            getParentKeys={props.getParentKeys} triggerUpdate={props.triggerUpdate}
                            entitiesLength={props.entities.length}/>

                    </React.Fragment>
                ))}

            </div>
        )
    else
        return null
}
Canvas.propTypes = {
    options: PropTypes.shape({
        edit: PropTypes.bool,
        move: PropTypes.bool,
        show: PropTypes.bool
    }),

    updateEntity: PropTypes.func,
    triggerUpdate: PropTypes.bool,
    rootElementID: PropTypes.string,
    level: PropTypes.number,
    renderNode: PropTypes.func,
    entities: PropTypes.array,
    getEntityKey: PropTypes.func,
    getParentKeys: PropTypes.func
}