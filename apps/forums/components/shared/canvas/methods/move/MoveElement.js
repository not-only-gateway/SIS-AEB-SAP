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

                // topElement: props.topElement,
                // bottomElement: props.bottomElement,

                element: props.element,
                refreshLinks: props.refreshLinks,
                limitBottomOffset: limitBottomOffset,
                limitTopOffset: limitTopOffset,
                limitBottom: limitBottom,
                limitTop: limitTop,
                color: props.color,
                parents: props.parents,

                getLinkParent: props.getLinkParent,
                children: props.children,
                getLinkChild: props.getLinkChild
            })
        }, 1000)

    })


    document.addEventListener("mousemove", handleMouseMove, false);
    document.addEventListener("mouseup", () => {
        if (timeout)
            clearTimeout(timeout)

        if(timeoutAnim)
            clearTimeout(timeoutAnim)
        props.element.style.opacity = '1';
        props.element.style.boxShadow = 'none'
        EndEvent({
            // bottomElement: props.bottomElement,
            // topElement: props.topElement,
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
                props.element.style.boxShadow = 'none'
                props.element.style.opacity = '.5';

            } else {
                if(props.color !== undefined && props.color !== null) {
                    props.element.style.boxShadow = '0 0 10px .1px ' + props.color;
                }
                else
                    props.element.style.boxShadow = '0 0 10px .1px #0095ff';
                props.element.style.opacity = '1';
            }

            props.element.style.left = (mouse.clientX - props.element.offsetWidth / 2) + "px";
            props.element.style.top = (mouse.clientY - (props.root.offsetTop + props.element.offsetHeight)) + "px";
        }

    }
}

Move.propTypes = {

    parents: PropTypes.arrayOf(
        PropTypes.object
    ),
    children: PropTypes.arrayOf(
        PropTypes.object
    ),
    element: PropTypes.object,
    refreshLinks: PropTypes.func,
    getLinkParent: PropTypes.func,
    root: PropTypes.object,
    color: PropTypes.string,
    getLinkChild: PropTypes.func,
}
