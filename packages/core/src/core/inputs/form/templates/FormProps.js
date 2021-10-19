import PropTypes from "prop-types";
import React from "react";

export default {
    noAutoHeight: PropTypes.bool,
    noHeader: PropTypes.bool,
    returnButton: PropTypes.bool,
    label: PropTypes.string,
    entity: PropTypes.object,
    create: PropTypes.bool,
    forms: PropTypes.arrayOf(
        PropTypes.shape({
            child: PropTypes.node,
            title: PropTypes.string
        })
    ),
    handleSubmit: PropTypes.func,
    dependencies: PropTypes.shape({
        fields: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string,
            type: PropTypes.oneOf(['string', 'number', 'object', 'bool', 'date'])
        })),
        changed: PropTypes.bool
    }),
    handleClose: PropTypes.func
}
