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
        setChanged: PropTypes.func,
        disabled: PropTypes.bool,
        onCreate: PropTypes.bool,
        createContent: PropTypes.object,
        setOnCreate: PropTypes.func
    }
}