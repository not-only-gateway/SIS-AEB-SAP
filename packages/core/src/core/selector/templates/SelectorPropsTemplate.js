import ListPropsTemplate from "../../shared/ListPropsTemplate";
import PropTypes from "prop-types";

export default {
    ...ListPropsTemplate,
    ...{
        width: PropTypes.string,
        handleChange: PropTypes.func,
        selected: PropTypes.any,
        label: PropTypes.string,
        getEntityKey: PropTypes.func,
        labels: PropTypes.array,
        required: PropTypes.bool,
        disabled: PropTypes.bool,
        createOption: PropTypes.bool,
        handleCreate: PropTypes.func,
        setOnCreate: PropTypes.func
    }
}