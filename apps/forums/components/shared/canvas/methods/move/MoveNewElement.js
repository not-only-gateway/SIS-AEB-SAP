import {v4 as uuid4} from "uuid";
import PropTypes from "prop-types";

export default function MoveNewElement(props) {
    let dragged = true

    document.addEventListener("drag", function (event) {
    }, false);

    document.addEventListener("dragstart", function (event) {

        if (event.target.className === 'Menu_buttonContainer__3oHbi') {
            event.target.style.opacity = 1;
        }
    }, false);

    document.addEventListener("dragend", function (event) {
        // reset the transparency
        event.target.style.opacity = "";
    }, false);

    document.addEventListener('dragover', function (event) {
        event.preventDefault();
    })

    document.addEventListener("drop", function (event) {
        event.preventDefault();
        if (typeof event.target.className === 'object' && event.target.className.animVal === 'Frame_canvasBackground__3fnpp' && props.root !== undefined && dragged) {
            dragged = false

            event.target.style.background = "";
            const rootBounding = {
                x: props.root.getBoundingClientRect().left,
                y: props.root.getBoundingClientRect().top
            }

            props.setState(({
                ...props.data,
                nodes: [...props.data.nodes, ...[{
                    id: uuid4().toString(),
                    title: 'Em branco',
                    description: null,
                    color: '#0095ff',
                    placement: {
                        x: (event.clientX - rootBounding.x + props.root.scrollLeft - 40),
                        y: (event.clientY - rootBounding.y + props.root.scrollTop - 40)
                    },
                    shape: props.type,
                    creationDate: (new Date()).getTime(),
                    links: []
                }]]
            }))
        }
    }, {
        once: true
    })
    return () => {
        document.removeEventListener('drop')
        document.removeEventListener('dragover')
        document.removeEventListener('dragend')
        document.removeEventListener('dragstart')
        document.removeEventListener('drag')
    }
}
MoveNewElement.propTypes = {
    data: PropTypes.object,
    setState: PropTypes.func,
    root: PropTypes.object,
    type: PropTypes.oneOf(['circle', 'rect', 'step-rhombus', 'step-rect', 'step-rounded']),
}