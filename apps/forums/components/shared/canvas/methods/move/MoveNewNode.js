import {v4 as uuid4} from "uuid";
import PropTypes from "prop-types";
import OptionsMenu from "../../modules/navigation/OptionsMenu";

export default function MoveNewNode(props) {
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
            let newNodes = [...props.data.nodes]

            newNodes.map((node, index) => {
                const element = document.getElementById(node.id+'-node')
                let newNode = {...node}

                if(element !== null) {
                    newNode.placement.x = element.offsetLeft
                    newNode.placement.y = element.offsetTop
                    newNodes[index] = newNode
                }
            })

            newNodes.push({
                id: uuid4().toString(),
                title: 'Em branco',
                description: null,

                color: '#0095ff',
                placement: {
                    x: (event.clientX - props.root.getBoundingClientRect().left + props.root.scrollLeft - 40),
                    y: (event.clientY - props.root.getBoundingClientRect().top + props.root.scrollTop - 40)
                },
                shape: 'circle',
                creationDate: (new Date()).getTime()
            })

            props.setState(({
                ...props.data,
                nodes: newNodes
            }))
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
MoveNewNode.propTypes = {
    data: PropTypes.object,
    setState: PropTypes.func,
    root: PropTypes.object
}