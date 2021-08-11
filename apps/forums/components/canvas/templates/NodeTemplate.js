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
    contentStyling: PropTypes.shape({
        fontFamily: PropTypes.string,
        fontSize: PropTypes.number,
        bold: PropTypes.bool,
        italic: PropTypes.bool,
        textDecoration: PropTypes.string,
        color: PropTypes.string,
        textAlign: PropTypes.string,
        textOrientation: PropTypes.string
    }),
    styling: PropTypes.shape({
        border: PropTypes.any,
        color: PropTypes.any,
        borderWidth: PropTypes.any,
        borderStyling: PropTypes.shape({type: PropTypes.oneOf(['dashed', 'solid']), dashArray: PropTypes.number}),
        skew: PropTypes.any
    })
})