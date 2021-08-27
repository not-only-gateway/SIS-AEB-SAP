import PropTypes from "prop-types";

export default {
    noSelect: PropTypes.bool,
    asModal:PropTypes.bool,
    createOptionLabel: PropTypes.string,
    title: PropTypes.string,
    searchFieldName: PropTypes.string,
    noSearchBar: PropTypes.bool,

    onlyCreate: PropTypes.bool,
    listKey: PropTypes.any,
    fetchSize: PropTypes.number,
    setEntity: PropTypes.any,
    createOption: PropTypes.bool,
    clickEvent: PropTypes.func,

    fetchUrl: PropTypes.string,
    fetchToken: PropTypes.string,
    fetchParams: PropTypes.object,

    scrollableElement: PropTypes.string,
    fields: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        type: PropTypes.oneOf(['bool', 'string', 'number', 'date']),
        maskStart: PropTypes.string,
        maskEnd: PropTypes.string,
        getColor: PropTypes.func,
        capitalize: PropTypes.bool,
        extraSize: PropTypes.number
    })),
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        icon: PropTypes.object,
        onClick: PropTypes.func,
        disabled: PropTypes.bool
    })),
    controlOptions: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        icon: PropTypes.object,
        onClick: PropTypes.func
    })),
    labels: PropTypes.arrayOf(PropTypes.any),
    noShadow: PropTypes.bool,

    triggerRefresh: PropTypes.bool,
    setRefreshed: PropTypes.func
}
