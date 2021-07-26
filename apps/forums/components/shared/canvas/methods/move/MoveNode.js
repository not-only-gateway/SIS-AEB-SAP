import PropTypes from 'prop-types'

export default function Move(props) {
    let moving = false
    let nodeRef = document.getElementById(props.node.id + '-node')
    console.log(props.event.clientX)
    let lastPlacement = {
        x: props.event.clientX,
        y: props.event.clientY
    }
    if (nodeRef !== null) {
        nodeRef.style.transition = 'box-shadow 250ms ease';
        moving = true
        nodeRef.style.cursor = 'move'
        nodeRef.style.zIndex = '4'

        document.addEventListener('mousemove', event => {
            if (moving)
                move(event, false)
        })
        document.addEventListener("mouseup", event => {
            if (moving) {
                document.removeEventListener('mousemove', () => null)
                moving = false
                nodeRef.style.zIndex = '5'
                nodeRef.style.opacity = '1';
                nodeRef.style.cursor = 'pointer'
                move(event, true)
            }
        }, false);
    }

    function move(event, save) {
        const selector = nodeRef.firstChild.childNodes[0]
        const wrapper = nodeRef.firstChild.childNodes[1]
        const content = nodeRef.firstChild.childNodes[2]

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
        selector.setAttribute('y', (placementY - 10))
        selector.setAttribute('x', (placementX - 10))
        if (save) {
            if (placementX < 0) {
                content.setAttribute('x', '20')
                wrapper.setAttribute('x', '20')
                selector.setAttribute('x', '10')
            }


            if (placementY < 0) {
                content.setAttribute('y', '20')
                wrapper.setAttribute('y', '20')
                selector.setAttribute('y', '10')
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
    data: PropTypes.object,

    root: PropTypes.object,

    setState: PropTypes.func,
    event: PropTypes.object,
    index: PropTypes.number
}
