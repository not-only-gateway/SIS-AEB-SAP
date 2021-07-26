import PropTypes from 'prop-types'
import React from "react";
import NodeTemplate from "../../templates/NodeTemplate";


export default function SelectedMenu(props) {
    return (
        <rect
            visibility={props.selected === props.node.id ? 'visible' : 'hidden'}
            width={props.nodeRef !== undefined ? (props.nodeRef.firstChild.childNodes[1].getBBox().width + 20) : undefined}
            height={props.nodeRef !== undefined ? (props.nodeRef.firstChild.childNodes[1].getBBox().height + 20) : undefined}
            stroke={props.node.color} fill={'transparent'}
            strokeDasharray={'5,5'} strokeWidth={'2'} strokeOpacity={'.5'}
            x={props.node.placement.x - 10} y={props.node.placement.y - 10} style={{position: 'absolute'}}
        />
    )
}
SelectedMenu.propTypes = {
    selected: PropTypes.string,
    linkable: PropTypes.bool,
    nodeRef: PropTypes.object,
    node: NodeTemplate,
}