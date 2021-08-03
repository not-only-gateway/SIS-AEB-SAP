import React from "react";
import Wrapper from "../modules/Wrapper";
import NodePropsTemplate from "../../../templates/NodePropsTemplate";
import PropTypes from 'prop-types'
import styles from "../../../styles/Node.module.css";

export default function Circle(props) {
    return (

            <rect
                rx={'50%'} ry={'50%'} fill={'white'}
                width={props.node.dimensions.width}
                height={props.node.dimensions.height}
                x={0} y={0}
                stroke={props.node.styling.color} strokeWidth={'2'}
            />

    )
}
Circle.propTypes = {...NodePropsTemplate, ...{reference: PropTypes.object}}