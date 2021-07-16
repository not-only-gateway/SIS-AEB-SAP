import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import GetCurve from "./GetCurve";

export default function Link(props) {
    const [target, setTarget] = useState(null)
    const [source, setSource] = useState(null)
    const [color, setColor] = useState(undefined)
    const update = (event) => {
        if (props.followMouse && event !== null && props.rootOffset !== null && props.rootOffset !== undefined) {
            const s = document.getElementById(props.source.id + '-' + props.source.indicator)
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
            const t = document.getElementById(props.target.id + '-' + props.target.indicator)
            const node = document.getElementById(props.target.id + '-selected')
            const s = document.getElementById(props.source.id + '-' + props.source.indicator)
            if (t !== null && s !== null && node !== null) {
                setColor(node.style.borderColor)
                setTarget({
                    offsetTop: t.getBoundingClientRect().top + props.rootOffset.scrollTop,
                    offsetLeft: t.getBoundingClientRect().left - props.rootOffset.offsetLeft + props.rootOffset.scrollLeft,
                    offsetHeight: 30,
                    offsetWidth: 30,
                })
                setSource({
                    offsetTop: s.getBoundingClientRect().top + props.rootOffset.scrollTop,
                    offsetLeft: s.getBoundingClientRect().left - props.rootOffset.offsetLeft + props.rootOffset.scrollLeft,
                    offsetHeight: 30,
                    offsetWidth: 30,
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
                        id={`${props.source.id}-end-${props.target.id}`}
                        viewBox="0 0 20 20" refX="10" refY="10"
                        markerWidth="10" markerHeight="10"
                    >
                        <circle cx="10" cy="10" r="10" fill={color === 'transparent' || !color ? '#e0e0e0' : color}/>
                    </marker>
                    <marker
                        id={`${props.source.id}-start-${props.target.id}`}
                        viewBox="0 0 10 10" refX="5" refY="5"
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
                        `M${source.offsetLeft + 15},${(source.offsetTop - 45)} C${source.offsetLeft},${((source.offsetTop - (source.offsetTop - target.offsetTop) / 2))} ${target.offsetLeft},${(source.offsetTop - (source.offsetTop - target.offsetTop) / 2)} ${target.offsetLeft + 15},${target.offsetTop - 45}`
                        // GetCurve({
                        //     target: {
                        //         x: target.offsetLeft + target.offsetWidth / 2,
                        //         y: target.offsetTop > source.offsetTop ? target.offsetTop - 15 : target.offsetTop,
                        //         height: target.offsetHeight,
                        //         width: target.offsetWidth
                        //     },
                        //     source: {
                        //         x: source.offsetLeft + source.offsetWidth / 2,
                        //         y:  source.offsetTop > target.offsetTop ? source.offsetTop - 15 : source.offsetTop,
                        //         height: source.offsetHeight,
                        //         width: source.offsetWidth
                        //     }
                        // })
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