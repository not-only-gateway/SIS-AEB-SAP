import PropTypes from "prop-types";
import GetCurve from "./GetCurve";

export default function AdjustLink(props) {
    let moving = true
    if (moving) {
        props.setOnMove(true)
        document.addEventListener('mousemove', function move(event) {
            if (moving)
                update()
            else
                event.currentTarget.removeEventListener('mousemove', move);
        })

        document.addEventListener("mouseup", function up(event) {
            if (moving) {
                moving = false
                props.setOnMove(false)
                document.removeEventListener('mousemove', () => null)
                event.currentTarget.removeEventListener('mousemove', up);
                props.setColor(undefined)
            }
        }, {
            once: true
        });
    }
    const update = () => {
        if (props.pathRef !== null)
            props.pathRef.setAttribute('d', GetCurve({
                target: {
                    x: parseInt(props.target.reference.getAttribute('x')),
                    y: parseInt(props.target.reference.getAttribute('y')),
                    height: props.target.reference.getBBox().height,
                    width: props.target.reference.getBBox().width,
                    connectionPoint: props.target.connectionPoint,
                    nodeShape: props.target.nodeShape
                },
                source: {
                    x: parseInt(props.source.reference.getAttribute('x')),
                    y: parseInt(props.source.reference.getAttribute('y')),
                    height: props.source.reference.getBBox().height,
                    width: props.source.reference.getBBox().width,
                    connectionPoint: props.source.connectionPoint,
                    nodeShape: props.source.nodeShape
                },
                type: props.type
            }))
    }
    return () => {
        document.removeEventListener('mouseup', () => null)
        document.removeEventListener('mousemove', () => null)
    }
}

AdjustLink.propTypes = {
    source: PropTypes.shape({
        reference: PropTypes.object,
        connectionPoint: PropTypes.oneOf(['a', 'b', 'c', 'd']),
        nodeShape: PropTypes.string
    }),
    target: PropTypes.shape({
        reference: PropTypes.object,
        connectionPoint: PropTypes.oneOf(['a', 'b', 'c', 'd']),
        nodeShape: PropTypes.string
    }),
    pathRef: PropTypes.object,
    setColor: PropTypes.func,
    setOnMove: PropTypes.func,
    type: PropTypes.oneOf(['strong-path', 'strong-line', 'dashed-path', 'dashed-line'])
}
