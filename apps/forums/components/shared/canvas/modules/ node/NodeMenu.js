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
            opacity: (props.selected === props.node.id || (props.toBeLinked !== null && props.toBeLinked?.id !== props.node.id)) ? '1' : '0',
            border: (props.node.color + ' 2px dashed'),
            borderRadius: props.node.shape === 'circle' ? '50%' : '5px',
            width: props.nodeRef !== undefined ? (props.nodeRef.offsetWidth + 20) + 'px' : 'unset',
            height: props.nodeRef !== undefined ? (props.nodeRef.offsetHeight + 20) + 'px' : 'unset'
        }} className={styles.selectedHighlight} id={`${props.node.id}-selected`}>

            <button id={`${props.node.id}-left`} className={styles.indicator}
                    disabled={!(props.selected === props.node.id || (props.toBeLinked !== null && props.toBeLinked?.id !== props.node.id))}
                    onClick={() => {

                        props.handleLink(props.node.id, 'left')
                    }}
                    style={{
                        bottom: '-36px',
                        left: 'calc(50% - 15px)',
                        opacity: (props.selected === props.node.id || (props.toBeLinked !== null && props.toBeLinked?.id !== props.node.id)) ? '1' : '0',
                    }}>
                <LinkRounded style={{fontSize: '1.2rem'}}/>
            </button>
        </div>
    )
}
NodeMenu.propTypes = {
    selected: PropTypes.string,

    nodeRef: PropTypes.object,
    handleLinkDelete: PropTypes.func,
    node: NodeTemplate,
    handleLink: PropTypes.func,
    links: PropTypes.arrayOf(LinkTemplate)
}