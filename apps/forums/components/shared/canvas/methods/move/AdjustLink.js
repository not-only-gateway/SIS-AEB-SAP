import PropTypes from "prop-types";
import GetCurve from "../../modules/link/GetCurve";

export default function AdjustLink(props) {
    let moving = true
    if (moving) {
        document.addEventListener('mousemove', function move(event){
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
                }
            }))

        if (props.description !== undefined && props.description.length > 0 && props.descriptionRef !== null && props.descriptionRef !== undefined) {
            props.descriptionRef.setAttribute('x', (t.offsetLeft + t.offsetWidth / 2 + s.offsetWidth / 2 + s.offsetLeft) / 2 - 32.5)
            props.descriptionRef.setAttribute('y', (t.offsetTop + t.offsetHeight / 2 + s.offsetHeight / 2 + s.offsetTop) / 2 - 20)
        }
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
    descriptionRef: PropTypes.object,
    description: PropTypes.string
}
