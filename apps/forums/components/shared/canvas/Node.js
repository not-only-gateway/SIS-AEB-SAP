import PropTypes from 'prop-types'
import {useEffect, useRef, useState} from "react";
import React from 'react'
import RenderNode from "./RenderNode";
import styles from './Styles.module.css'

export default function Node(props) {
    const [linkedEntities, setLinkedEntities] = useState(null)
    const ref = useRef()
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
                        <RenderNode renderNode={props.renderNode} entityKey={props.getEntityKey(entity)}
                                    updateEntity={props.updateEntity}
                                    handleLink={(entity, setLink) => {
                                        if(entity === null)
                                            setLinkedEntities(entity)

                                        if (linkedEntities === null) {

                                            setLinkedEntities(entity)

                                        } else{
                                            linkedEntities.parents = [...props.getParentKeys(linkedEntities), ...[props.getEntityKey(entity)]]
                                            setLinkedEntities(null)
                                            setLink(false)
                                        }
                                    }}
                                    entity={entity} root={ref.current} options={props.options}
                                    getParentKeys={props.getParentKeys} triggerUpdate={props.triggerUpdate}
                                    entitiesLength={props.entities.length}/>

                    </React.Fragment>
                ))}

            </div>
        )
    else
        return null
}
Node.propTypes = {
    options: PropTypes.shape({
        edit: PropTypes.bool,
        move: PropTypes.bool,
        show: PropTypes.bool,
        more: PropTypes.bool,
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