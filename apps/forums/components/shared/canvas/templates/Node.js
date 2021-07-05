import PropTypes from 'prop-types'
import React, {useEffect, useRef, useState} from "react";
import adjustLine from "../methods/AdjustLine";
import Move from "../methods/MoveElement";
import styles from "../styles/Styles.module.css";
import {
    ArrowBackRounded, ArrowForwardIos, ArrowForwardRounded,
    DragIndicatorRounded,
    EditRounded, LinkOffRounded, LinkRounded,
    MoreRounded, MoreVertRounded,
    OpenWithRounded,
    Visibility,
    VisibilityRounded
} from "@material-ui/icons";


export default function Node(props) {
    const ref = useRef()
    const moveRef = useRef()
    const elementRef = useRef()
    const [parents, setParents] = useState([])
    const [fetched, setFetched] = useState(false)
    const entity = useRef({})
    const [link, setLink] = useState(false)
    const [open, setOpen] = useState(false)
    const [notAvailable, setNotAvailable] = useState(false)

    useEffect(() => {
        if (props.linkable !== link) {
            setLink(props.linkable)
            if (props.linkable && props.getEntityKey(props.toBeLinked) !== props.getEntityKey(entity.current)) {
                setOpen(false)

                const entity = document.getElementById(props.getEntityKey(props.toBeLinked) + '-node')
                if (entity !== null && entity.getBoundingClientRect().top >= ref.current.getBoundingClientRect().top || parents.includes(props.getEntityKey(props.toBeLinked)))
                    setNotAvailable(true)
            } else if (!props.linkable)
                setNotAvailable(false)
        }
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
                refreshLinks: refresh,
                parents: parents
            })
        }
    })
    const refresh = () => {
        let i

        for (i = 0; i < parents.length; i++) {
            let line = document.getElementById(parents[i] + '-line-' + props.entityKey)
            let objective = document.getElementById(parents[i] + '-node')

            let lineObjective = document.getElementById(parents[i] + '-line-indicator-objective-' + props.entityKey)


            if (objective !== null && ref.current !== null)
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
                            background: '#0095ff',
                            position: 'absolute',
                        }}
                        id={parent + '-line-' + props.entityKey}>
                        <div id={parent + '-line-indicator-objective-' + props.entityKey} style={{
                            height: '30px',
                            width: '30px',
                            borderRadius: '50%',
                            top: 0,
                            left: '-15px',
                            background: '#f4f5fa',
                            border: '#0095ff 1px solid',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'absolute'
                        }}>
                            <ArrowForwardIos style={{transform: 'rotate(-90deg)', color: '#0095ff'}}/>
                        </div>
                    </div>
                ))}
                <div id={props.entityKey + '-node'}
                     className={props.linkable && props.getEntityKey(props.toBeLinked) !== props.getEntityKey(entity.current) && !notAvailable ? styles.pulse : ''}
                     style={{
                         borderRadius: '50%',
                         border: '#e0e0e0 1px solid',
                         position: 'absolute',
                         cursor: notAvailable ? 'default' : 'pointer',
                         display: 'flex',
                         alignItems: 'center',
                         justifyContent: 'center',
                         background: '#f4f5fa',
                         zIndex: 9,
                         top: entity.current.y,
                         left: entity.current.x,
                         transform: 'translate(' + entity.current.x + ',' + entity.current.y + ')',
                         opacity: notAvailable ? .5 : undefined

                     }} ref={ref}>
                    <div className={styles.options}
                         style={{display: open ? undefined : 'none'}}>
                        <button className={styles.optionButton} ref={moveRef}
                                style={{cursor: 'grab', display: props.options.move ? undefined : 'none'}}>
                            <DragIndicatorRounded/>
                        </button>
                        <button className={styles.optionButton}
                                style={{display: props.options.show ? undefined : 'none'}}><VisibilityRounded/></button>
                        <button className={styles.optionButton}
                                style={{display: props.options.edit ? undefined : 'none'}}><EditRounded/></button>
                        <button className={styles.optionButton}
                                onClick={() => {
                                    if (props.linkable && props.getEntityKey(props.toBeLinked) === props.getEntityKey(entity.current)) {
                                        props.setLinkable(false)
                                    } else if (!props.linkable) {
                                        props.setLinkable(true)
                                        props.handleLink(entity.current)
                                        setLink(true)
                                    }
                                }} style={{
                            color: link ? '#ff5555' : '#0095ff',
                            display: props.options.edit ? undefined : 'none'
                        }}>
                            {<LinkRounded/>}
                        </button>
                    </div>
                    <div ref={elementRef} style={{width: 'fit-content', height: 'fit-content'}}
                         onClick={() => {
                             if (props.linkable && !notAvailable)
                                 props.handleLink(entity.current, setLink)
                             else if (!props.linkable)
                                 setOpen(!open)
                         }}>
                        {props.renderNode(props.entity)}
                    </div>
                </div>
            </>
        )
    else return null
}

Node.propTypes = {
    handleLink: PropTypes.func,
    options: PropTypes.shape({
        edit: PropTypes.bool,
        move: PropTypes.bool,
        show: PropTypes.bool,
    }),
    linkable: PropTypes.bool,
    setLinkable: PropTypes.func,

    toBeLinked: PropTypes.object,

    updateEntity: PropTypes.func,
    triggerUpdate: PropTypes.func,
    offsetTop: PropTypes.number,
    entity: PropTypes.object,
    root: PropTypes.object,
    index: PropTypes.number,
    renderNode: PropTypes.func,

    entityKey: PropTypes.any,
    getEntityKey: PropTypes.func
}