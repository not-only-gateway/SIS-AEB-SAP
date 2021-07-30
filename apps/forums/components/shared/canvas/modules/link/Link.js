import PropTypes from "prop-types";
import React, {useEffect, useRef, useState} from "react";
import GetCurve from "../../methods/misc/GetCurve";
import LinkContextMenu from "./LinkContextMenu";
import AdjustLink from "../../methods/misc/AdjustLink";

export default function Link(props) {
    const [color, setColor] = useState(undefined)
    const [selected, setSelected] = useState(false)
    const pathRef = useRef()


    const handleMouseDown = (t, s, isSource) => {
        if (color === undefined && !isSource)
            setColor(props.color())

        AdjustLink({
            pathRef: pathRef.current,
            source: {reference: s, connectionPoint: props.source.connectionPoint, nodeShape: props.source.nodeShape},
            target: {reference: t, connectionPoint: props.target.connectionPoint, nodeShape: props.target.nodeShape},
            setColor: setColor,
            type: props.type
        })
        document.removeEventListener('mousemove', () => null)
        document.removeEventListener('mouseup', () => null)
    }

    const renderRemove = () => {
        if (selected) {
            let target = {}
            const t = document.getElementById(props.source.id + '-node').getBBox()
            switch (props.source.connectionPoint) {
                case 'a': {
                    target = {
                        x: t.x + t.width / 2,
                        y: t.y - 12
                    }
                    break
                }
                case 'b': {
                    target = {
                        x: t.x + t.width + 12,
                        y: t.y + t.height / 2
                    }
                    break
                }
                case 'c': {
                    target = {
                        x: t.x + t.width / 2,
                        y: t.y + t.height + 12
                    }
                    break
                }
                case 'd': {
                    target = {
                        x: t.x - 12,
                        y: t.y + t.height / 2
                    }
                    break
                }
                default:
                    break
            }

            return (
                <image width={'20'} height={'20'} x={target.x - 10} y={target.y - 10} onClick={() => props.deleteLink()}
                       href={'./remove.svg'} fill={'white'}/>
                // <circle r={10} cx={target.x} cy={target.y} fill={'red'} onClick={() => props.deleteLink()}/>
            )
        } else return null

    }

    useEffect(() => {
        const t = document.getElementById(props.target.id + '-node')
        const s = document.getElementById(props.source.id + '-node')
        const sBBox = s.getBBox()
        const tBBox = t.getBBox()
        pathRef.current.setAttribute('d', GetCurve({
            target: {
                x: tBBox.x,
                y: tBBox.y,
                height: tBBox.height,
                width: tBBox.width,
                connectionPoint: props.target.connectionPoint
            },
            source: {
                x: sBBox.x,
                y: sBBox.y,
                height: sBBox.height,
                width: sBBox.width,
                connectionPoint: props.source.connectionPoint
            },
            type: props.type
        }))

        s.addEventListener('mousedown', event => {
            if (event.button === 0) {
                setSelected(false)
                handleMouseDown(t, s, true)
            }
        })
        t.addEventListener('mousedown', event => {
            if (event.button === 0) {
                setSelected(false)
                handleMouseDown(t, s, false)
            }
        })
        return () => {
            t.removeEventListener('mousedown', () => null)
            s.removeEventListener('mousedown', () => null)
        }
    }, [])


    return (
        <g
            style={{cursor: "pointer"}}
            onClick={() => setSelected(!selected)}
            onDoubleClick={event => props.handleStepCreation(event, props.target.id, props.source.id)}
        >
            <path
                stroke={
                    color === 'transparent' || !color ? '#e0e0e0' : color
                } strokeWidth={'2'} style={{transition: 'stroke 250ms linear', transitionDelay: '250ms'}}
                fill={'none'} ref={pathRef}
                strokeDasharray={props.type.includes('dashed') ? '5,5' : undefined}
                d={'M 0,0'}
                markerStart={selected ? null : `url(#${props.source.id}-end-${props.target.id})`}
                markerEnd={`url(#${props.source.id}-start-${props.target.id})`}
            />

            <path
                stroke={
                    'transparent'
                } strokeWidth={'20'}
                fill={'none'}
                d={pathRef.current !== undefined && pathRef.current !== null ? pathRef.current.getAttribute("d") : undefined}
            />
            <defs>
                {selected ? null :
                    <marker
                        id={`${props.source.id}-end-${props.target.id}`}
                        viewBox="0 0 20 20" refX="10" refY="10"
                        markerWidth="10" markerHeight="10"
                    >
                        <circle cx="10" cy="10" r="10" fill={color === 'transparent' || !color ? '#e0e0e0' : color}
                                style={{transition: 'fill 250ms linear', transitionDelay: '250ms'}}
                        />
                    </marker>
                }
                <marker
                    id={`${props.source.id}-start-${props.target.id}`}
                    viewBox="0 0 10 10" refX={'5'} refY={'10'}
                    markerWidth="5" markerHeight="5"
                >

                    <circle cx="5" cy="5" r="5" fill={color === 'transparent' || !color ? '#e0e0e0' : color}
                            style={{transition: 'fill 250ms linear', transitionDelay: '250ms'}}/>
                </marker>
            </defs>

            {renderRemove()}
        </g>
    )
}

Link.propTypes = {


    deleteLink: PropTypes.func,
    openContextMenu: PropTypes.func,

    source: PropTypes.shape({
        id: PropTypes.string,
        nodeShape: PropTypes.string,
        connectionPoint: PropTypes.oneOf(['a', 'b', 'c', 'd'])
    }),
    target: PropTypes.shape({
        id: PropTypes.string,
        nodeShape: PropTypes.string,
        connectionPoint: PropTypes.oneOf(['a', 'b', 'c', 'd'])
    }),
    type: PropTypes.oneOf(['strong-path', 'strong-line', 'dashed-path', 'dashed-line']),
    rootOffset: PropTypes.object,
    canEdit: PropTypes.bool,

    handleChange: PropTypes.func,
    color: PropTypes.func,
    handleContextClose: PropTypes.func,
    handleStepCreation: PropTypes.func
}