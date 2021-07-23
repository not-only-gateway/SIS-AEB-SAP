import PropTypes from 'prop-types'

export default function MoveOverview(props) {
    let moving = true

    let lastPlacement = {
        x: props.event.clientX,
        y: props.event.clientY
    }
    const stickyZone = document.getElementById('canvas-sticky-zone')
    if (props.contextMenuRef.offsetHeight <= 500)
        stickyZone.style.display = 'block'

    props.contextMenuRef.style.height = 'auto'
    props.contextMenuRef.childNodes[0].style.height = '500px'

    document.addEventListener('mousemove', event => {
        if (moving)
            move(event, false)
    })
    document.addEventListener("mouseup", event => {
        if (moving) {
            const closest = event.target.closest('.Shapes_stickyZone__2gH6s')

            if (closest !== null) {
                props.contextMenuRef.style.top = '0'
                props.contextMenuRef.style.left = (stickyZone.offsetLeft - 100) + 'px'
                props.contextMenuRef.style.height = (stickyZone.offsetHeight + 32) + 'px'
                props.contextMenuRef.childNodes[0].style.height = '100%'
            }

            document.removeEventListener('mousemove', () => null)
            moving = false
            stickyZone.style.display = 'none'

            move(event, true)
        }
    }, {
        once: true
    });


    function move(event, save) {

        let newPlacement = {
            x: lastPlacement.x - event.clientX,
            y: lastPlacement.y - event.clientY
        }

        lastPlacement = {
            x: event.clientX,
            y: event.clientY
        }

        let placementX = props.contextMenuRef.offsetLeft - newPlacement.x;
        let placementY = props.contextMenuRef.offsetTop - newPlacement.y;

        props.contextMenuRef.style.top = placementY + 'px'
        props.contextMenuRef.style.left = placementX + 'px'

        if (save) {
            if (placementX < 0)
                props.contextMenuRef.style.left = '20px'

            if (placementY < 0)
                props.contextMenuRef.style.top = '20px'
        }
    }


    return () => {
        document.removeEventListener('mouseup', () => null)
        document.removeEventListener('mousemove', () => null)
    }
}

MoveOverview.propTypes = {
    root: PropTypes.object,
    contextMenuRef: PropTypes.object,
    event: PropTypes.object
}
