import PropTypes from 'prop-types'

export default {
    target: PropTypes.shape({
        shape: PropTypes.string,
        id: PropTypes.string
    }),
    source: PropTypes.shape({
        shape: PropTypes.string,
        id: PropTypes.string
    }),
    connectionPointTarget: PropTypes.oneOf('a', 'b', 'c', 'd'),
    connectionPointSource: PropTypes.oneOf('a', 'b', 'c', 'd'),
}