import PropTypes from "prop-types";
import React, {useEffect, useRef, useState} from "react";
import GetCurve from "./GetCurve";
import styles from '../../styles/Link.module.css'
import NodeContextMenu from "../node/NodeContextMenu";
import LinkContextMenu from "./LinkContextMenu";
import AdjustLink from "../../methods/misc/AdjustLink";

export default function Link(props) {
    const [color, setColor] = useState(undefined)
    const pathRef = useRef()

    const handleMouseDown = (t, s, isSource) => {
        if (color === undefined && !isSource)
            setColor(props.color())

        AdjustLink({
            pathRef: pathRef.current,
            source: s,
            target: t,
            setColor: setColor,
            type: props.type
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
            },
            type: props.type
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
                    <circle cx="10" cy="10" r="10" fill={color === 'transparent' || !color ? '#e0e0e0' : color}
                            style={{transition: 'fill 250ms linear', transitionDelay: '250ms'}}/>
                </marker>
                <marker
                    id={`${props.source.id}-start-${props.target.id}`}
                    viewBox="0 0 10 10" refX={'5'} refY={'5'}
                    markerWidth="5" markerHeight="5"
                >

                    <circle cx="5" cy="5" r="5" fill={color === 'transparent' || !color ? '#e0e0e0' : color}
                            style={{transition: 'fill 250ms linear', transitionDelay: '250ms'}}/>
                </marker>
            </defs>


            <path
                stroke={
                    color === 'transparent' || !color ? '#e0e0e0' : color
                } strokeWidth={'2'} style={{transition: 'stroke 250ms linear', transitionDelay: '250ms'}}
                fill={'none'} ref={pathRef}
                strokeDasharray={props.type.includes('dashed')? '5,5' : undefined}
                d={'M 0,0'}
                markerStart={`url(#${props.source.id}-end-${props.target.id})`}
                markerEnd={`url(#${props.source.id}-start-${props.target.id})`}
            />
        </g>
    )
}

Link.propTypes = {
    deleteLink: PropTypes.func,
    openContextMenu: PropTypes.func,

    source: PropTypes.object,
    target: PropTypes.object,
    type: PropTypes.oneOf(['strong-path', 'strong-line', 'dashed-path', 'dashed-line']),
    rootOffset: PropTypes.object,
    canEdit: PropTypes.bool,

    handleChange: PropTypes.func,

    selectedLink: PropTypes.shape({
        child: PropTypes.string,
        parent: PropTypes.string
    }),
    setSelected: PropTypes.func,
    color: PropTypes.func
}