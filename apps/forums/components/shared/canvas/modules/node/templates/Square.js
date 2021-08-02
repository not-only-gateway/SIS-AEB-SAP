import styles from "../../../styles/Node.module.css";
import React from "react";
import NodePropsTemplate from "../../../templates/NodePropsTemplate";
import PropTypes from 'prop-types'
import Wrapper from "../modules/Wrapper";

export default function Square(props) {
    return (
        <g>

            <rect
                rx={props.node.shape.includes('rounded') ? '5' : undefined}
                ry={props.node.shape.includes('rounded') ? '5' : undefined}

                width={props.node.dimensions.width}
                height={props.node.dimensions.height}
                fill={'white'} strokeWidth={'2'}
                x={props.node.placement.x} y={props.node.placement.y} stroke={props.node.color}
            />
            <foreignObject
                x={props.node.placement.x} y={props.node.placement.y}
                width={props.node.dimensions.width}
                height={props.node.dimensions.height}
                style={{
                    boxShadow: '0 4px 30px rgb(22 33 74 / 5%)',
                    transition: 'box-shadow 150ms linear',
                    borderRadius: props.node.shape.includes('rounded') ? '5px' : undefined
                }}>
                <Wrapper {...props}>
                    <div className={styles.header}>
                        {props.node.title}
                    </div>
                </Wrapper>
            </foreignObject>
        </g>
    )
}
Square.propTypes = {...NodePropsTemplate, ...{reference: PropTypes.object}}