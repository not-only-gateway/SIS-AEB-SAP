import PropTypes from 'prop-types'

export default function handleObjectChange(props){
    props.setData(prevState => ({
        ...prevState,
        [props.event.name]: props.event.value
    }))
}
handleObjectChange.propTypes={
    event: PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.any
    }),
    setData: PropTypes.func
}