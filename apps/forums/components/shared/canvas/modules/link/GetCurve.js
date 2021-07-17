import PropTypes from 'prop-types'

export default function GetCurve(props) {
    let pivots = {}
    switch (true) {
        case (props.source.y > props.target.y): {
            console.log('case 1')
            pivots = {
                x1: props.source.x + props.source.width / 2,
                y1: props.source.height / 2 + props.source.y - (props.source.y - props.target.y) / 2,
                x2: props.target.x + props.target.width / 2,
                y2: props.source.height / 2 + props.source.y - (props.source.y - props.target.y) / 2
            }
            break
        }
        case (props.target.y >= props.source.y): {
            console.log('case 2')
            pivots = {
                x1: props.source.x + props.source.width / 2,
                y1: props.target.height / 2 + props.target.y - (props.target.y - props.source.y) / 2,
                x2: props.target.x + props.target.width / 2,
                y2: props.target.height / 2 + props.target.y - (props.target.y - props.source.y) / 2
            }
            break
        }
        default:
            break
    }
    return `M${props.source.x + props.source.width / 2},${props.source.y + props.source.height / 2} C${pivots.x1},${pivots.y1} ${pivots.x2},${pivots.y2} ${props.target.x + props.target.width / 2},${props.target.y + props.target.height / 2}`
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