import PropTypes from "prop-types";

export default PropTypes.shape({
    denomination: PropTypes.string,
    type: PropTypes.string,
    parent: PropTypes.number,
    child: PropTypes.number
})