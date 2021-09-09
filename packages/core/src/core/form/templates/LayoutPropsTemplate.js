import PropTypes from "prop-types";

export default {
    noAutoHeight: PropTypes.bool,
    noHeader: PropTypes.bool,
        returnButton: PropTypes.bool,
    onlyEdit: PropTypes.bool,
    label: PropTypes.string,
    information: PropTypes.arrayOf(
    PropTypes.shape({
        label: PropTypes.string,
        description: PropTypes.shape
    })
),

    entity: PropTypes.object,

    // OVERVIEW
    fields: PropTypes.arrayOf(
    PropTypes.shape({
        field: PropTypes.string,
        label: PropTypes.string,
        type: PropTypes.oneOf(['bool', 'image', 'string', 'object', 'date']),
        renderObjectField: PropTypes.func
    })
),
    // OVERVIEW

    // HISTORY

    versionControl: PropTypes.shape({
    exists: PropTypes.bool,
    entityKey: PropTypes.any,
    fetchUrl: PropTypes.string,
    fetchSize: PropTypes.string,
    fetchToken: PropTypes.string,
    setVersion: PropTypes.func,
    entityID: PropTypes.number,
}),
    // HISTORY

    // FORM LAYOUT
    create: PropTypes.bool,
    forms: PropTypes.arrayOf(
    PropTypes.shape({
        child: PropTypes.object,
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
    // FORM LAYOUT
}