import PropTypes from 'prop-types'

export default function Move(props) {
    let holding = false
    let i
    let limitTopOffset = undefined
    let limitBottomOffset = undefined
    let initialTopOffset = props.root.getBoundingClientRect().top - 20
    let initialLeftOffset = props.button.offsetWidth + Math.abs(props.element.offsetWidth) + props.button.offsetLeft

    if (props.element.offsetTop === 0) {
        initialLeftOffset = props.button.getBoundingClientRect().left + 20
        initialTopOffset = props.button.getBoundingClientRect().top + 20
    }


    props.button.addEventListener('mousedown', () => {
        holding = true
    })


    document.addEventListener("mousemove", handleMouseMove, false);
    document.addEventListener("mouseup", () => {
        if (props.element.offsetTop < 0)
            props.element.style.top = '20px';

        limitTopOffset = undefined
        limitBottomOffset = undefined

        for (i = 0; i < props.parents.length; i++) {
            const parent = document.getElementById(props.parents[i] + '-node')
            if (parent !== null && (limitTopOffset === undefined || parent.offsetTop > limitTopOffset)) {
                limitTopOffset = parent.offsetTop

            }
        }
        for (i = 0; i < props.children.length; i++) {
            const child = document.getElementById(props.children[i] + '-node')
            if (child !== null && (child.offsetTop < limitBottomOffset || limitBottomOffset === undefined))
                limitBottomOffset = child.offsetTop
        }
        if (limitTopOffset !== undefined && props.element.offsetTop <= (limitTopOffset)) {
            props.element.style.top = (limitTopOffset + props.element.offsetHeight / 2) + 'px'
        } else if (limitBottomOffset !== undefined && props.element.offsetTop >= limitBottomOffset)
            props.element.style.top = (limitBottomOffset - props.element.offsetHeight / 2)  + 'px'


        props.element.style.opacity = '1';
        props.element.style.border = '#e0e0e0 1px solid';
        holding = false

        props.refreshLinks()
    });


    function handleMouseMove(mouse) {

        if (holding) {
            props.refreshLinks()
            if (props.element.offsetTop < 0) {
                props.element.style.border = '#ff5555 1px solid';
                props.element.style.opacity = '.5';
            }
            if (props.element.offsetTop > 0) {
                props.element.style.opacity = '1';
                props.element.style.border = '#e0e0e0 1px solid';
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
    contentElement: PropTypes.object,
    entity: PropTypes.object,
    setEntity: PropTypes.func,
    button: PropTypes.object,
    element: PropTypes.object,
    root: PropTypes.object,
    refreshLinks: PropTypes.func,

}
