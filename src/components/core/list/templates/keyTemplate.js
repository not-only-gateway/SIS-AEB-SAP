import PropTypes from "prop-types";

export default PropTypes.shape({
    key: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['string', 'number', 'object', 'date', 'bool']),
    getColor: PropTypes.func,
    subfieldKey: PropTypes.string,
    visible: PropTypes.bool,
    maskStart: PropTypes.any,
    maskEnd: PropTypes.any,
    additionalWidth: PropTypes.string
})