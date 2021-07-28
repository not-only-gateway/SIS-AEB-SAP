import PropTypes from 'prop-types'

export default function Move(props) {
    let moving = false
    let nodeRef = document.getElementById(props.node.id + '-node')
    props.setSelectedNode(undefined)
    let lastPlacement = {
        x: props.event.clientX,
        y: props.event.clientY
    }
    if (nodeRef !== null) {
        nodeRef.style.transition = 'box-shadow 250ms ease';
        moving = true
        nodeRef.style.cursor = 'move'


        document.addEventListener('mousemove', event => {
            if (moving)
                move(event, false)
        })
        document.addEventListener("mouseup", event => {
            if (moving) {
                props.setSelectedNode(props.node.id)
                document.removeEventListener('mousemove', () => null)
                moving = false
                nodeRef.style.cursor = 'pointer'
                move(event, true)
            }
        }, false);
    }

    function move(event, save) {

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
        let placementX = wrapper.getBBox().x - newPlacement.x / props.scale;
        let placementY = wrapper.getBBox().y - newPlacement.y / props.scale;

        content.setAttribute('x', placementX.toString())
        content.setAttribute('y', placementY.toString())
        wrapper.setAttribute('y', placementY.toString())
        wrapper.setAttribute('x', placementX.toString())

        if (save) {
            if (placementX < 0) {
                content.setAttribute('x', '20')
                wrapper.setAttribute('x', '20')
            }


            if (placementY < 0) {
                content.setAttribute('y', '20')
                wrapper.setAttribute('y', '20')

            }
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
