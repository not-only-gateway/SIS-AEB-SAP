import PropTypes from 'prop-types'

export default function AdjustChild(props) {

    if (props.child.getBoundingClientRect().top < props.parent.getBoundingClientRect().top) {

        props.child.style.top = (props.parent.getBoundingClientRect().top) + 'px'

        props.triggerRemove()

    }
}

AdjustChild.propTypes = {
    child: PropTypes.object,
    parent: PropTypes.object,
    triggerRemove: PropTypes.func
}