import PropTypes from 'prop-types'

export default function EndEvent(props) {
    props.setTimeout()
    props.setHolding()
    props.element.style.cursor = 'pointer'
    props.element.style.transform = 'scale(1)'
    props.element.style.opacity = '1'
    if (props.element.offsetTop < 0)
        props.element.style.top = '20px';

    if (props.limitTopOffset !== undefined && props.element.offsetTop <= (props.limitTopOffset)) {
        props.element.style.top = (props.limitTopOffset + props.element.offsetHeight / 2) + 'px'
    } else if (props.limitBottomOffset !== undefined && props.element.offsetTop >= props.limitBottomOffset)
        props.element.style.top = (props.limitBottomOffset - props.element.offsetHeight / 2) + 'px'


    // props.topElement.style.borderTop = 'transparent 2px solid'
    // props.bottomElement.style.borderTop = 'transparent 2px solid'
    // props.topElement.style.top = '0'
    // props.bottomElement.style.bottom = '0'

    props.refreshLinks()
}
EndEvent.propTypes = {
    // topElement: PropTypes.object,
    // bottomElement: PropTypes.object,
    element: PropTypes.object,
    refreshLinks: PropTypes.func,
    limitBottomOffset: PropTypes.number,
    limitTopOffset: PropTypes.number,
    setTimeout: PropTypes.func,
    setHolding: PropTypes.func
}