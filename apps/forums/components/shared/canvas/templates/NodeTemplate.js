import PropTypes from "prop-types";

export default  PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    color: PropTypes.string,
    placement: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number
    })
})