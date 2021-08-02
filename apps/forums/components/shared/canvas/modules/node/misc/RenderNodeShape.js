import Rect from "../templates/Rect";
import React from "react";
import Circle from "../templates/Circle";
import Triangle from "../templates/Triangle";
import NodePropsTemplate from "../../../templates/NodePropsTemplate";
import PropTypes from 'prop-types'


export default function RenderNodeShape(props){
    let shape = null
    switch (true){
        case (props.node.shape === 'circle' || props.node.shape === 'ellipse'):{
            shape = <Circle  {...props}/>
            break
        }
        case (props.node.shape === 'rect' || props.node.shape === 'square'):{
            shape = <Rect  {...props}/>
            break
        }
        default:
            break
    }
    return(
        shape
    )
}
RenderNodeShape.propTypes = {...NodePropsTemplate, ...{reference: PropTypes.object, linkable: PropTypes.bool}}