import PropTypes from "prop-types";

export default PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    file: PropTypes.object,

    placement: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number
    }),
    dimensions: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number
    }),
    styling: PropTypes.shape({
            border: PropTypes.number,
            color: PropTypes.string
        })
})