import PropTypes from 'prop-types'

export default function GetCurve(props) {
    let limits = {
        top: props.source.y - props.source.height / 2,
        bottom: props.source.y + props.source.height / 2,
        left: props.source.x - props.source.width / 2,
        right: props.source.x + props.source.width / 2
    }

    let pivots = {}
    let target = {
        x: undefined,
        y: undefined
    }
    let source = {
        x: undefined,
        y: undefined
    }
    switch (true) {
        case (props.source.y > props.target.y): {
            pivots = {
                x1: props.source.x + props.source.width / 2,
                y1: props.source.height / 2 + props.source.y - (props.source.y - props.target.y) / 2,
                x2: props.target.x + props.target.width / 2,
                y2: props.source.height / 2 + props.source.y - (props.source.y - props.target.y) / 2
            }
            break
        }
        case (props.target.y > props.source.y): {
            pivots = {
                x1: props.source.x + props.source.width / 2,
                y1: props.target.height / 2 + props.target.y - (props.target.y - props.source.y) / 2,
                x2: props.target.x + props.target.width / 2,
                y2: props.target.height / 2 + props.target.y - (props.target.y - props.source.y) / 2
            }
            break
        }
        case (props.target.y === props.source.y): {
            pivots = {
                x1: props.source.x,
                y1: props.source.y,
                x2: props.target.x,
                y2: props.target.y
            }
            break
        }
        default:
            break
    }

    switch (true) {
        case (props.target.y <= limits.top): {  // TOP
            source = {
                x: props.source.x + props.source.width / 2,
                y: props.source.y
            }
            target = {
                x: props.target.x + props.target.width / 2,
                y: props.target.y + props.target.height
            }
            break
        }
        case (props.target.y >= limits.bottom): {  // BOTTOM
            source = {
                x: props.source.x + props.source.width / 2,
                y: props.source.y + props.source.height
            }
            target = {
                x: props.target.x + props.target.width / 2,
                y: props.target.y
            }
            break
        }
        case (props.target.y > limits.top && props.target.y < limits.bottom && props.target.x <= limits.left): { // MID LEFT
            source = {
                x: props.source.x,
                y: props.source.y + props.source.height / 2
            }
            target = {
                x: props.target.x + props.target.width,
                y: props.target.y + props.target.height / 2
            }
            break
        }
        case (props.target.y > limits.top && props.target.y < limits.bottom && props.target.x >= limits.right): { // MID RIGHT
            source = {
                x: props.source.x + props.source.width,
                y: props.source.y + props.source.height / 2
            }
            target = {
                x: props.target.x,
                y: props.target.y + props.target.height / 2
            }
            break
        }
        default:
            break
    }

    return `M${source.x},${source.y} C${pivots.x1},${pivots.y1} ${pivots.x2},${pivots.y2} ${target.x},${target.y}`
}
GetCurve.propTypes = {
    source: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
        height: PropTypes.number,
        width: PropTypes.number
    }),
    target: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
        height: PropTypes.number,
        width: PropTypes.number
    })
}