import PropTypes from 'prop-types'

export default function MoveOptions(props) {
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

        let placementX = props.reference.offsetLeft - newPlacement.x;
        let placementY = props.reference.offsetTop - newPlacement.y;

        props.reference.style.top = placementY + 'px'
        props.reference.style.left = placementX + 'px'

        if (save) {
            if (placementX < 0)
                props.reference.style.left = '0px'

            if (placementY < 0)
                props.reference.style.top = '0px'
        }
    }


    return () => {
        document.removeEventListener('mouseup', () => null)
        document.removeEventListener('mousemove', () => null)
    }
}

MoveOptions.propTypes = {
    root: PropTypes.object,
    reference: PropTypes.object,
    event: PropTypes.object
}
