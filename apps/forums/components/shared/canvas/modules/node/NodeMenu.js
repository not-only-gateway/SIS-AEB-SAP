import PropTypes from 'prop-types'
import React, {useEffect, useState} from "react";
import NodeTemplate from "../../templates/NodeTemplate";
import styles from '../../styles/NodeMenu.module.css'


export default function NodeMenu(props) {

    return (
        <div style={{
            opacity: (props.selected === props.node.id || props.linkable) ? '1' : '0',
            border: (props.node.color + ' 2px dashed'),
            borderRadius: '5px',
            width: props.nodeRef !== undefined ? (props.nodeRef.offsetWidth +5.5) + 'px' : 'unset',
            height: props.nodeRef !== undefined ? (props.nodeRef.offsetHeight + 5.5) + 'px' : 'unset'
        }} className={styles.selectedHighlight} id={`${props.node.id}-selected`}/>
    )
}
NodeMenu.propTypes = {
    selected: PropTypes.string,
    linkable: PropTypes.bool,
    nodeRef: PropTypes.object,
    node: NodeTemplate,
}