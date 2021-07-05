import PropTypes from 'prop-types'
import React, {useEffect, useRef, useState} from "react";
import dragElement from "./Element";
import adjustLine from "./line";
import Move from "./Element";
import styles from "./Styles.module.css";
import {
    DragIndicatorRounded,
    EditRounded, LinkOffRounded, LinkRounded,
    MoreRounded, MoreVertRounded,
    OpenWithRounded,
    Visibility,
    VisibilityRounded
} from "@material-ui/icons";


export default function RenderNode(props) {
    const ref = useRef()
    const moveRef = useRef()
    const elementRef = useRef()
    const [parents, setParents] = useState([])
    const [fetched, setFetched] = useState(false)
    const entity = useRef({})
    const [link, setLink] = useState(false)


    useEffect(() => {
        refresh()
        if (props.triggerUpdate) {
            setLink(false)
            props.updateEntity(entity.current)
        }
        if (link && parents.length !== props.getParentKeys(entity.current)) {
            const newParents = props.getParentKeys(entity.current)

            setParents(newParents)


        }
        if (!fetched) {
            entity.current = props.entity

            const newParents = props.getParentKeys(props.entity)

            setParents(newParents)

            setFetched(true)

            if (elementRef.current.offsetWidth > elementRef.current.offsetHeight) {
                ref.current.style.width = (elementRef.current.offsetWidth + 16) + 'px'
                ref.current.style.height = (elementRef.current.offsetWidth + 16) + 'px'
            } else {
                ref.current.style.width = elementRef.current.offsetHeight + 'px'
                ref.current.style.height = elementRef.current.offsetHeight + 'px'
            }
        }

        if (ref.current !== null) {
            Move({
                entity: entity.current,
                setEntity: newEntity => entity.current = newEntity,
                button: moveRef.current,
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
                        style={{
                            transition: '200ms ease',
                            width: '2px',
                            background: '#e0e0e0',
                            position: 'absolute',
                            display: 'flex',
                            alignContent: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                            justifyItems: 'center'
                        }}
                        id={parent + '-line-' + props.entityKey}>
                        <div style={{background: 'white', border: '#e0e0e0 1px solid', borderRadius: '32px', padding: '8px', transform: 'rotate(90deg'}}>
                            teste
                        </div>
                    </div>
                ))}
                <div id={props.entityKey + '-node'}
                     className={!link ? styles.pulse : ''}
                     style={{
                         borderRadius: '50%',
                         border: '#e0e0e0 1px solid',
                         position: 'absolute',
                         cursor: 'default',
                         background: '#f4f5fa',
                         zIndex: 9,
                         top: entity.current.y,
                         left: entity.current.x,
                         transform: 'translate(' + entity.current.x + ',' + entity.current.y + ')',
                         display: 'flex',
                         alignItems: 'center',
                         justifyContent: 'center'

                     }} ref={ref}>
                    <div className={styles.options}>
                        <button className={styles.optionButton} ref={moveRef} style={{cursor: 'move'}}>
                            <DragIndicatorRounded/>
                        </button>
                        <button className={styles.optionButton}><VisibilityRounded/></button>
                        <button className={styles.optionButton}><EditRounded/></button>
                        {/*<button className={styles.optionButton}><MoreVertRounded/></button>*/}
                        <button className={styles.optionButton} onClick={() => {
                            if (!link) {
                                props.handleLink(entity.current, setLink)
                            }

                            setLink(!link)
                        }} style={{color: link ? '#ff5555' : '#0095ff'}}>{link ? <LinkOffRounded/> :
                            <LinkRounded/>}</button>
                    </div>
                    <div ref={elementRef} style={{width: 'fit-content', height: 'fit-content'}}>
                        {props.renderNode(props.entity)}
                    </div>
                </div>
            </>
        )
    else return null
}

RenderNode.propTypes = {
    handleLink: PropTypes.func,
    options: PropTypes.shape({
        edit: PropTypes.bool,
        move: PropTypes.bool,
        show: PropTypes.bool,
        more: PropTypes.bool,
    }),
    updateEntity: PropTypes.func,
    triggerUpdate: PropTypes.func,
    offsetTop: PropTypes.number,
    entity: PropTypes.object,
    root: PropTypes.object,
    index: PropTypes.number,
    renderNode: PropTypes.func,
    entityKey: PropTypes.any,
}