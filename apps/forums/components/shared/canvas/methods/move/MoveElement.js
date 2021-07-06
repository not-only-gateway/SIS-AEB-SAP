import PropTypes from 'prop-types'
import EndEvent from "./EndEvent";
import StartEvent from "./StartEvent";

export default function Move(props) {
    let holding = false
    let i
    let limitTopOffset = undefined
    let limitBottomOffset = undefined

    let limitTop = undefined
    let limitBottom = undefined
    let initialTopOffset = 0
    let initialLeftOffset = 0
    let timeout = undefined
    if (props.element.offsetTop === 0 && props.element.offsetLeft === 0) {
        initialTopOffset = props.element.getBoundingClientRect().top + props.element.offsetHeight / 2
        initialLeftOffset = props.element.offsetWidth / 2
    } else {
        initialTopOffset = props.element.getBoundingClientRect().top - props.element.offsetHeight
        initialLeftOffset = props.element.offsetWidth / 2
    }

    props.element.addEventListener('mousedown', () => {
        timeout = setTimeout(() => {
            // if (holding)
                StartEvent({
                    setHolding: () => {
                        holding = true
                    },
                    setLimitBottom: e => limitBottom = e,
                    setLimitBottomOffset: e => limitBottomOffset = e,
                    setLimitTop: e => limitTop = e,
                    setLimitTopOffset: e => limitTopOffset = e,

                    topElement: props.topElement,
                    bottomElement: props.bottomElement,

                    element: props.element,
                    refreshLinks: props.refreshLinks,
                    limitBottomOffset: limitBottomOffset,
                    limitTopOffset: limitTopOffset,
                    limitBottom: limitBottom,
                    limitTop: limitTop,

                    parents: props.parents,
                    children: props.children
                })
        }, 1000)

    })



    document.addEventListener("mousemove", handleMouseMove, false);
    document.addEventListener("mouseup", () => {
        if (timeout)
            clearTimeout(timeout)
        EndEvent({
            bottomElement: props.bottomElement,
            topElement: props.topElement,
            setTimeout: () => {
                timeout = undefined
            },
            element: props.element,
            refreshLinks: props.refreshLinks,
            limitBottomOffset: limitBottomOffset,
            limitTopOffset: limitTopOffset,
            setHolding: () => {
                holding = false
            }
        })
    });


    function handleMouseMove(mouse) {

        if (holding) {
            props.refreshLinks()
            if (props.element.offsetTop < 0 || (limitTopOffset !== undefined && props.element.offsetTop <= (limitTopOffset)) || (limitBottomOffset !== undefined && props.element.offsetTop >= limitBottomOffset)) {
                props.element.style.border = '#ff5555 2px solid';
            } else {
                props.element.style.border = '#0095ff 2px solid';
            }

            props.element.style.left = (mouse.clientX - initialLeftOffset) + "px";
            props.element.style.top = (mouse.clientY - initialTopOffset) + "px";
        }

    }
}

Move.propTypes = {

    parents: PropTypes.arrayOf(
        PropTypes.number
    ),
    children: PropTypes.arrayOf(
        PropTypes.number
    ),
    element: PropTypes.object,
    refreshLinks: PropTypes.func,
    topElement: PropTypes.object,
    bottomElement: PropTypes.object
}
