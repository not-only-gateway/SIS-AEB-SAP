import PropTypes from 'prop-types'

export default function GetCurve(props) {
    let res = `M${props.source.x},${((props.source.y - props.source.height))} C${props.source.x},${((props.source.y - (props.source.y - props.target.y) / 2))} ${props.target.x},${(props.source.y - (props.source.y - props.target.y) / 2)} ${props.target.x},${props.target.y}`
    switch (true) {
        case (props.source.y > props.target.y && (props.target.y - props.source.y) < props.target.height): {
            res = `M${props.source.x},${((props.source.y - props.source.height))} C${props.source.x},${((props.source.y - (props.source.y - props.target.y)))} ${props.target.x},${(props.source.y - (props.source.y - props.target.y) / 2)} ${props.target.x},${props.target.y}`
            break
        }
        case (props.target.y > props.source.y && (props.target.y - props.source.y) > props.target.height): {
            res = `M${props.target.x},${((props.target.y - props.target.height))} C${props.target.x},${((props.target.y - (props.target.y - props.source.y)))} ${props.source.x},${(props.target.y - (props.target.y - props.source.y) / 2)} ${props.source.x},${props.source.y}`
            break
        }
        case (props.source.y >= props.target.y && (props.source.y - props.target.y) < props.source.height)  : {
            if (props.source.x > props.target.x)
                res = `M${props.source.x - props.source.width / 2},${((props.source.y - props.source.height / 2))} C${props.source.x - props.source.width / 2},${(props.source.y - props.source.height / 1.5)} ${props.target.x + props.target.width / 2},${props.target.y - props.target.height / 4} ${props.target.x + props.target.width / 2},${props.target.y - props.target.height / 2}`

            else
                res = `M${props.target.x - props.target.width / 2},${((props.target.y - props.target.height / 2))} C${props.target.x - props.target.width / 2},${(props.target.y - props.target.height / 1.5)} ${props.source.x + props.source.width / 2},${props.source.y - props.source.height / 3} ${props.source.x + props.source.width / 2},${props.source.y - props.source.height / 2}`

            break
        }

        case (props.target.y > props.source.y && (props.target.y - props.source.y) < props.target.height): {
            if (props.source.x > props.target.x)
                res = `M${props.target.x + props.target.width / 2},${((props.target.y - props.target.height / 2))} C${props.target.x + props.target.width / 2},${(props.target.y - props.target.height / 4)} ${props.source.x - props.source.width / 2},${props.source.y - props.source.height / 1.5} ${props.source.x - props.source.width / 2},${props.source.y - props.source.height / 2}`
            else
                res = `M${props.source.x + props.source.width / 2},${((props.source.y - props.source.height / 2))} C${props.source.x + props.source.width / 2},${(props.source.y - props.source.height / 1.5)} ${props.target.x - props.target.width / 2},${props.target.y - props.target.height / 4} ${props.target.x - props.target.width / 2},${props.target.y - props.target.height / 2}`
            break
        }
        default:
            break
    }
    return res
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