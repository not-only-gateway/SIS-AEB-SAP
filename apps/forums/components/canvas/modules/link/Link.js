import PropTypes from "prop-types";
import React, {useEffect, useRef, useState} from "react";
import GetCurve from "../../methods/misc/GetCurve";
import AdjustLink from "../../methods/misc/AdjustLink";
import Step from "./modules/Step";

export default function Link(props) {
    const [color, setColor] = useState(undefined)
    const [selected, setSelected] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const pathRef = useRef()
    const [onMove, setOnMove] = useState(false)
    const linkRef = useRef()


    const handleMouseDown = (t, s, isSource) => {
        if (color === undefined && !isSource)
            setColor(props.color())

        AdjustLink({
            pathRef: pathRef.current,
            source: {reference: s, connectionPoint: props.source.connectionPoint, nodeShape: props.source.nodeShape},
            target: {reference: t, connectionPoint: props.target.connectionPoint, nodeShape: props.target.nodeShape},
            setColor: setColor,
            type: props.type, setOnMove: setOnMove
        })
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
                <image
                    width={'20'} height={'20'}
                    x={target.x - 10} y={target.y - 10}
                    onClick={() => props.deleteLink()}
                    href={'./remove.svg'} fill={'white'}
                />
                // <circle r={10} cx={target.x} cy={target.y} fill={'red'} onClick={() => props.deleteLink()}/>
            )
        } else return null

    }

    useEffect(() => {

            const t = document.getElementById(props.target.id + '-node')
            const s = document.getElementById(props.source.id + '-node')
            pathRef.current.setAttribute('d', GetCurve({
                target: {
                    x: parseInt(t.firstChild.getAttribute('x')),
                    y: parseInt(t.firstChild.getAttribute('y')),
                    height: t.firstChild.getBBox().height,
                    width: t.firstChild.getBBox().width,
                    connectionPoint: props.target.connectionPoint
                },
                source: {
                    x: parseInt(s.firstChild.getAttribute('x')),
                    y: parseInt(s.firstChild.getAttribute('y')),
                    height: s.firstChild.getBBox().height,
                    width: s.firstChild.getBBox().width,
                    connectionPoint: props.source.connectionPoint
                },
                type: props.type
            }))

            const mouseDown = (event) => {
                if (event.button === 0) {
                    setSelected(false)
                    handleMouseDown(t.firstChild, s.firstChild, true)
                }
            }

            s.addEventListener('mousedown', mouseDown)
            t.addEventListener('mousedown', mouseDown)
            return () => {
                t.removeEventListener('mousedown', mouseDown)
                s.removeEventListener('mousedown', mouseDown)
            }
        }, []
    )


    return (
        <g
            style={{cursor: "pointer"}} ref={linkRef}
            onClick={() => setSelected(!selected)}
            onDoubleClick={() => setShowForm(true)}
        >

            <path
                stroke={
                    color === 'transparent' || !color ? '#e0e0e0' : color
                } strokeWidth={'2'} style={{transition: 'stroke 150ms linear'}}
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
            <Step
                description={props.description}
                handleChange={event => {
                    props.handleChange(event)
                }}
                pathRef={pathRef.current} onMove={onMove} setShow={setShowForm} show={showForm}/>

            <defs>
                {selected ? null :
                    <marker
                        id={`${props.source.id}-end-${props.target.id}`}
                        viewBox="0 0 20 20" refX="10" refY="10"
                        markerWidth="10" markerHeight="10"
                    >
                        <circle cx="10" cy="10" r="10" fill={color === 'transparent' || !color ? '#e0e0e0' : color}
                                style={{transition: 'fill 150ms linear'}}
                        />
                    </marker>
                }
                <marker
                    id={`${props.source.id}-start-${props.target.id}`}
                    viewBox="0 0 10 10" refX={'5'} refY={'5'}
                    markerWidth="5" markerHeight="5"
                >

                    <circle cx="5" cy="5" r="5" fill={color === 'transparent' || !color ? '#e0e0e0' : color}
                            style={{transition: 'fill 150ms linear'}}/>
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
    description: PropTypes.string,
    type: PropTypes.oneOf(['strong-path', 'strong-line', 'dashed-path', 'dashed-line']),
    rootOffset: PropTypes.object,
    canEdit: PropTypes.bool,
    handleChange: PropTypes.func,
    color: PropTypes.func,
    handleContextClose: PropTypes.func,
    handleStepCreation: PropTypes.func
}