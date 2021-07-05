import PropTypes from 'prop-types'

export default function AdjustChild(props) {
    // console.log(props.from.getBoundingClientRect().top)
    // console.log(props.to.getBoundingClientRect().top)
    // console.log(props.to.getBoundingClientRect().top)
    // console.log(props.from.getBoundingClientRect().top )
    if (props.from.getBoundingClientRect().top < props.to.getBoundingClientRect().top) {
        console.log(props.to.getBoundingClientRect().top)
        props.from.style.top = props.to.getBoundingClientRect().top - props.to.offsetHeight + 'px'
        console.log(props.from.getBoundingClientRect().top)
        props.triggerRemove()
        console.log('HERE')
    } else {
        console.log('ELSE')
    }
}

AdjustChild.propTypes = {
    from: PropTypes.object,
    to: PropTypes.object,
    triggerRemove: PropTypes.func
}