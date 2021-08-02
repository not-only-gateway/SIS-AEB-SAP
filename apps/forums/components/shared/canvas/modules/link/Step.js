import RenderStep from "../node/RenderStep";
import React, {useRef} from "react";
import styles from "../../styles/Node.module.css";

export default function Step(props){
    const ref = useRef()
    return(
        <svg
            id={props.node.id + '-step'}
            style={{
                position: 'relative'
            }}
            className={styles.entityContainer}
            ref={ref}
        >
            <RenderStep {...props} reference={ref.current}/>
        </svg>
    )
}