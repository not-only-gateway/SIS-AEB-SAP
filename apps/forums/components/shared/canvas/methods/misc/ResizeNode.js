import PropTypes from 'prop-types'

export default function ResizeNode(props) {
    const el = document.getElementById(props.nodeID + '-node-resize')
    let lastPlacement = {
        x: props.event.clientX/props.scale,
        y: props.event.clientY/props.scale
    }
    let newDimensions = {
        width: undefined,
        height: undefined
    }
    let resizing = true
    if (el !== null) {
        console.log(props.scale)
        el.setAttribute('cursor', 'default')
        el.setAttribute('stroke-dasharray', '5,5')
        document.addEventListener('mousemove', function resize(event) {
            console.log('RUNNIng')
            if (resizing) {
                const bBox = el.getBBox()
                const newPlacement = {
                    x: event.clientX/props.scale,
                    y: event.clientY/props.scale
                }

                el.setAttribute('width', (bBox.width + (newPlacement.x- lastPlacement.x)))
                el.setAttribute('height', (bBox.height + (newPlacement.y - lastPlacement.y)))
                newDimensions = {
                    width: bBox.width + (newPlacement.x - lastPlacement.x),
                    height: bBox.height + (newPlacement.y - lastPlacement.y)
                }
                lastPlacement = newPlacement
            } else
                event.currentTarget.removeEventListener('mousemove', resize);
        })

        document.addEventListener('mouseup', () => {

            resizing = false

            const content = el.parentNode.firstChild.childNodes
            props.setSelected(undefined)
            el.setAttribute('stroke-dasharray', undefined)
            if (newDimensions.width && newDimensions.height) {
                el.setAttribute('cursor', 'crosshair')
                if(props.nodeShape === 'circle'){
                    if(newDimensions.width > newDimensions.height){
                        content[0].setAttribute('width', newDimensions.width)
                        content[0].setAttribute('height', newDimensions.width)

                        content[1].setAttribute('width', newDimensions.width)
                        content[1].setAttribute('height', newDimensions.width)

                    }
                    else{
                        content[0].setAttribute('width', newDimensions.height)
                        content[0].setAttribute('height', newDimensions.height)

                        content[1].setAttribute('width', newDimensions.height)
                        content[1].setAttribute('height', newDimensions.height)
                    }
                }else{
                    content[0].setAttribute('width', newDimensions.width)
                    content[0].setAttribute('height', newDimensions.height)

                    content[1].setAttribute('width', newDimensions.width)
                    content[1].setAttribute('height', newDimensions.height)
                }

            }
            props.setSelected(props.nodeID)
        }, {once: true})
    }

    return () => {
        document.removeEventListener('mousemove', () => null)
    }
}
ResizeNode.propTypes = {
    nodeID: PropTypes.string,
    nodeShape: PropTypes.string,
    event: PropTypes.object,
    scale: PropTypes.number,
    setSelected: PropTypes.func
}