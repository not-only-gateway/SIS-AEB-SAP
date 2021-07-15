import PropTypes from 'prop-types'

export default function ScrollCanvas(props) {
    let scrolling = true
    let pos = { top: 0, left: 0, x: 0, y: 0 };
    const frame = document.getElementById('frame')
    if(frame !== null)
        frame.style.userSelect = 'none';
    props.canvas.style.scrollBehavior = 'auto'
    pos = {
        left: props.canvas.scrollLeft,
        top: props.canvas.scrollTop,
        x: props.event.clientX,
        y: props.event.clientY,
    };
    props.canvas.style.cursor = 'grabbing'
    document.addEventListener('mousemove', event => {
        if (scrolling) {
            const dx = event.clientX - pos.x;
            const dy = event.clientY - pos.y;
            props.canvas.scrollTop = pos.top - dy;
            props.canvas.scrollLeft = pos.left - dx;
        }
    })
    document.addEventListener('mouseup', () => {
        props.canvas.style.cursor = 'grab'
        if(frame !== null)
            frame.style.removeProperty('user-select');
        scrolling = false
    })

    return () => {

        document.removeEventListener('mouseup', () => null)
        document.removeEventListener('mousemove', () => null)
    }
}
ScrollCanvas.propTypes = {
    canvas: PropTypes.object,
    event: PropTypes.object
}