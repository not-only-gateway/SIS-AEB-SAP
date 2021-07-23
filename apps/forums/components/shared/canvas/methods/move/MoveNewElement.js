import {v4 as uuid4} from "uuid";
import PropTypes from "prop-types";
import OptionsMenu from "../../modules/navigation/OptionsMenu";

export default function MoveNewElement(props) {
    let dragged
    document.addEventListener("drag", function (event) {
    }, false);

    document.addEventListener("dragstart", function (event) {

        if (event.target.className === 'Menu_buttonContainer__3oHbi') {
            dragged = event.target;
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
        if (event.target.id === "canvas" && props.root !== undefined) {
            event.target.style.background = "";
            if (props.type.includes()) {
                let newSteps = [...props.data.steps]
                newSteps.push({
                    id: uuid4().toString(),
                    description: null,
                    placement: {
                        x: (event.clientX - props.root.getBoundingClientRect().left + props.root.scrollLeft - 40),
                        y: (event.clientY - props.root.getBoundingClientRect().top + props.root.scrollTop - 40)
                    },
                    shape: props.type.replace('step-', ''),

                })

                props.setState(({
                    ...props.data,
                    steps: newSteps
                }))
            } else {
                let newNodes = [...props.data.nodes]
                const rootBounding = {
                    x: props.root.getBoundingClientRect().left,
                    y: props.root.getBoundingClientRect().top
                }
                const newNode = {
                    id: uuid4().toString(),
                    title: 'Em branco',
                    description: null,

                    color: '#0095ff',
                    placement: {
                        x: (event.clientX - rootBounding.x + props.root.scrollLeft - 40),
                        y: (event.clientY - rootBounding.y + props.root.scrollTop - 40)
                    },
                    shape: props.type,
                    creationDate: (new Date()).getTime()
                }
                newNodes.push()
                props.setState(({
                    ...props.data,
                    nodes: [...props.data.nodes, ...[newNode]]
                }))
            }
        }
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