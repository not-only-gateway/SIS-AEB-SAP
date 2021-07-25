import NodeTemplate from "../../../templates/NodeTemplate";
import Rect from "./Rect";
import React from "react";
import Circle from "./Circle";
import Triangle from "./Triangle";
import Square from "./Square";

export default function RenderNodeShape(props){
    let shape = null
    switch (true){
        case props.node.shape === 'circle':{
            shape = <Circle node={props.node}/>
            break
        }
        case props.node.shape === 'rect':{
            shape = <Rect node={props.node}/>
            break
        }
        case props.node.shape === 'triangle':{
            shape = <Triangle node={props.node}/>
            break
        }
        case props.node.shape === 'ellipsis':{
            shape = <Circle node={props.node}/>
            break
        }
        case props.node.shape === 'diamond':{
            shape = <Circle node={props.node}/>
            break
        }
        case props.node.shape === 'square':{
            shape = <Square node={props.node}/>
            break
        }
        default:
            break
    }
    return(
        shape
    )
}
RenderNodeShape.propTypes = {
    node: NodeTemplate
}