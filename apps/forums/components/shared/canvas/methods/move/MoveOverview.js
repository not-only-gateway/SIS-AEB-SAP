import PropTypes from 'prop-types'

export default function MoveOverview(props) {
    let moving = true

    let lastPlacement = {
        x: props.event.clientX,
        y: props.event.clientY
    }

    document.addEventListener('mousemove', event => {
        if (moving)
            move(event, false)
    })
    document.addEventListener("mouseup", event => {
        if (moving) {
            document.removeEventListener('mousemove', () => null)
            moving = false
            move(event, true)
        }
    }, false);


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