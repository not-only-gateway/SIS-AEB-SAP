import adjustLine from "../../methods/AdjustLine";
import PropTypes from "prop-types";

export default function RefreshLinks(props) {

    let i

    for (i = 0; i < props.parents.length; i++) {
        let line = document.getElementById(props.getLinkParent(props.parents[i]) + '-line-' + props.entityKey)
        let objective = document.getElementById(props.getLinkParent(props.parents[i]) + '-node')
        let lineObjective = document.getElementById(props.getLinkParent(props.parents[i]) + '-line-indicator-objective-' + props.entityKey)

        let lineContent = document.getElementById(props.getLinkParent(props.parents[i]) + '-line-content-' + props.entityKey)
        if (objective !== null && props.ref.current !== null)
            adjustLine({
                lineContent: lineContent,
                from: props.ref.current,
                to: objective,
                line: line,
                lineObjective: lineObjective,
            })
    }

}

RefreshLinks.propTypes = {
    parents: PropTypes.array,
    ref: PropTypes.object,
    entityKey: PropTypes.any,
    getLinkParent: PropTypes.func,
}