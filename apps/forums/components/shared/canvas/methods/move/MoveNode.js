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
        const wrapper = nodeRef.childNodes[0].childNodes[0].getBBox()
        ReactDOM.render(
            <Placement y={wrapper.y +  wrapper.height + 30} x={wrapper.x} nodeRef={nodeRef} nodeSlotRef={nodeSlotRef}/>,
            nodeSlotRef
        )
        nodeSlotRef.setAttribute('visibility', 'hidden')
        document.addEventListener('mousemove', event => {
            if (moving)
                move(event, false)
        })
        document.addEventListener("mouseup", event => {
            if (moving) {
                ReactDOM.unmountComponentAtNode(nodeSlotRef)
                document.removeEventListener('mousemove', () => null)
                moving = false
                nodeRef.style.cursor = 'pointer'
                move(event, true)
            }
        }, false);

    }

    function move(event, save) {

        nodeSlotRef.setAttribute('visibility', 'visible')
        const wrapper = nodeRef.childNodes[0].childNodes[0]
        const content = nodeRef.childNodes[0].childNodes[1]

        let newPlacement = {
            x: lastPlacement.x - event.clientX,
            y: lastPlacement.y - event.clientY
        }

        lastPlacement = {
            x: event.clientX,
            y: event.clientY
        }
        let placementX = wrapper.getBBox().x - newPlacement.x / props.scale
        let placementY = wrapper.getBBox().y - newPlacement.y / props.scale

        content.setAttribute('x', placementX.toString())
        content.setAttribute('y', placementY.toString())
        wrapper.setAttribute('y', placementY.toString())
        wrapper.setAttribute('x', placementX.toString())

        if (save) {
            if (placementX < 0) {
                content.setAttribute('x', '15')
                wrapper.setAttribute('x', '15')
            }

            if (placementY < 0) {
                content.setAttribute('y', '15')
                wrapper.setAttribute('y', '15')

            }
            props.setSelectedNode(props.node.id)
        }
        else{
            nodeSlotRef.firstChild.setAttribute('x', (placementX + wrapper.getBBox().width/2 - nodeSlotRef.getBBox().width/2).toString())
            nodeSlotRef.firstChild.setAttribute('y', (placementY + wrapper.getBBox().height + 30).toString())
        }
    }


    return () => {
        document.removeEventListener('mouseup', () => null)
        document.removeEventListener('mousemove', () => null)
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
