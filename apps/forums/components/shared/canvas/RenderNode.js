import PropTypes from 'prop-types'
import React, {useEffect, useRef, useState} from "react";
import dragElement from "./Element";
import adjustLine from "./line";
import Move from "./Element";


export default function RenderNode(props) {
    const ref = useRef()
    const elementRef = useRef()
    const [parents, setParents] = useState([])
    const [fetched, setFetched] = useState(false)
    const entity = useRef({})
    useEffect(() => {
        refresh()
        if (props.triggerUpdate) {
            props.updateEntity(entity.current)
        }
        if (!fetched) {

            entity.current = props.entity
            setParents(props.getParentKeys(props.entity))
            setFetched(true)

            if (elementRef.current.offsetWidth > elementRef.current.offsetHeight) {
                ref.current.style.width = (elementRef.current.offsetWidth+ 16) + 'px'
                ref.current.style.height = (elementRef.current.offsetWidth+16) + 'px'
            } else {
                ref.current.style.width = elementRef.current.offsetHeight + 'px'
                ref.current.style.height = elementRef.current.offsetHeight + 'px'
            }
        }

        if (ref.current !== null) {
            Move({
                entity: entity.current,
                setEntity: newEntity => entity.current = newEntity,

                element: ref.current,
                root: props.root,
                refreshLinks: refresh
            })
        }
    })
    const refresh = () => {
        let i
        for (i = 0; i < parents.length; i++) {
            let line = document.getElementById(parents[i] + '-line-' + props.entityKey)
            let objective = document.getElementById(parents[i] + '-node')

            let lineObjective = document.getElementById(parents[i] + '-line-indicator-objective-' + props.entityKey)

            if (objective !== null)
                adjustLine({
                    from: ref.current,
                    to: objective,
                    line: line,

                    lineObjective: lineObjective
                })
        }
    }
    if (props.entity !== undefined && props.entity !== null)
        return (

            <>
                {parents.map(parent => (
                    <div
                        style={{transition: '200ms ease', width: '2px', background: '#e0e0e0', position: 'absolute'}}
                        id={parent + '-line-' + props.entityKey}>
                        <div id={parent + '-line-indicator-objective-' + props.entityKey} style={{
                            background: 'red',
                            width: '10px',
                            height: '10px',
                            position: 'absolute',

                            left: '-5px',

                            borderRadius: '50%'
                        }}/>
                    </div>
                ))}
                <div id={props.entityKey + '-node'} style={{
                    borderRadius: '50%',
                    background: '#f4f5fa', border: '#e0e0e0 1px solid', position: 'absolute', cursor: 'move',
                    zIndex: 9,
                    top: entity.current.y,
                    left: entity.current.x,
                    transform: 'translate(' + entity.current.x + ',' + entity.current.y + ')',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'

                }} ref={ref}>
                    <div ref={elementRef} style={{width: 'fit-content', height: 'fit-content'}}>


                        {props.renderNode(props.entity)}
                    </div>
                </div>
            </>
        )
    else return null
}

RenderNode.propTypes = {
    updateEntity: PropTypes.func,
    triggerUpdate: PropTypes.func,
    offsetTop: PropTypes.number,
    entity: PropTypes.object,
    root: PropTypes.object,
    index: PropTypes.number,
    renderNode: PropTypes.func,
    entityKey: PropTypes.any,
}