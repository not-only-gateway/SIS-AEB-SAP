import PropTypes from 'prop-types'
import React from "react";

export default function GetCurve(props) {
    let limits = {
        top: props.source.y - props.source.height / 2,
        bottom: props.source.y + props.source.height / 2,
        left: props.source.x - props.source.width / 2,
        right: props.source.x + props.source.width / 2
    }
    let response
    let pivots = {}

    let target = {
        x: undefined,
        y: undefined
    }
    let source = {
        x: undefined,
        y: undefined
    }

    switch (props.target.connectionPoint) {
        case 'a': {
            target = {
                x: props.target.x + props.target.width / 2,
                y: props.target.y - 10
            }
            break
        }
        case 'b': {
            target = {
                x: props.target.x + props.target.width + 10,
                y: props.target.y + props.target.height / 2
            }
            break
        }
        case 'c': {
            target = {
                x: props.target.x + props.target.width / 2,
                y: props.target.y + props.target.height + 10
            }
            break
        }
        case 'd': {
            target = {
                x: props.target.x - 10,
                y: props.target.y + props.target.height / 2
            }
            break
        }
        default:
            break
    }
    switch (props.source.connectionPoint) {
        case 'a': {
            source = {
                x: props.source.x + props.source.width / 2,
                y: props.source.y - 10
            }
            break
        }
        case 'b': {
            source = {
                x: props.source.x + props.source.width + 10,
                y: props.source.y + props.source.height / 2
            }
            break
        }
        case 'c': {
            source = {
                x: props.source.x + props.source.width / 2,
                y: props.source.y + props.source.height + 10
            }
            break
        }
        case 'd': {
            source = {
                x: props.source.x - 10,
                y: props.source.y + props.source.height / 2
            }
            break
        }
        default:
            break
    }
    if (props.type.includes('-path')) {
        switch (true) {
            case (source.y > target.y): {
                pivots = {
                    x1: source.x,
                    y1: source.y - (source.y - target.y) / 2,
                    x2: target.x,
                    y2: source.y - (source.y - target.y) / 2
                }
                break
            }
            case (target.y > source.y): {
                pivots = {
                    x1: source.x,
                    y1: target.y - (target.y - source.y) / 2,
                    x2: target.x,
                    y2: target.y - (target.y - source.y) / 2
                }
                break
            }
            case (target.y === source.y): {
                if (target.x >= source.x)
                    pivots = {
                        x1: source.x,
                        y1: source.y,
                        x2: target.x,
                        y2: target.y
                    }
                break
            }
            default:
                break
        }


        response = `M${source.x},${source.y} C${pivots.x1},${pivots.y1} ${pivots.x2},${pivots.y2} ${target.x},${target.y}`
    } else
        response = `M${source.x},${source.y} ${target.x},${target.y}`
    return response
}
GetCurve.propTypes = {
    source: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
        height: PropTypes.number,
        width: PropTypes.number,
        connectionPoint: PropTypes.oneOf(['a', 'b', 'c', 'd']),
        nodeShape: PropTypes.string
    }),
    target: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
        height: PropTypes.number,
        width: PropTypes.number,
        connectionPoint: PropTypes.oneOf(['a', 'b', 'c', 'd']),
        nodeShape: PropTypes.string
    }),
    type: PropTypes.oneOf(['strong-path', 'strong-line', 'dashed-path', 'dashed-line'])
}