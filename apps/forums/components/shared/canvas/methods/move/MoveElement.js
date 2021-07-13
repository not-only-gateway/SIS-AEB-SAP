import PropTypes from 'prop-types'
import LinkTemplate from "../../templates/LinkTemplate";

export default function Move(props) {
    let moving = false
    let nodeRef = document.getElementById(props.node.id+'-node')

    if(nodeRef !== null){

            nodeRef.style.transition = 'box-shadow 150ms ease';
            moving = true
            nodeRef.style.cursor = 'move'
            if (props.color !== undefined && props.color !== null) {
                nodeRef.style.boxShadow = '0 0 10px 2px ' + props.color;
            } else
                nodeRef.style.boxShadow = '0 0 10px 2px #0095ff';


        document.addEventListener('mousemove', event => {
            if (moving) {
                move(event, false)
                handleOverflow(event.clientX, event.clientY)
            }
        })
        document.addEventListener("mouseup", event => {
            if (moving) {
                moving = false
                nodeRef.style.transition = '150ms ease';
                nodeRef.style.opacity = '1';
                nodeRef.style.boxShadow = 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px'
                move(event, true)
            }
        }, false);
    }

    function move(event, save) {
        let placementX = (event.clientX + props.overflowRef.scrollLeft - nodeRef.offsetWidth * 0.5)
        let placementY = (event.clientY - props.root.offsetTop + props.overflowRef.scrollTop - nodeRef.offsetHeight * 0.5)

        nodeRef.style.top = placementY + 'px'

        nodeRef.style.left = placementX + 'px'
        //
        // if (save) {
        //     props.handleChange({
        //         x: placementX,
        //         y: placementY,
        //         id: props.node.id
        //     })
        // }
    }

    function handleOverflow(x, y) {
        switch (true) {
            case (y < props.root.offsetTop): {
                const newHeight = props.root.offsetHeight + nodeRef.offsetHeight
                const newOffset = ((props.root.offsetHeight + nodeRef.offsetHeight) / props.root.offsetHeight - 1) * 100
                props.root.style.height = newHeight + 'px'
                let children = props.canvasRef.childNodes
                let i

                let adjustedHeight = newHeight
                for (i = 0; i < children.length; i++) {
                    if (children[i].id !== nodeRef.id) {
                        if ((children[i].offsetTop + newOffset) > newHeight) {
                            adjustedHeight = ((children[i].offsetTop + newOffset) - newHeight) + newHeight
                            const adjustedOffset = ((children[i].offsetTop + newOffset) - newHeight)
                            children[i].style.top = (children[i].offsetTop - children[i].offsetHeight * 2 - adjustedOffset) + 'px'
                        } else
                            children[i].style.top = (children[i].offsetTop + newOffset) + 'px'
                    }
                }

                break
            }

            case((y + 1) >= (props.root.offsetHeight + props.root.offsetTop)): {
                console.log('OVERFLOWING BOTTOM')
                break
            }
            case (x < props.root.offsetLeft): {
                console.log('OVERFLOWING X LEFT')
                const newOffset = ((props.root.offsetWidth + nodeRef.offsetWidth) / props.root.offsetWidth - 1) * 100
                props.root.style.width = (props.root.offsetWidth + nodeRef.offsetWidth) + 'px'
                let children = props.canvasRef.childNodes
                let i
                for (i = 0; i < children.length; i++) {
                    children[i].style.left = (children[i].offsetLeft + newOffset) + 'px'
                }
                break
            }

            case((x + 1) >= (props.root.offsetWidth + props.root.offsetLeft)): {
                console.log('OVERFLOWING X RIGHT')
                break
            }
            default:
                break
        }

    }

}

Move.propTypes = {
    node: PropTypes.shape({
        id: PropTypes.number,
        color: PropTypes.string,
    }),
    nodes: PropTypes.array,


    overflowRef: PropTypes.object,
    root: PropTypes.object,
    canvasRef: PropTypes.object,
}
