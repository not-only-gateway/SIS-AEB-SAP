import PropTypes from 'prop-types'
import EndEvent from "./EndEvent";
import StartEvent from "./StartEvent";

export default function Move(props) {
    let holding = false
    let limitTopOffset = undefined
    let limitBottomOffset = undefined
    let limitTop = undefined
    let limitBottom = undefined

    props.element.addEventListener('mousedown', (mouse) => {
        if(typeof mouse === 'object' && mouse.button === 0)
        StartEvent({
            setHolding: () => {
                holding = true
            },
            setLimitBottom: e => limitBottom = e,
            setLimitBottomOffset: e => limitBottomOffset = e,
            setLimitTop: e => limitTop = e,
            setLimitTopOffset: e => limitTopOffset = e,
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
    })

    document.addEventListener("mousemove", handleMouseMove, false);
    document.addEventListener("mouseup", () => {
        props.element.style.opacity = '1';
        props.element.style.boxShadow = 'none'
        limitBottom = undefined
        limitTop = undefined
        EndEvent({

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
        if (props.children.length > 0 || props.parents.length > 0)
            props.refreshLinks()
        if (holding) {

            if (props.element.offsetTop < 0 || (limitTopOffset !== undefined && props.element.offsetTop <= (limitTopOffset)) || (limitBottomOffset !== undefined && props.element.offsetTop >= limitBottomOffset)) {
                props.element.style.boxShadow = 'none'
                props.element.style.opacity = '.5';

            } else {
                if (props.color !== undefined && props.color !== null) {
                    props.element.style.boxShadow = '0 0 10px .1px ' + props.color;
                } else
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
    getLinkChild: PropTypes.func
}
