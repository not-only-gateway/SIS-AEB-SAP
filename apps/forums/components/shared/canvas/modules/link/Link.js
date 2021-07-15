import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import GetCurve from "./GetCurve";

export default function Link(props) {
    const [target, setTarget] = useState(null)
    const [source, setSource] = useState(null)
    const [color, setColor] = useState(undefined)
    const update = (event) => {
        if (props.followMouse && event !== null && props.rootOffset !== null && props.rootOffset !== undefined) {
            const s = document.getElementById(props.source)
            if (s !== null) {
                setColor('#0095ff')
                setTarget({
                    offsetTop: event.clientY - props.rootOffset.y,
                    offsetLeft: event.clientX - props.rootOffset.x,
                    offsetHeight: 1,
                    offsetWidth: 1,
                })
                setSource({
                    offsetTop: s.offsetTop + s.offsetHeight / 2,
                    offsetLeft: s.offsetLeft + s.offsetWidth / 2,
                    offsetHeight: s.offsetHeight,
                    offsetWidth: s.offsetWidth,
                })
            }
        } else {
            const t = document.getElementById(props.target)
            const s = document.getElementById(props.source)
            if (t !== null && s !== null) {
                setColor(t.style.borderColor)
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
    }

    useEffect(() => {
        if (!props.followMouse) {
            document.addEventListener('mousedown', () => {
                update(null)
            })
        }
        document.addEventListener('mousemove', event => {
            update(event)
        })
    }, [])
    if (target !== null && source !== null)
        return (

            <svg>
                <defs>

                    <marker
                        id={`${props.source}-indicator-${props.target}`}
                        viewBox="0 0 20 20" refX="10" refY="10"
                        markerWidth="10" markerHeight="10"
                    >
                        <circle cx="10" cy="10" r="10" fill={color === 'transparent' || !color ? '#e0e0e0' : color}/>
                    </marker>
                </defs>

                <path
                    stroke={color === 'transparent' || !color ? '#e0e0e0' : color} strokeWidth={'2'}
                    fill={'none'}
                    strokeDasharray={props.type === 'weak' ? '5,5' : undefined}
                    d={
                        `M${source.offsetLeft + source.offsetWidth / 2},${(source.offsetTop + source.offsetHeight / 2)} C${source.offsetLeft},${((source.offsetTop - (source.offsetTop - target.offsetTop) / 2))} ${target.offsetLeft},${(source.offsetTop - (source.offsetTop - target.offsetTop) / 2)} ${target.offsetLeft + target.offsetWidth/2},${target.offsetTop - 10}`
                        // GetCurve({
                        //     target: {
                        //         x: target.offsetLeft,
                        //         y: target.offsetTop,
                        //         height: target.offsetHeight,
                        //         width: target.offsetWidth
                        //     },
                        //     source: {
                        //         x: source.offsetLeft,
                        //         y: source.offsetTop,
                        //         height: source.offsetHeight,
                        //         width: source.offsetWidth
                        //     }
                        // })
                    }
                    // markerStart={`url(#${props.source}-indicator-${props.target})`}
                    markerEnd={`url(#${props.source}-indicator-${props.target})`}
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
    rootOffset: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number
    }),
    canEdit: PropTypes.bool,
    followMouse: PropTypes.bool
}