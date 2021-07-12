import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import CanvasContextMenu from "../modules/canvas/CanvasContextMenu";

export default function useCanvas(props) {

}

useCanvas.propTypes = {
    handlePrint: PropTypes.func,
    contextMenuRef: PropTypes.object,
    setOpenMenu: PropTypes.func,
    root: PropTypes.object,

    handleCreate: PropTypes.func,
    handleTriggerUpdate: PropTypes.func,

    options: PropTypes.shape({
        edit: PropTypes.bool,
        move: PropTypes.bool,
        show: PropTypes.bool
    }),

}