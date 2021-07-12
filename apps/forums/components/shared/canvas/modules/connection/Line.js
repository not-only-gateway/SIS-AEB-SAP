import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import styles from '../../styles/Node.module.css'

export default function Line(props) {
    const [target, setTarget] = useState(null)
    const [source, setSource] = useState(null)
    const update = () => {
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

    useEffect(() => {
        document.addEventListener('mousedown', () => {
            update()
        })
        document.addEventListener('mousemove', () => {
            update()
        })
    }, [])
    if (target !== null && source !== null)
        return (
            <svg onContextMenu={event => {
                if (props.canEdit)
                    props.renderMenu(event)
            }}>
                <circle r={'10'}
                        cy={(source.offsetTop > target.offsetTop ? (source.offsetTop - source.offsetHeight) : (source.offsetTop - 5))}
                        cx={source.offsetLeft}
                        fill={props.color} style={{position: 'absolute', zIndex: '2'}}/>

                <path
                    stroke={props.color} strokeWidth={'2'} fill={'none'}
                    strokeDasharray={props.type === 'weak' ? '5,5' : undefined}
                    style={{position: 'absolute', zIndex: '1'}}
                    d={`M${source.offsetLeft},${(source.offsetTop > target.offsetTop ? (source.offsetTop - source.offsetHeight) : (source.offsetTop))} C${source.offsetLeft},${(source.offsetTop > target.offsetTop ? (source.offsetTop - (source.offsetTop - target.offsetTop) / 2) : (target.offsetTop - (target.offsetTop - source.offsetTop) / 2))} ${target.offsetLeft},${(source.offsetTop > target.offsetTop ? (source.offsetTop - (source.offsetTop - target.offsetTop) / 2) : (target.offsetTop - (target.offsetTop - source.offsetTop) / 2))} ${target.offsetLeft},${target.offsetTop}`}>
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

Line.propTypes = {
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
    canEdit: PropTypes.bool
}