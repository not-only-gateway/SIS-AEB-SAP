import PropTypes from "prop-types";

export default PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    color: PropTypes.string,
    placement: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number
    }),
    dimensions: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number
    })
})