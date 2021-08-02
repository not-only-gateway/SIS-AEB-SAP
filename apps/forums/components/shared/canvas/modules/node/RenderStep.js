import NodeContentWrapper from "./NodeContentWrapper";
import styles from "../../styles/Node.module.css";
import React, {useState} from "react";

export default function RenderStep(props) {
    const [fill, setFill] = useState('white')
    return (
        <g>

            <rect
                rx={'5'}
                ry={'5'}
                width={100}
                height={40} fill={fill}
                strokeWidth={'2'}
                x={props.node.placement.x} y={props.node.placement.y}
                stroke={props.node.color}
                style={{transition: 'fill 150ms linear'}}
            />
            <foreignObject
                x={props.node.placement.x}
                y={props.node.placement.y}
                width={100}
                height={40}
                style={{
                    boxShadow: '0 4px 30px rgb(22 33 74 / 5%)',
                    transition: 'box-shadow 150ms linear',
                    borderRadius: '5px'
                }}
            >
                <NodeContentWrapper {...props}>
                    <input value={props.node.title} className={styles.stepInput}
                           onFocus={() => setFill('#E8F0FE')}
                           onBlur={() => setFill('white')}/>
                </NodeContentWrapper>
            </foreignObject>
        </g>
    )
}
