import PropTypes from "prop-types";

export default PropTypes.arrayOf(
    PropTypes.shape({
        parent: PropTypes.number,
        child: PropTypes.number,
        strong: PropTypes.bool,
        description: PropTypes.string
    })
)