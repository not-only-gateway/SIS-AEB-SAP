import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import styles from '../../styles/Node.module.css'

export default function Link(props) {
    const [target, setTarget] = useState(null)
    const [source, setSource] = useState(null)
    const update = (event) => {
        if (props.followMouse && event !== null && props.rootOffset !== null && props.rootOffset !== undefined) {
            const s = document.getElementById(props.source)
            if (s !== null) {
                setTarget({
                    offsetTop: event.clientY - props.rootOffset.y,
                    offsetLeft: event.clientX - props.rootOffset.x,
                    offsetHeight: 1
                })
                setSource({
                    offsetTop: s.offsetTop + s.offsetHeight,
                    offsetLeft: s.offsetLeft + s.offsetWidth / 2,
                    offsetHeight: s.offsetHeight
                })
            }
        } else {
            const t = document.getElementById(props.target)
            const s = document.getElementById(props.source)
            if (t !== null && s !== null) {
                setTarget({
                    offsetTop: t.offsetTop + t.offsetHeight,
                    offsetLeft: t.offsetLeft + t.offsetWidth / 2,
                    offsetHeight: t.offsetHeight
                })
                setSource({
                    offsetTop: s.offsetTop + s.offsetHeight,
                    offsetLeft: s.offsetLeft + s.offsetWidth / 2,
                    offsetHeight: s.offsetHeight
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

                <circle r={'10'}
                        cy={props.followMouse ? target.offsetTop : (source.offsetTop > target.offsetTop ? (source.offsetTop - source.offsetHeight) : (source.offsetTop - 5))}
                        cx={props.followMouse ? target.offsetLeft: source.offsetLeft}
                        fill={props.color} style={{position: 'absolute', zIndex: '2'}}/>

                <path
                    stroke={props.color} strokeWidth={'2'} fill={'none'}
                    strokeDasharray={props.type === 'weak' ? '5,5' : undefined}
                    style={{position: 'absolute', zIndex: '1'}}
                    d={
                       source.offsetTop > target.offsetTop ?
                            `M${source.offsetLeft},${( (source.offsetTop - source.offsetHeight))} C${source.offsetLeft},${((source.offsetTop - (source.offsetTop - target.offsetTop) / 2))} ${target.offsetLeft},${(source.offsetTop - (source.offsetTop - target.offsetTop) / 2)} ${target.offsetLeft},${target.offsetTop}`
                            :
                            `M${target.offsetLeft},${( (target.offsetTop - target.offsetHeight))} C${target.offsetLeft},${((target.offsetTop - (target.offsetTop - source.offsetTop) / 2))} ${source.offsetLeft},${(target.offsetTop - (target.offsetTop - source.offsetTop) / 2)} ${source.offsetLeft},${source.offsetTop}`
                    }>
                </path>
                {props.type === 'strong' ?
                    <foreignObject
                        width={'75'} height={'40'}

                        y={(target.offsetTop + source.offsetTop) / 2 - 40}
                        x={(target.offsetLeft + source.offsetLeft) / 2 - 37.5}>
                        <button
                            className={styles.lineContent}
                            style={{
                                border: `${props.color} 2px solid`
                            }}>
                            {props.description}
                        </button>
                    </foreignObject>
                    :
                    null
                }

            </svg>
        )
    else return null
}

Link.propTypes = {
    renderMenu: PropTypes.func,
    color: PropTypes.string,
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