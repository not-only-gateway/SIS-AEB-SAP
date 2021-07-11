import PropTypes, {func} from 'prop-types'
import StartEvent from "./StartEvent";
import LinkTemplate from "../../templates/LinkTemplate";

import RefreshLink from "../line/RefreshLink";

export default function Move(props) {

    let limitTopOffset = undefined
    let limitBottomOffset = undefined

    props.element.addEventListener('dragstart', (event) => {
        event.dataTransfer.effectAllowed = "copy";
        if (typeof event === 'object' && event.button === 0)
            StartEvent({
                setLimitBottomOffset: e => {
                    if (e < limitBottomOffset || limitBottomOffset === undefined)
                        limitBottomOffset = e
                },
                setLimitTopOffset: e => {
                    if (e > limitTopOffset || limitTopOffset === undefined)
                        limitTopOffset = e
                },
                element: props.element,
                limitBottomOffset: limitBottomOffset,
                limitTopOffset: limitTopOffset,
                color: props.color,
                parents: props.parents,

                children: props.children,
            })
        if (limitBottomOffset !== undefined)
            limitBottomOffset = limitBottomOffset - props.element.offsetHeight / 2
        if (limitTopOffset !== undefined)
            limitTopOffset = limitTopOffset + props.element.offsetHeight / 2
    })

    document.addEventListener("dragover", function (event) {
        event.preventDefault();
    }, false);

    props.element.addEventListener("dragend", event => {
        console.log(limitBottomOffset)
        console.log(limitTopOffset)
        event.preventDefault();

        props.element.style.opacity = '1';
        props.element.style.boxShadow = 'none'

        moveElement(event.clientX, event.clientY)
        handleOverflow(event.clientX, event.clientY)

        if (props.element.offsetTop < 0)
            props.element.style.top = '20px';
        if (props.element.offsetLeft < 0)
            props.element.style.left = '20px';
    });


    function handleOverflow(x, y) {
        if (x < props.root.scrollWidth || y < props.root.scrollHeight)
            console.log('OVERFLOWING')
    }

    function moveElement(x, y) {
        let unscaledX = (x / props.scale - (props.root.offsetLeft + (props.element.offsetWidth / props.scale) / 2))
        let unscaledY

        if (props.scale !== 1)
            unscaledY = (y / props.scale - (props.root.offsetTop + (props.element.offsetHeight * 1.5 / props.scale)))
        else
            unscaledY = (y / props.scale - (props.root.offsetTop + (props.element.offsetHeight * 0.5 / props.scale)))


        props.element.style.top = Math.ceil((unscaledY) / 30) * 30 + 'px'
        props.element.style.left = Math.ceil((unscaledX) / 30) * 30 + 'px'


        if (limitTopOffset !== undefined) {
            if (limitTopOffset > props.element.offsetTop)
                props.element.style.top = Math.ceil((limitTopOffset) / 30) * 30 + "px";
            limitTopOffset = undefined
        }
        if (limitBottomOffset !== undefined) {
            if (limitBottomOffset < props.element.offsetTop)
                props.element.style.top = Math.floor((limitBottomOffset) / 30) * 30 + "px";
            limitBottomOffset = undefined
        }

    }
}

Move.propTypes = {

    parents: PropTypes.arrayOf(
        LinkTemplate
    ),
    children: PropTypes.arrayOf(
        LinkTemplate
    ),
    element: PropTypes.object,
    root: PropTypes.object,
    color: PropTypes.string,
    canvasRoot: PropTypes.object,
    entityKey: PropTypes.number
}
