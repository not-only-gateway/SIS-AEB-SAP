import PropTypes from "prop-types";
import EntityTemplate from "./EntityTemplate";

export default {
    show: PropTypes.func,
    edit: PropTypes.func,
    triggerLink: PropTypes.func,
    options: PropTypes.shape({
        edit: PropTypes.bool,
        move: PropTypes.bool,
        show: PropTypes.bool
    }),
    endUpdate: PropTypes.func,
    updateEntity: PropTypes.func,
    triggerUpdate: PropTypes.bool,

    entities: PropTypes.arrayOf(
        EntityTemplate
    ),

    handleDelete: PropTypes.func,

    handleCreate: PropTypes.func,
    handleTriggerUpdate: PropTypes.func,
    root: PropTypes.object,
    scale: PropTypes.number,
    canvasRoot: PropTypes.object
}