import PropTypes from 'prop-types'
import LinkTemplate from "../../templates/LinkTemplate";

export default function Move(props) {
    let moving = false
    props.element.addEventListener('mousedown', (event) => {
        if (typeof event === 'object' && event.button === 0) {
            props.element.style.transition = 'box-shadow 150ms ease';
            moving = true
            props.element.style.cursor = 'move'
            if (props.color !== undefined && props.color !== null) {
                props.element.style.boxShadow = '0 0 10px 2px ' + props.color;
            } else
                props.element.style.boxShadow = '0 0 10px 2px #0095ff';


            // }, 250)


        }
        props.element.removeEventListener('mousedown', () => null)
    }, false)
    document.addEventListener('mousemove', event => {

        if (moving) {
            move(event, false)
            handleOverflow(event.clientX, event.clientY)
        }
    })
    document.addEventListener("mouseup", event => {
        if (moving) {
            moving = false
            props.element.style.transition = '150ms ease';
            props.element.style.opacity = '1';
            props.element.style.boxShadow = 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px'

            move(event, true)


        }
    }, false);

    function move(event, save) {
        let placementX = (event.clientX + props.overflowRef.scrollLeft - props.element.offsetWidth * 0.5)
        let placementY = (event.clientY - props.root.offsetTop + props.overflowRef.scrollTop - props.element.offsetHeight * 0.5)

        props.element.style.top = placementY + 'px'

        props.element.style.left = placementX + 'px'

        if (save) {
            props.handleChange({
                x: placementX,
                y: placementY,
                id: props.entityKey
            })
        }
    }

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
