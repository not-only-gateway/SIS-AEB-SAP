import PropTypes from 'prop-types'
import React, {useEffect, useState} from "react";
import NodeTemplate from "../../templates/NodeTemplate";
import {
    ArrowDownward,
    ArrowDownwardRounded,
    ArrowDropDownRounded,
    CloseRounded,
    DragIndicatorRounded, LinkRounded
} from "@material-ui/icons";
import styles from '../../styles/NodeMenu.module.css'
import LinkTemplate from "../../templates/LinkTemplate";

export default function NodeMenu(props) {

    return (
        <div style={{
            opacity: (props.selected === props.node.id || props.linkable) ? '1' : '0',
            border: (props.node.color + ' 2px dashed'),
            borderRadius: props.node.shape === 'circle' ? '50%' : '5px',
            width: props.nodeRef !== undefined ? (props.nodeRef.offsetWidth + 20) + 'px' : 'unset',
            height: props.nodeRef !== undefined ? (props.nodeRef.offsetHeight + 20) + 'px' : 'unset'
        }} className={styles.selectedHighlight} id={`${props.node.id}-selected`}/>
    )
}
NodeMenu.propTypes = {
    selected: PropTypes.string,
    linkable: PropTypes.bool,
    nodeRef: PropTypes.object,
    node: NodeTemplate,
}