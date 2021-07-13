import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import styles from '../../styles/Node.module.css'
import GetCurve from "./GetCurve";

export default function Link(props) {
    const [target, setTarget] = useState(null)
    const [source, setSource] = useState(null)
    const [color, setColor] = useState('transparent')
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
                    offsetTop: s.offsetTop + s.offsetHeight,
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
                    offsetTop: t.getBoundingClientRect().top + t.offsetHeight - props.rootOffset.y + 3,
                    offsetLeft: t.getBoundingClientRect().left + t.offsetWidth / 2 - props.rootOffset.x,
                    offsetHeight: t.offsetHeight,
                    offsetWidth: t.offsetWidth,
                })
                setSource({
                    offsetTop: s.getBoundingClientRect().top + s.offsetHeight - props.rootOffset.y + 3,
                    offsetLeft: s.getBoundingClientRect().left + s.offsetWidth / 2 - props.rootOffset.x,
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
            <svg onContextMenu={event => {
                if (props.canEdit)
                    props.renderMenu(event)
            }}>

                <circle r={'7'}
                        cy={props.followMouse ? target.offsetTop : (source.offsetTop > target.offsetTop ? (source.offsetTop - source.offsetHeight) : (source.offsetTop))}
                        cx={props.followMouse ? target.offsetLeft: source.offsetLeft}
                        fill={color} style={{position: 'absolute', zIndex: '2'}}/>

                <path
                    stroke={color} strokeWidth={'2'} fill={'none'}
                    strokeDasharray={props.type === 'weak' ? '5,5' : undefined}
                    style={{position: 'absolute', zIndex: '1'}}
                    d={
                     GetCurve({
                         target: {
                             x:target.offsetLeft,
                             y:target.offsetTop,
                             height:target.offsetHeight,
                             width: target.offsetWidth
                         },
                         source: {
                             x:source.offsetLeft,
                             y:source.offsetTop,
                             height:source.offsetHeight,
                             width: source.offsetWidth
                         }
                     })
                    }>
                </path>
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