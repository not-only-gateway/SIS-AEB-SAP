import NodeTemplate from "../../../templates/NodeTemplate";
import styles from "../../../styles/Node.module.css";
import React from "react";

export default function Square(props) {
    return (
        <g>
            <rect rx={'5'} ry={'5'} width={'200'} height={'200'} fill={'white'} strokeWidth={'1'}
                  x={props.node.placement.x} y={props.node.placement.y} stroke={'#e0e0e0'}
            />
            <foreignObject x={props.node.placement.x} y={props.node.placement.y}
                           width={'250'} height={'110'}>
                <div style={{background: 'transparent', width: '100%', height: '100%', padding: '8px'}}>
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
Square.propTypes = {
    node: NodeTemplate
}