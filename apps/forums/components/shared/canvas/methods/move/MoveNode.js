import PropTypes from 'prop-types'
import index from "../../../../../pages";

export default function Move(props) {
    let moving = false
    let nodeRef = document.getElementById(props.node.id + '-node')
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

        let newPlacement = {
            x: lastPlacement.x - event.clientX,
            y: lastPlacement.y - event.clientY
        }

        lastPlacement = {
            x: event.clientX,
            y: event.clientY
        }

        let placementX = nodeRef.offsetLeft - newPlacement.x / props.scale;
        let placementY = nodeRef.offsetTop - newPlacement.y / props.scale;

        nodeRef.style.top = placementY + 'px'
        nodeRef.style.left = placementX + 'px'

        if (save) {
            if (placementX < 0)
                nodeRef.style.left = '20px'

            if (placementY < 0)
                nodeRef.style.top = '20px'
            // let newNodes = [...props.data.nodes]
            // console.log('before => ' + JSON.stringify(newNodes[props.index].placement))
            // newNodes[props.index] = {
            //     ...props.node,
            //     placement: {
            //         x: nodeRef.offsetLeft,
            //         y: nodeRef.offsetTop
            //     }
            // }
            // console.log(newNodes)
            // console.log('after => ' + JSON.stringify(newNodes[props.index].placement))
            // props.setState({
            //     ...props.data,
            //     nodes: newNodes
            // })
            // console.log(props.data)
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
