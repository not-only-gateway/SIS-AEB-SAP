import PropTypes from 'prop-types'

export default function AdjustParent(props) {

    if (props.parent.getBoundingClientRect().top < props.child.getBoundingClientRect().top) {

        props.parent.style.top = (props.child.getBoundingClientRect().top ) + 'px'

        props.triggerRemove()

    }
}

AdjustParent.propTypes = {
    parent: PropTypes.object,
    child: PropTypes.object,
    triggerRemove: PropTypes.func
}