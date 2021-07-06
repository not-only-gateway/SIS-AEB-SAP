import PropTypes from 'prop-types'
import React, {useEffect, useRef, useState} from "react";
import adjustLine from "../methods/AdjustLine";
import Move from "../methods/MoveElement";
import styles from "../styles/Styles.module.css";
import {
    ArrowBackRounded, ArrowForwardIos, ArrowForwardIosRounded, ArrowForwardRounded, ArrowRightAlt,
    DragIndicatorRounded,
    EditRounded, LinkOffRounded, LinkRounded,
    VisibilityRounded
} from "@material-ui/icons";



export default function Node(props) {
    const ref = useRef()
    const moveRef = useRef()
    const elementRef = useRef()

    const [parents, setParents] = useState([])
    const [children, setChildren] = useState([])

    const [fetched, setFetched] = useState(false)
    const entity = useRef({})
    const [link, setLink] = useState(false)
    const [notAvailable, setNotAvailable] = useState(false)
    useEffect(() => {
        if (props.linkable !== link) {
            setLink(props.linkable)
            if (props.linkable && props.getEntityKey(props.toBeLinked) !== props.getEntityKey(entity.current)) {
                if(props.openMenu === props.entityKey)
                    props.setOpenMenu(null)

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
            setChildren(props.getChildrenKeys(entity.current))
            setParents(props.getParentKeys(entity.current))


        }
        if (!fetched) {
            entity.current = props.entity

            setParents(props.getParentKeys(props.entity))
            setChildren(props.getChildrenKeys(props.entity))

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
                contentElement: elementRef.current,
                root: props.root,
                children: children,
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
                            // transition: '200ms ease',
                            width: '2px',
                            background: '#777777',
                            position: 'absolute',
                        }}
                        id={parent + '-line-' + props.entityKey}>
                        <div id={parent + '-line-indicator-objective-' + props.entityKey}
                             className={styles.indicatorContainer}>
                            <ArrowForwardIosRounded style={{transform: 'rotate(-90deg)', color: '#777777'}}/>
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
                         style={{display: props.openMenu === props.entityKey ? undefined : 'none'}}>
                        <button className={styles.optionButton} ref={moveRef}
                                style={{cursor: 'grab', display: props.options.move ? undefined : 'none'}}>
                            <DragIndicatorRounded/>
                        </button>
                        <button className={styles.optionButton} onClick={() => props.show(entity.current)}
                                style={{display: props.options.show ? undefined : 'none'}}><VisibilityRounded/></button>
                        <button className={styles.optionButton} onClick={() => props.edit(entity.current)}
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
                             {
                                 if(props.openMenu === props.entityKey)
                                     props.setOpenMenu(null)
                                 else
                                     props.setOpenMenu(props.entityKey)
                             }
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
    options: PropTypes.shape({
        edit: PropTypes.bool,
        move: PropTypes.bool,
        show: PropTypes.bool,
    }),
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
    getChildrenKeys: PropTypes.func
}