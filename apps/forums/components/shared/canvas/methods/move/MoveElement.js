import PropTypes from 'prop-types'
import LinkTemplate from "../../templates/LinkTemplate";

export default function Move(props) {
    let moving = false
    var handleMove = function (event){
        moveElement(event.x, event.y, event.last)
    }
    props.element.addEventListener('mousedown', (event) => {
        if (typeof event === 'object' && event.button === 0) {
            moving = true
            props.element.style.cursor = 'move'
            if (props.color !== undefined && props.color !== null) {
                props.element.style.boxShadow = '0 0 10px 2px ' + props.color;
            } else
                props.element.style.boxShadow = '0 0 10px 2px #0095ff';

        }
        props.element.removeEventListener('mousedown', () => null)
    }, false)
    document.addEventListener('mousemove', event => {
        if (moving) {
            let placementX = (event.clientX - (props.root.offsetLeft + (props.element.offsetWidth) * 0.5))
            let placementY = (event.clientY - (props.root.offsetTop + (props.element.offsetHeight * 0.5)))

            props.element.style.top = (placementY + props.root.offsetTop + props.overflowRef.scrollTop - props.element.offsetHeight * 1.2) + 'px'
            props.element.style.left = (placementX + props.root.offsetLeft + props.overflowRef.scrollLeft) + 'px'


            handleOverflow(event.clientX, event.clientY)
        }
    })
    props.element.addEventListener("mouseup", event => {
        if (moving) {
            moving = false
            props.element.style.opacity = '1';
            props.element.style.boxShadow = 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px'

            let placementX = (event.clientX - (props.root.offsetLeft + (props.element.offsetWidth) * 0.5))
            let placementY = (event.clientY - (props.root.offsetTop + (props.element.offsetHeight * 0.5)))

            props.element.style.top = (Math.ceil((placementY + props.root.offsetTop + props.overflowRef.scrollTop - props.element.offsetHeight * 1.2) / 30) * 30) + 'px'
            props.element.style.left = Math.ceil((placementX + props.root.offsetLeft + props.overflowRef.scrollLeft) / 30) * 30 + 'px'

            props.handleChange({
                x: (placementX + props.root.offsetLeft + props.overflowRef.scrollLeft),
                y: (placementY + props.root.offsetTop + props.overflowRef.scrollTop - props.element.offsetHeight * 1.2),
                id: props.entityKey
            })

            if (props.element.offsetTop < 0)
                props.element.style.top = '20px';
            if (props.element.offsetLeft < 0)
                props.element.style.left = '20px';
        }
    }, false);


    function handleOverflow(x, y) {

        switch (true) {
            case (y < props.root.offsetTop): {
                const newHeight = props.root.offsetHeight + props.element.offsetHeight
                const newOffset = ((props.root.offsetHeight + props.element.offsetHeight) / props.root.offsetHeight - 1) * 100
                props.root.style.height = newHeight + 'px'
                let children = props.canvasRef.childNodes
                let i

                let adjustedHeight = newHeight
                for (i = 0; i < children.length; i++) {
                    if (children[i].id !== props.element.id) {
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
                const newOffset = ((props.root.offsetWidth + props.element.offsetWidth) / props.root.offsetWidth - 1) * 100
                props.root.style.width = (props.root.offsetWidth + props.element.offsetWidth) + 'px'
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
    index: PropTypes.number,
    overflowRef: PropTypes.object,
    parents: PropTypes.arrayOf(
        LinkTemplate
    ),
    children: PropTypes.arrayOf(
        LinkTemplate
    ),
    element: PropTypes.object,
    root: PropTypes.object,
    color: PropTypes.string,
    canvasRoot: PropTypes.object,
    entityKey: PropTypes.number,
    canvasRef: PropTypes.object,
}
