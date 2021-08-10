import PropTypes from 'prop-types'
import Placement from "../../modules/node/misc/Placement";
import ReactDOM from 'react-dom'

export default function Move(props) {
    let moving = false
    let nodeRef = document.getElementById(props.node.id + '-node')
    let nodeSlotRef = document.getElementById(props.node.id + '-node-slot')
    props.setSelectedNode(undefined)
    let lastPlacement = {
        x: props.event.clientX,
        y: props.event.clientY
    }
    if (nodeRef !== null && nodeRef !== undefined) {
        nodeRef.style.transition = 'box-shadow 250ms ease';
        moving = true
        nodeRef.style.cursor = 'move'
        const wrapper = nodeRef.firstChild
        ReactDOM.render(
            <Placement y={parseInt(wrapper.getAttribute('y')) + wrapper.getBBox().height + 30}
                       x={parseInt(wrapper.getAttribute('x'))} nodeRef={nodeRef} nodeSlotRef={nodeSlotRef}/>,
            nodeSlotRef
        )
        nodeSlotRef.setAttribute('visibility', 'hidden')
        document.addEventListener('mousemove', function movingEl(event){
            if (moving)
                move(event, false)
            else
                event.currentTarget.removeEventListener('mousemove', movingEl)
        })
        document.addEventListener("mouseup", event => {
            if (moving) {
                ReactDOM.unmountComponentAtNode(nodeSlotRef)
                document.removeEventListener('mousemove', () => null)
                moving = false
                nodeRef.style.cursor = 'pointer'
                move(event, true)
            }
        }, {once: true});

    }

    function move(event, save) {

        nodeSlotRef.setAttribute('visibility', 'visible')
        const wrapper = nodeRef.firstChild

        let newPlacement = {
            x: lastPlacement.x - event.clientX,
            y: lastPlacement.y - event.clientY
        }

        lastPlacement = {
            x: event.clientX,
            y: event.clientY
        }
        let placementX = wrapper.getAttribute('x') - newPlacement.x / props.scale
        let placementY = wrapper.getAttribute('y') - newPlacement.y / props.scale

        wrapper.setAttribute('y', placementY.toString())
        wrapper.setAttribute('x', placementX.toString())

        if (save) {
            if (placementX < 0) {
                wrapper.setAttribute('x', '15')
            }

            if (placementY < 0) {
                // content.setAttribute('y', '15')
                wrapper.setAttribute('y', '15')
            }
            props.setSelectedNode(props.node.id)
        } else {
            nodeSlotRef.firstChild.setAttribute('x', (placementX + wrapper.getBBox().width / 2 - nodeSlotRef.getBBox().width / 2).toString())
            nodeSlotRef.firstChild.setAttribute('y', (placementY + wrapper.getBBox().height + 30).toString())
        }
    }
}

Move.propTypes = {
    scale: PropTypes.number,
    node: PropTypes.object,

    root: PropTypes.object,

    event: PropTypes.object,
    index: PropTypes.number,
    setSelectedNode: PropTypes.func
}
