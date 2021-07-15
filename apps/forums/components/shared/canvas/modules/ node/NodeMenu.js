import PropTypes from 'prop-types'
import React from "react";
import NodeTemplate from "../../templates/NodeTemplate";
import {CloseRounded, DragIndicatorRounded} from "@material-ui/icons";
import styles from '../../styles/NodeMenu.module.css'
export default function NodeMenu(props) {
    return (
        <>
            <div style={{
                opacity: props.selected === props.node.id ? '1' : '0',
                border: (props.node.color + ' 2px solid'),
                borderRadius: props.node.shape === 'circle' ? '50%' : '5px',
                width: props.nodeRef !== undefined ? (props.nodeRef.offsetWidth + 12) + 'px' : 'unset',
                height: props.nodeRef !== undefined ? (props.nodeRef.offsetHeight + 12) + 'px' : 'unset'
            }} className={styles.selectedHighlight}/>
            {/*<button className={styles.buttonMenu}*/}
            {/*    style={{opacity: props.selected === props.node.id ? '1' : '0'}}*/}

            {/*}}>*/}
            {/*    <DragIndicatorRounded/>*/}
            {/*</button>*/}

            <button onClick={() => props.setSelected(undefined)} className={styles.closeButtonMenu}
                    style={{opacity: props.selected === props.node.id ? '1' : '0'}}>
                <CloseRounded/>
            </button>
        </>
    )
}
NodeMenu.propTypes = {
    selected: PropTypes.string,
    setSelected: PropTypes.func,

    nodeRef: PropTypes.object,

    node: NodeTemplate,

    move: PropTypes.func
}