import PropTypes from "prop-types";
import NodeTemplate from "./NodeTemplate";

export default  {
    setOpenContext: PropTypes.func,
    openMenu: PropTypes.number,
    show: PropTypes.func,
    edit: PropTypes.func,
    handleLink: PropTypes.func,
    options: PropTypes.shape({edit: PropTypes.bool, move: PropTypes.bool, show: PropTypes.bool}),
    root: PropTypes.object,
    node: NodeTemplate,
    openOverview: PropTypes.func,
    selected: PropTypes.string,
    toBeLinked: PropTypes.object,
    asStep: PropTypes.bool,
    scale: PropTypes.number,
    setSelected: PropTypes.func,
    handleSizeChange: PropTypes.func
}