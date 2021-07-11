import PropTypes from "prop-types";

export default PropTypes.shape({
        parent: PropTypes.number,
        child: PropTypes.number,
        strong: PropTypes.bool,
        description: PropTypes.string
    })