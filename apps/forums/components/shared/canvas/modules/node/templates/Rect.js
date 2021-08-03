import styles from "../../../styles/Node.module.css";
import React from "react";
import PropTypes from 'prop-types'
import NodePropsTemplate from "../../../templates/NodePropsTemplate";
import Wrapper from "../modules/Wrapper";

export default function Rect(props) {
    return (
        <rect
            rx={props.node.styling.border}
            ry={props.node.styling.border}
            width={props.node.dimensions.width}
            height={props.node.dimensions.height}
            fill={'white'} strokeWidth={'2'}
            x={0} y={0}
            stroke={props.node.styling.color}
        />
    )
}
Rect.propTypes = {...NodePropsTemplate, ...{reference: PropTypes.object}}