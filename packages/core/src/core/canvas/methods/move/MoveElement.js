import PropTypes from 'prop-types'
import EndEvent from "./EndEvent";
import StartEvent from "./StartEvent";

export default function Move(props) {
    let holding = false
    let limitTopOffset = undefined
    let limitBottomOffset = undefined
    let limitTop = undefined
    let limitBottom = undefined
    let timeout = undefined
    let timeoutAnim = undefined


    props.element.addEventListener('mousedown', () => {
        timeoutAnim = setTimeout(() => {
            props.element.style.transform = 'scale(1.075)'
            props.element.style.background = '#E8F0FE'
        }, 500)


        timeout = setTimeout(() => {
            clearTimeout(timeoutAnim)
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

        if(timeoutAnim)
            clearTimeout(timeoutAnim)
        props.element.style.background = '#f4f5fa'
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
        if(props.children.length > 0|| props.parents.length > 0)
            props.refreshLinks()
        if (holding) {

            if (props.element.offsetTop < 0 || (limitTopOffset !== undefined && props.element.offsetTop <= (limitTopOffset)) || (limitBottomOffset !== undefined && props.element.offsetTop >= limitBottomOffset)) {
                props.element.style.border = '#ff5555 2px solid';
            } else {
                props.element.style.border = '#0095ff 2px solid';
            }

            props.element.style.left = (mouse.clientX - props.element.offsetWidth / 2) + "px";
            props.element.style.top = (mouse.clientY - (props.root.offsetTop + props.element.offsetHeight)) + "px";
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
    bottomElement: PropTypes.object,
    root: PropTypes.object
}
