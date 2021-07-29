import React from "react";
import NodeContentWrapper from "../NodeContentWrapper";
import NodePropsTemplate from "../../../templates/NodePropsTemplate";
import PropTypes from 'prop-types'
import NodeConnection from "../NodeConnection";
import styles from "../../../styles/Node.module.css";

export default function Circle(props) {
    return (
        <g>

            <rect
                rx={'50%'} ry={'50%'} fill={'white'} width={props.node.shape.includes('ellipse') ? 150 : 100}
                height={100}
                x={props.node.placement.x} y={props.node.placement.y}
                stroke={props.node.color} strokeWidth={'2'}
            />
            <foreignObject
                x={props.node.placement.x} y={props.node.placement.y}
                width={props.node.shape.includes('ellipse') ? 150 : 100} height={'100'}
                className={props.linkable ? styles.pulse : ' '}
                style={{
                    boxShadow: '0 4px 30px rgb(22 33 74 / 5%)',
                    transition: 'box-shadow 150ms linear',
                    borderRadius: '50%'
                }}>
                <NodeContentWrapper {...props}>
                    {props.node.title}
                </NodeContentWrapper>
            </foreignObject>
        </g>
    )
}
Circle.propTypes = {...NodePropsTemplate, ...{reference: PropTypes.object}}