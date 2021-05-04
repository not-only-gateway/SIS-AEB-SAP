import PropTypes from 'prop-types'

export default function handleObjectChange(props){
    props.setData(prevState => ({
        ...prevState,
        [props.event.name]: props.event.value
    }))
}
handleObjectChange.propTypes={
    event: PropTypes.object,
    setData: PropTypes.func
}