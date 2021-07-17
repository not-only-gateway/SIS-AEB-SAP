import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import GetCurve from "./GetNewCurve";
import {ArrowDownward} from "@material-ui/icons";

export default function Link(props) {
    const [target, setTarget] = useState(null)
    const [source, setSource] = useState(null)
    const [color, setColor] = useState(undefined)
    const [selected, setSelected] = useState(false)


    let mouseDown = false
    let started = false
    const update = () => {
        const t = document.getElementById(props.target.id + '-node')
        const s = document.getElementById(props.source.id + '-node')
        if (t !== null && s !== null) {
            const child = t.childNodes.item(props.target.id + '-selector').style
            setColor(child.opacity === '1' ? child.borderColor : undefined)
            setTarget({
                offsetTop: t.offsetTop,
                offsetLeft: t.offsetLeft,
                offsetHeight: t.offsetHeight,
                offsetWidth: t.offsetWidth,
            })
            setSource({
                offsetTop: s.offsetTop,
                offsetLeft: s.offsetLeft,
                offsetHeight: s.offsetHeight,
                offsetWidth: s.offsetWidth,
            })
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', event => {
            if (event.target.id === `${props.source.id}-node` || event.target.id === `${props.source.id}-selected` || event.target.id === `${props.target.id}-node` || event.target.id === `${props.target.id}-selected`) {
                update()
                mouseDown = true
            }
            else
                setColor(undefined)
        })
        document.addEventListener('mouseup', () => {
            if (mouseDown)
                mouseDown = false

        })

        document.addEventListener('mousemove', () => {
            if (mouseDown || !started) {
                started = true
                update()
            }
        })

        return () => {
            document.removeEventListener('mousedown', () => null)
            document.removeEventListener('mouseup', () => null)
            document.removeEventListener('mousemove', () => null)
        }
    }, [])
    if (target !== null && source !== null)
        return (
            <svg onClick={() => setSelected(true)}>
                <defs>

                    <marker
                        id={`${props.source.id}-end-${props.target.id}`}
                        viewBox="0 0 20 20" refX="10" refY="10"
                        markerWidth="10" markerHeight="10"
                    >
                        <circle cx="10" cy="10" r="10" fill={color === 'transparent' || !color ? '#e0e0e0' : color}/>
                    </marker>
                    <marker
                        id={`${props.source.id}-start-${props.target.id}`}
                        viewBox="0 0 10 10" refX={'5'} refY={'5'}
                        markerWidth="5" markerHeight="5"
                    >

                        <circle cx="5" cy="5" r="5" fill={color === 'transparent' || !color ? '#e0e0e0' : color}/>
                    </marker>
                </defs>

                <path
                    stroke={color === 'transparent' || !color ? '#e0e0e0' : color} strokeWidth={'2'}
                    fill={'none'}
                    strokeDasharray={props.type === 'weak' ? '5,5' : undefined}
                    d={
                        GetCurve({
                            target: {
                                x: target.offsetLeft,
                                y: target.offsetTop,
                                height: target.offsetHeight,
                                width: target.offsetWidth
                            },
                            source: {
                                x: source.offsetLeft,
                                y: source.offsetTop,
                                height: source.offsetHeight,
                                width: source.offsetWidth
                            }
                        })
                    }
                    // markerStart={`url(#${props.source}-indicator-${props.target})`}
                    markerStart={`url(#${props.source.id}-end-${props.target.id})`}
                    markerEnd={`url(#${props.source.id}-start-${props.target.id})`}
                />

            </svg>
        )
    else return null
}

Link.propTypes = {
    renderMenu: PropTypes.func,

    source: PropTypes.string,
    target: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.oneOf(['strong', 'weak']),
    rootOffset: PropTypes.object,
    canEdit: PropTypes.bool,
    followMouse: PropTypes.bool
}