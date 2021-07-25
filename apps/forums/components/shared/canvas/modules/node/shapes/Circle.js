import NodeTemplate from "../../../templates/NodeTemplate";
import styles from "../../../styles/Node.module.css";
import React from "react";

export default function Circle(props) {
    return (
        <g>
            <circle
                r={'50'} fill={'white'}
                cx={props.node.placement.x} cy={props.node.placement.y} stroke={'#e0e0e0'}
            />
            <foreignObject
                x={props.node.placement.x - 50} y={props.node.placement.y - 50}
                width={'100'} height={'100'}>
                <div className={styles.nodeShapeContainer}>
                    {props.node.title}
                </div>
            </foreignObject>
        </g>
    )
}
Circle.propTypes = {
    node: NodeTemplate
}