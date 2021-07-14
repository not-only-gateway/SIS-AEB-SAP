import PropTypes from 'prop-types'

export default function MoveGroup(props) {
    let moving = false
    let groupRef = document.getElementById(props.id)
    let changed = []
    if (groupRef !== null) {
        moving = true

        let i
        for (i = 0; i< groupRef.childNodes.length; i++){
            groupRef.childNodes[i].style.opacity = '.5'
            if(i === (groupRef.childNodes.length-1))
                groupRef.childNodes[i].style.display = 'none'
        }

        document.addEventListener('mousemove', event => {
            if (moving) {
                move(event, false)
                handleOverflow(event.clientX, event.clientY)
            }
        })
        document.addEventListener("mouseup", event => {
            if (moving) {

                let i
                for (i = 0; i< groupRef.childNodes.length; i++){
                    groupRef.childNodes[i].style.opacity = '1'
                    if(i === (groupRef.childNodes.length-1))
                        groupRef.childNodes[i].style.display = 'flex'
                }
                moving = false
                groupRef.style.opacity = '1';
                move(event, true)

            }
        }, false);
    }

    function move(event, save) {

        let placementX = (event.clientX  - props.root.offsetLeft+ props.overflowRef.scrollLeft - groupRef.offsetWidth * 0.5)
        let placementY = (event.clientY - props.root.offsetTop + props.overflowRef.scrollTop - groupRef.offsetHeight * 0.5)
        groupRef.style.top = placementY + 'px'
        groupRef.style.left = placementX + 'px'
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
                const newHeight = props.root.offsetHeight + groupRef.offsetHeight
                const newOffset = ((props.root.offsetHeight + groupRef.offsetHeight) / props.root.offsetHeight - 1) * 100
                props.root.style.height = newHeight + 'px'
                let children = props.canvasRef.childNodes
                let i

                let adjustedHeight = newHeight
                for (i = 0; i < children.length; i++) {
                    if (children[i].id !== groupRef.id) {
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
                const newOffset = ((props.root.offsetWidth + groupRef.offsetWidth) / props.root.offsetWidth - 1) * 100
                props.root.style.width = (props.root.offsetWidth + groupRef.offsetWidth) + 'px'
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

MoveGroup.propTypes = {
    id: PropTypes.any,


    overflowRef: PropTypes.object,
    root: PropTypes.object,
    canvasRef: PropTypes.object,

    setState: PropTypes.func
}
