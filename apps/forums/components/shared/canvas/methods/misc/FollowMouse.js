import PropTypes from "prop-types";
import GetCurve from "./GetCurve";

export default function FollowMouse(props) {
    let moving = true
    const frame = document.getElementById('frame')
    const markerEnd = document.getElementById(props.pathRef.getAttribute('marker-end').replace('url(#', '').replace(')', ''))
    if(markerEnd !== null)
        markerEnd.setAttribute('visibility', 'hidden')
    if (moving) {

        document.addEventListener('mousemove', function move(event) {
            if (moving) {
                if(markerEnd !== null)
                    markerEnd.setAttribute('visibility', 'visible')
                update(event)
            }
            else
                event.currentTarget.removeEventListener('mousemove', move);
        })

        document.addEventListener("mouseup", function up(event) {
            if (moving) {
                moving = false
                document.removeEventListener('mousemove', () => null)
                event.currentTarget.removeEventListener('mousemove', up);
            }
        }, {
            once: true
        });
    }
    const update = (event) => {
        if (props.pathRef !== null && frame !== null)
            props.pathRef.setAttribute('d', GetCurve({
                target: {
                    x: event.clientX - props.root.offsetLeft + props.root.scrollLeft,
                    y: event.clientY - frame.offsetTop - 55 + props.root.scrollTop,
                    height: 0,
                    width: 0,
                    connectionPoint: 'c',
                    nodeShape: 'circle'
                },
                source: {
                    x: props.source.reference.getBBox().x,
                    y: props.source.reference.getBBox().y,
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

FollowMouse.propTypes = {
    source: PropTypes.shape({
        reference: PropTypes.object,
        connectionPoint: PropTypes.oneOf(['a', 'b', 'c', 'd']),
        nodeShape: PropTypes.string
    }),
    pathRef: PropTypes.object,
    type: PropTypes.oneOf(['strong-path', 'strong-line', 'dashed-path', 'dashed-line']),
    root: PropTypes.object
}
