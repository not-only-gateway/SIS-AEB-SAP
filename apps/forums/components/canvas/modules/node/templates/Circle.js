import React from "react";
import NodePropsTemplate from "../../../templates/NodePropsTemplate";
import PropTypes from 'prop-types'

export default function Circle(props) {
    return (

            <rect
                rx={'50%'} ry={'50%'} fill={'white'}
                width={props.node.dimensions.width}
                height={props.node.dimensions.height}
                x={0} y={0} filter={ 'drop-shadow(0 0.2rem 0.25rem rgba(0, 0, 0, 0.08))'}
                stroke={props.node.styling.color} strokeWidth={props.node.styling.borderWidth}
            />

    )
}
Circle.propTypes = {...NodePropsTemplate, ...{reference: PropTypes.object}}