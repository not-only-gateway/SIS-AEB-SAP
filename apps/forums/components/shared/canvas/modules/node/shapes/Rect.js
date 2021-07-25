import NodeTemplate from "../../../templates/NodeTemplate";
import styles from "../../../styles/Node.module.css";
import React from "react";

export default function Rect(props) {
    return (
        <g>
            <rect rx={'5'} ry={'5'} width={'250'} height={'90'} fill={'white'} strokeWidth={'1'}
                  x={props.node.placement.x} y={props.node.placement.y} stroke={'#e0e0e0'}
            />
            <foreignObject x={props.node.placement.x} y={props.node.placement.y}
                           width={'250'} height={'90'}>
                <div className={styles.nodeShapeContainer}>
                    <div className={styles.header}>
                        {props.node.title}
                        <div className={styles.colorIndicator} style={{
                            background: props.node.color
                        }}/>
                    </div>
                    <div className={styles.body}>
                        {props.node.description}
                    </div>
                </div>
            </foreignObject>
        </g>
    )
}
Rect.propTypes = {
    node: NodeTemplate
}