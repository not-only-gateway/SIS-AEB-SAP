import PropTypes from 'prop-types'

export default function Move(props) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    props.button.addEventListener('mousedown', e => {

        e.preventDefault();

        pos3 = e.clientX;

        if (props.element.offsetTop < 0) {
            props.element.style.top = 0
            closeDragElement()
            document.onmousemove = null;
        } else {
            pos4 = e.clientY

            closeDragElement()
            document.onmousemove = elementDrag;
        }
    })
    props.root.addEventListener('mouseup', () => {
        if (props.element.offsetTop < 0) {
            props.element.style.top = 0
            closeDragElement()
            document.onmousemove = null;
        } else
            document.onmousemove = null;

        props.refreshLinks()
    })

    props.element.addEventListener('mouseup', e => {
        if (props.element.offsetTop < 0) {
            props.element.style.top = 0
            closeDragElement()
            document.onmousemove = null;
        } else
            document.onmousemove = null;

        let newEntry = props.entity
        newEntry.x = props.element.offsetLeft
        newEntry.y = props.element.offsetTop

        props.setEntity(newEntry)

        props.refreshLinks()
    })


    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        props.element.style.top = (props.element.offsetTop - pos2) + "px";
        props.element.style.left = (props.element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

Move.propTypes = {
    entity: PropTypes.object,
    setEntity: PropTypes.func,
    button: PropTypes.object,
    element: PropTypes.object,
    root: PropTypes.object,
    refreshLinks: PropTypes.func
}
