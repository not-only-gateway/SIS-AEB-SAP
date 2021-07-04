import PropTypes from 'prop-types'
import {useEffect, useRef, useState} from "react";
import React from 'react'
import RenderNode from "./RenderNode";


export default function Node(props) {

    const ref = useRef()
    useState(() => {
        const root = document.getElementById(props.rootElementID)

        if (root !== null) {
            root.style.background = '#f4f5fa radial-gradient(#0095ff 5%, transparent 0)'
            root.style.backgroundSize = '30px 30px'
        }
        
        return () => {
            const root = document.getElementById(props.rootElementID)
            if (root !== null) {
                root.style.background = 'white'
                root.style.backgroundSize = 'auto'
            }
            else alert('ERROR')
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
                                    entity={entity} root={ref.current} offsetTop={props.offsetTop}
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
    updateEntity: PropTypes.func,
    triggerUpdate: PropTypes.bool,
    rootElementID: PropTypes.string,
    level: PropTypes.number,
    offsetTop: PropTypes.number,
    renderNode: PropTypes.func,
    entities: PropTypes.array,
    getEntityKey: PropTypes.func,
    getParentKeys: PropTypes.func
}