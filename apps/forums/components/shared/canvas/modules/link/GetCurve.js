import PropTypes from 'prop-types'

export default function GetCurve(props) {
    let res = `M${props.source.x},${((props.source.y))} C${props.source.x},${((props.source.y - (props.source.y - props.target.y) / 2))} ${props.target.x},${(props.source.y - (props.source.y - props.target.y) / 2)} ${props.target.x},${props.target.y}`
    switch (true) {
        case (props.source.y > props.target.y && (props.target.y - props.source.y) < props.target.height): {
            res = `M${props.source.x},${(props.source.y)} C${props.source.x},${((props.source.y - (props.source.y - props.target.y)))} ${props.target.x},${(props.source.y - (props.source.y - props.target.y) / 2)} ${props.target.x},${props.target.y}`
            break
        }
        case (props.target.y > props.source.y && (props.target.y - props.source.y) > props.target.height): {
            res = `M${props.target.x},${((props.target.y))} C${props.target.x},${((props.target.y - (props.target.y - props.source.y)))} ${props.source.x},${(props.target.y - (props.target.y - props.source.y) / 2)} ${props.source.x},${props.source.y}`
            break
        }
        case (props.source.y >= props.target.y && (props.source.y - props.target.y) < props.source.height)  : {
            if (props.source.x > props.target.x)
                res = `M${props.source.x},${((props.source.y))} C${props.source.x},${(props.source.y)} ${props.target.x},${props.target.y} ${props.target.x},${props.target.y}`

            else
                res = `M${props.target.x},${((props.target.y))} C${props.target.x},${(props.target.y)} ${props.source.x},${props.source.y} ${props.source.x},${props.source.y}`

            break
        }

        case (props.target.y > props.source.y && (props.target.y - props.source.y) < props.target.height): {
            if (props.source.x > props.target.x)
                res = `M${props.target.x},${((props.target.y))} C${props.target.x},${(props.target.y)} ${props.source.x},${props.source.y} ${props.source.x},${props.source.y}`
            else
                res = `M${props.source.x},${((props.source.y))} C${props.source.x},${(props.source.y)} ${props.target.x},${props.target.y} ${props.target.x},${props.target.y}`
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

    }),
    target: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
        height: PropTypes.number
    })
}