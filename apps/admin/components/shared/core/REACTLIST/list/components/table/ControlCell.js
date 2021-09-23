import PropTypes from 'prop-types'
import styles from '../../styles/Table.module.css'
import ToolTip from "../../../tooltip/ToolTip";
import Checkbox from "./Checkbox";
import React from "react";

export default function ControlCell(props) {
    return (
        <td className={styles.cell} style={{width: '60px'}}>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '16px',
                width: '60px',
                height: '60px'
            }}>
                {!props.asCheckbox ?
                    <button
                        className={styles.controlButton} onClick={e => props.onClick()}>
                        {props.icon}
                        <ToolTip content={props.label} justify={'middle'}/>
                    </button>
                    :
                    <Checkbox disabled={false} handleCheck={() => null} checked={false}/>
                }
            </div>
        </td>
    )
}

ControlCell.propTypes = {
    hidden: PropTypes.bool,
    icon: PropTypes.element,
    label: PropTypes.any,
    onClick: PropTypes.func,
    asCheckbox: PropTypes.bool
}