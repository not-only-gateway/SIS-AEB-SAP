import PropTypes from "prop-types";
import React, {useEffect, useRef, useState} from "react";
import GetCurve from "./GetCurve";
import styles from '../../styles/Link.module.css'
import NodeContextMenu from "../node/NodeContextMenu";
import LinkContextMenu from "./LinkContextMenu";
import AdjustLink from "../../methods/move/AdjustLink";

export default function Link(props) {
    const [color, setColor] = useState(undefined)
    const pathRef = useRef()
    const descriptionRef = useRef()
    const handleMouseDown = (t, s, isSource) => {
        if (color === undefined && !isSource) {
            setColor(props.color().color)
        }
        AdjustLink({
            pathRef: pathRef.current,
            descriptionRef: descriptionRef.current,
            description: props.description,
            source: s,
            target: t,
            setColor: setColor
        })
        document.removeEventListener('mousemove', () => null)
        document.removeEventListener('mouseup', () => null)
    }


    useEffect(() => {
        const t = document.getElementById(props.target.id + '-node')
        const s = document.getElementById(props.source.id + '-node')

        pathRef.current.setAttribute('d', GetCurve({
            target: {
                x: t.offsetLeft,
                y: t.offsetTop,
                height: t.offsetHeight,
                width: t.offsetWidth
            },
            source: {
                x: s.offsetLeft,
                y: s.offsetTop,
                height: s.offsetHeight,
                width: s.offsetWidth
            }
        }))
        s.addEventListener('mousedown', event => {
            if (event.button === 0)
                handleMouseDown(t, s, true)
        })
        t.addEventListener('mousedown', event => {
            if (event.button === 0)
                handleMouseDown(t, s, false)
        })
        return () => {
            t.removeEventListener('mousedown', () => null)
            s.removeEventListener('mousedown', () => null)
        }
    }, [])


    return (
        <g
            onDoubleClick={() => {
                if (props.type !== 'weak')
                    props.setSelected({
                        child: props.source.id,
                        parent: props.target.id
                    })
            }}
            style={{cursor: "pointer"}}
            onContextMenu={e => {
                props.setSelected({
                    child: props.source.id,
                    parent: props.target.id
                })
                props.openContextMenu(
                    <LinkContextMenu
                        child={props.child} parent={props.parent} type={props.type} deleteLink={props.deleteLink}
                        changeType={() => {
                            props.handleChange({name: 'type', value: props.type === 'weak' ? 'strong' : 'weak'})
                        }}/>,
                    (e.clientX),
                    (e.clientY - 40)
                )
            }}>
            <defs>
                <marker
                    id={`${props.source.id}-end-${props.target.id}`}
                    viewBox="0 0 20 20" refX="10" refY="10"
                    markerWidth="10" markerHeight="10"
                >
                    <circle cx="10" cy="10" r="10" fill={color === 'transparent' || !color ? '#e0e0e0' : color} style={{transition: 'fill 250ms linear', transitionDelay: '250ms'}}/>
                </marker>
                <marker
                    id={`${props.source.id}-start-${props.target.id}`}
                    viewBox="0 0 10 10" refX={'5'} refY={'5'}
                    markerWidth="5" markerHeight="5"
                >

                    <circle cx="5" cy="5" r="5" fill={color === 'transparent' || !color ? '#e0e0e0' : color }  style={{transition: 'fill 250ms linear', transitionDelay: '250ms'}}/>
                </marker>
            </defs>


            <path
                stroke={
                    color === 'transparent' || !color ? '#e0e0e0' : color
                } strokeWidth={'2'} style={{transition: 'stroke 250ms linear', transitionDelay: '250ms'}}
                fill={'none'} ref={pathRef}
                strokeDasharray={props.type === 'weak' ? '5,5' : undefined}
                d={'M 0,0'}
                markerStart={`url(#${props.source.id}-end-${props.target.id})`}
                markerEnd={`url(#${props.source.id}-start-${props.target.id})`}
            />
            <foreignObject
                width={'75'} height={'40'} ref={descriptionRef}
                style={{display: (props.description !== undefined && props.description.length > 0) || (props.selectedLink !== null && props.selectedLink && props.selectedLink.parent === props.target.id && props.selectedLink.child === props.source.id) ? undefined : 'none'}}
                y={0}
                x={0}>
                <input className={styles.input}
                       style={{border: color === 'transparent' || !color ? '#e0e0e0 2px solid' : color + ' 2px solid'}}
                       onChange={event => props.handleChange({name: 'description', value: event.target.value})}
                       value={props.description}/>
            </foreignObject>
        </g>
    )
}

Link.propTypes = {
    deleteLink: PropTypes.func,
    openContextMenu: PropTypes.func,

    source: PropTypes.object,
    target: PropTypes.object,
    description: PropTypes.string,
    type: PropTypes.oneOf(['strong', 'weak']),
    rootOffset: PropTypes.object,
    canEdit: PropTypes.bool,

    handleChange: PropTypes.func,

    selectedLink: PropTypes.shape({
        child: PropTypes.string,
        parent: PropTypes.string
    }),
    setSelected: PropTypes.func,
    color: PropTypes.string
}