import PropTypes from "prop-types";
import LinkTemplate from "./LinkTemplate";

export default PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    highlight_color: PropTypes.string,
    parents: LinkTemplate,
    children: LinkTemplate
})