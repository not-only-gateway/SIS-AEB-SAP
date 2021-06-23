import styles from "../styles/NodeMisc.module.css";
import PropTypes from "prop-types";
import React from 'react'

export default function OpenNodeContainer(props){
   return(
       <div
           id={"node-" + props.entityKey}
           className={styles.openNodeContainer} style={{
           width: 'auto',
           border: props.isExtendedChild ? 'none' : (props.open ? '#0095ff 1px solid' : 'transparent 1px solid'),
           padding: props.open && !props.isExtendedChild ? '16px' : '0',
           background: props.open ? 'white' : undefined
       }}>
           {props.children}
       </div>
   )
}
OpenNodeContainer.propTypes={
    open: PropTypes.bool,
    isExtendedChild: PropTypes.bool,
    entityKey: PropTypes.any
}