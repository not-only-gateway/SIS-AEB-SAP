import adjustLine from "./AdjustLine";
import LinkTemplate from "../../templates/LinkTemplate";
import PropTypes from 'prop-types'

export default function RefreshLink(props) {
    let i
    for (i = 0; i < props.children.length; i++) {
        const child = document.getElementById(props.children[i].child + '-node')
        const line = document.getElementById(props.entityKey + '-line-' + props.children[i].child)
        const lineIndicator = document.getElementById(props.entityKey + '-line-indicator-objective-' + props.children[i].child)
        const lineContent = document.getElementById(props.entityKey + '-line-content-' + props.children[i].child)

        if (child !== null && lineContent !== null && lineIndicator !== null)
            adjustLine({
                lineContent: lineContent,
                from: child,
                to: props.element,
                line: line,
                lineObjective: lineIndicator
            })
    }
    for (i = 0; i < props.parents.length; i++) {
        const parent = document.getElementById(props.parents[i].parent + '-node')
        const line = document.getElementById(props.parents[i].parent + '-line-' + props.entityKey)
        const lineIndicator = document.getElementById(props.parents[i].parent + '-line-indicator-objective-' + props.entityKey)
        const lineContent = document.getElementById(props.parents[i].parent + '-line-content-' + props.entityKey)

        if (parent !== null && lineContent !== null && lineIndicator !== null)
            adjustLine({
                lineContent: lineContent,
                from: props.element,
                to: parent,
                line: line,
                lineObjective: lineIndicator
            })
    }
}
RefreshLink.propTypes = {
    children: PropTypes.arrayOf(
        LinkTemplate
    ),
    parents: PropTypes.arrayOf(
        LinkTemplate
    ),
    entityKey: PropTypes.number,
    element: PropTypes.object
}