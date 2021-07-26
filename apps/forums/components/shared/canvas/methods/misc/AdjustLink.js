import PropTypes from "prop-types";
import GetCurve from "../../modules/link/GetCurve";

export default function AdjustLink(props) {
    let moving = true
    if (moving) {
        document.addEventListener('mousemove', function move(event) {
            if (moving)
                update()
            else
                event.currentTarget.removeEventListener('mousemove', move);
        })

        document.addEventListener("mouseup", function up(event) {
            if (moving) {
                moving = false
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
                    x: props.target.getBBox().x,
                    y: props.target.getBBox().y,
                    height: props.target.getBBox().height,
                    width: props.target.getBBox().width
                },
                source: {
                    x: props.source.getBBox().x,
                    y: props.source.getBBox().y,
                    height: props.source.getBBox().height,
                    width: props.source.getBBox().width
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
    source: PropTypes.object,
    target: PropTypes.object,
    pathRef: PropTypes.object,
    // descriptionRef: PropTypes.object,
    // description: PropTypes.string,
    setColor: PropTypes.func,
    type: PropTypes.oneOf(['strong-path', 'strong-line', 'dashed-path', 'dashed-line'])
}
