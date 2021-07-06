import PropTypes from 'prop-types'
import AdjustChild from "./AdjustChild";
import AdjustParent from "./AdjustParent";

export default function Move(props) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    props.button.addEventListener('mousedown', e => {

        e.preventDefault();
        props.element.style.opacity = '50%'
        pos3 = e.clientX;

        if (props.element.offsetTop < 0) {
            props.element.style.top = 0
            closeDragElement()
            document.onmousemove = null;
            removeListeners()
        } else {
            pos4 = e.clientY

            closeDragElement()
            document.onmousemove = elementDrag;
        }
    })
    props.root.addEventListener('mouseup', () => {
        let i
        let repositioned = false
        for (i = 0; i < props.parents.length; i++) {
            let objective = document.getElementById(props.parents[i] + '-node')

            if (objective !== null) {
                AdjustChild({
                    child: props.element,
                    parent: objective,
                    triggerRemove: () => {
                        repositioned = true
                    }
                })
                // AdjustParent({
                //     parent: props.element,
                //     child: objective,
                //     triggerRemove: () => {
                //         repositioned = true
                //     }
                // })
            }

        }

        if (repositioned) {
            closeDragElement()
            document.onmousemove = null;
        }

        if (props.element.offsetTop < 0) {
            props.element.style.top = 0
            closeDragElement()
            document.onmousemove = null;
        } else
            document.onmousemove = null;

        removeListeners()
        props.element.style.opacity = '1'
        props.refreshLinks()
    })

    props.element.addEventListener('mouseup', e => {

        let i
        let repositioned = false
        for (i = 0; i < props.parents.length; i++) {
            let objective = document.getElementById(props.parents[i] + '-node')

            if (objective !== null) {
                AdjustChild({
                    child: props.element,
                    parent: objective,
                    triggerRemove: () => {
                        repositioned = true
                    }
                })
                // AdjustParent({
                //     parent: props.element,
                //     child: objective,
                //     triggerRemove: () => {
                //         repositioned = true
                //     }
                // })
            }

        }

        if (repositioned) {
            closeDragElement()
            document.onmousemove = null;

            let newEntry = props.entity

            newEntry.x = props.element.offsetLeft
            newEntry.y = props.element.offsetTop

            props.setEntity(newEntry)
        } else {
            if (props.element.offsetTop < 0) {
                props.element.style.top = 0
                closeDragElement()

                document.onmousemove = null;
            } else {
                document.onmousemove = null;
            }

            let newEntry = props.entity
            newEntry.x = props.element.offsetLeft
            newEntry.y = props.element.offsetTop

            props.setEntity(newEntry)
        }

        removeListeners()
        props.element.style.opacity = '50%'
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

    function removeListeners() {
        props.element.removeEventListener('mouseup', () => null)
        props.root.removeEventListener('mouseup', () => null)
        props.button.removeEventListener('mousedown', () => null)
    }
}

Move.propTypes = {
    parents: PropTypes.arrayOf(
        PropTypes.number
    ),
    entity: PropTypes.object,
    setEntity: PropTypes.func,
    button: PropTypes.object,
    element: PropTypes.object,
    root: PropTypes.object,
    refreshLinks: PropTypes.func,

}
