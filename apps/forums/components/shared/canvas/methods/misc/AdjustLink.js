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
                    x: props.target.offsetLeft,
                    y: props.target.offsetTop,
                    height: props.target.offsetHeight,
                    width: props.target.offsetWidth
                },
                source: {
                    x: props.source.offsetLeft,
                    y: props.source.offsetTop,
                    height: props.source.offsetHeight,
                    width: props.source.offsetWidth
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
