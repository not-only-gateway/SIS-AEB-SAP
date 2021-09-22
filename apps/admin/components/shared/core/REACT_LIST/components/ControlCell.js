import PropTypes from 'prop-types'
import styles from '../styles/Table.module.css'
import ToolTip from "../../tooltip/ToolTip";
import Checkbox from "../../list/modules/Checkbox";
import React from "react";

export default function ControlCell(props) {
    return (
        <td className={styles.cell} style={{width: typeof props.width === "number" ? props.width + 'px' : 'px'}}>
            <button style={{width: typeof props.width === "number" ? props.width + 'px' : 'px', display: props.asCheckbox ? 'none' : undefined}}
                    className={styles.controlButton} onClick={e => props.onClick()}>
                {props.icon}
                <ToolTip content={props.label} justify={'middle'}/>
            </button>
            <div style={{display: 'flex', justifyContent: 'center', alignItems:  'center'}}>
                {props.asCheckbox ? <Checkbox disabled={false} handleCheck={() => null} checked={false}/> : null}
            </div>
        </td>
    )
}

ControlCell.propTypes = {
    width: PropTypes.any,
    hidden: PropTypes.bool,
    icon: PropTypes.element,
    label: PropTypes.any,
    onClick: PropTypes.func,
    asCheckbox: PropTypes.bool
}