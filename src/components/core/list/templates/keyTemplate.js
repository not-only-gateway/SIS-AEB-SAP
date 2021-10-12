import PropTypes from "prop-types";

export default PropTypes.shape({
    key: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['string', 'number', 'object', 'date', 'bool', 'array']),
    getColor: PropTypes.func,
    subfieldKey: PropTypes.string,
    visible: PropTypes.bool,
    maskStart: PropTypes.any,
    maskEnd: PropTypes.any,
    additionalWidth: PropTypes.string,
    subType:  PropTypes.oneOf(['string', 'number', 'object', 'date', 'bool']),
    query:  PropTypes.object,

})