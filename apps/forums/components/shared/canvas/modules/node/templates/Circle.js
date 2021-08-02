import React from "react";
import Wrapper from "../modules/Wrapper";
import NodePropsTemplate from "../../../templates/NodePropsTemplate";
import PropTypes from 'prop-types'
import styles from "../../../styles/Node.module.css";

export default function Circle(props) {
    return (
        <g>

            <rect
                rx={'50%'} ry={'50%'} fill={'white'}
                width={props.node.dimensions.width}
                height={props.node.dimensions.height}
                x={props.node.placement.x} y={props.node.placement.y}
                stroke={props.node.color} strokeWidth={'2'}
            />
            <foreignObject
                x={props.node.placement.x} y={props.node.placement.y}
                width={props.node.dimensions.width}
                height={props.node.dimensions.height}
                className={props.linkable ? styles.pulse : ' '}
                style={{
                    boxShadow: '0 4px 30px rgb(22 33 74 / 5%)',
                    transition: 'box-shadow 150ms linear',
                    borderRadius: '50%'
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
Circle.propTypes = {...NodePropsTemplate, ...{reference: PropTypes.object}}