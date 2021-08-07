import PropTypes from 'prop-types'
import React from "react";

export default function GetCurve(props) {
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
                y: props.target.y - 12
            }
            break
        }
        case 'b': {
            target = {
                x: props.target.x + props.target.width + 12,
                y: props.target.y + props.target.height / 2
            }
            break
        }
        case 'c': {
            target = {
                x: props.target.x + props.target.width / 2,
                y: props.target.y + props.target.height + 12
            }
            break
        }
        case 'd': {
            target = {
                x: props.target.x - 12,
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
                y: props.source.y - 12
            }
            break
        }
        case 'b': {
            source = {
                x: props.source.x + props.source.width + 12,
                y: props.source.y + props.source.height / 2
            }
            break
        }
        case 'c': {
            source = {
                x: props.source.x + props.source.width / 2,
                y: props.source.y + props.source.height + 12
            }
            break
        }
        case 'd': {
            source = {
                x: props.source.x - 12,
                y: props.source.y + props.source.height / 2
            }
            break
        }
        default:
            break
    }
    if (props.type.includes('-path')) {
        if(props.source.connectionPoint === 'a' || props.source.connectionPoint === 'c'){
            switch (true) {
                case (source.y > target.y): {
                    pivots.x1 = source.x
                    pivots.y1 = source.y - (source.y - target.y) / 2

                    break
                }
                case (target.y >= source.y): {
                    pivots.x1 = source.x
                    pivots.y1 = target.y - (target.y - source.y) / 2

                    break
                }
                case (target.y === source.y): {

                            pivots.x1 = source.x
                            pivots.y1 = source.y
                            // x2: target.x,
                            // y2: target.y
                    break
                }
                default:
                    break
            }
        }
        else{
            switch (true) {
                case (source.x > target.x): {
                    pivots.x1 = source.x  - (source.x - target.x) / 2
                    pivots.y1 = source.y

                    break
                }
                case (target.x >= source.x): {
                    pivots.x1 = target.x  - (target.x - source.x) / 2
                    pivots.y1 = source.y

                    break
                }
                case (target.x === source.x): {

                    pivots.x1 = source.x
                    pivots.y1 = source.y
                    break
                }
                default:
                    break
            }

        }
        if(props.target.connectionPoint === 'a' || props.target.connectionPoint === 'c'){
            switch (true) {
                case (source.y > target.y): {
                    pivots.x2 = target.x
                    pivots.y2 = source.y - (source.y - target.y) / 2

                    break
                }
                case (target.y >= source.y): {
                    pivots.x2 = target.x
                    pivots.y2 = target.y - (target.y - source.y) / 2

                    break
                }
                case (target.y === source.y): {

                    pivots.x2 = target.x
                    pivots.y2 = target.y
                    break
                }
                default:
                    break
            }
        }
        else{
            switch (true) {
                case (source.x > target.x): {
                    pivots.x2 = source.x  - (source.x - target.x) / 2
                    pivots.y2 = target.y

                    break
                }
                case (target.x >= source.x): {
                    pivots.x2 = target.x  - (target.x - source.x) / 2
                    pivots.y2 = target.y

                    break
                }
                case (target.x === source.x): {

                    pivots.x2 = target.x
                    pivots.y2 = target.y
                    break
                }
                default:
                    break
            }
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