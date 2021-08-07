import React from "react";
import PropTypes from 'prop-types'
import NodePropsTemplate from "../../../templates/NodePropsTemplate";

export default function Rect(props) {
    return (
        <rect
            rx={props.node.styling.border}
            ry={props.node.styling.border}
            width={props.node.dimensions.width}
            height={props.node.dimensions.height}
            fill={'white'} strokeWidth={'2'} filter={ 'drop-shadow(0 3.2px 4px rgba(0, 0, 0, 0.08))'}
            x={0} y={0}  transform={`skewX(${props.node.styling.skew})`}
            stroke={props.node.styling.color}
        />
    )
}
Rect.propTypes = {...NodePropsTemplate, ...{reference: PropTypes.object}}