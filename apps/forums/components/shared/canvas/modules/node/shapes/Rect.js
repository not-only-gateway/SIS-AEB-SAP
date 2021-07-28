import styles from "../../../styles/Node.module.css";
import React from "react";
import PropTypes from 'prop-types'
import NodePropsTemplate from "../../../templates/NodePropsTemplate";
import NodeContentWrapper from "../NodeContentWrapper";
import NodeConnection from "../NodeConnection";

export default function Rect(props) {
    return (
        <g>

            <rect
                rx={props.node.shape.includes('rounded') ? '5' : undefined}
                ry={props.node.shape.includes('rounded') ? '5' : undefined}
                width={'250'} height={'90'} fill={'white'} strokeWidth={'2'}
                x={props.node.placement.x} y={props.node.placement.y}
                stroke={props.node.color}
            />
            <foreignObject
                x={props.node.placement.x} y={props.node.placement.y}
                width={'250'} height={'90'}
                style={{
                    boxShadow: props.selected === props.node.id ? ('0 0 10px ' + props.node.color) : '0 4px 30px rgb(22 33 74 / 5%)',
                    transition: 'box-shadow 150ms linear',
                    borderRadius: props.node.shape.includes('rounded') ? '5px' : undefined
                }}
            >
                <NodeContentWrapper {...props}>
                    <div className={styles.header}>
                        {props.node.title}
                    </div>
                    <div className={styles.body}>
                        {props.node.description}
                    </div>
                </NodeContentWrapper>
            </foreignObject>
        </g>
    )
}
Rect.propTypes = {...NodePropsTemplate, ...{reference: PropTypes.object}}