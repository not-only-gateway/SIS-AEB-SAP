import PropTypes from 'prop-types'
import styles from '../../styles/Table.module.css'
import React from "react";
import ToolTip from "../../../misc/tooltip/ToolTip";

export default function ControlCell(props) {
    return (
        <td className={styles.cell} style={{width: '60px'}}>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '16px',
                width: '60px',

            }}>
                    <button
                        className={styles.controlButton} onClick={e => props.onClick()}>
                        {props.icon}
                        <ToolTip content={props.label} justify={'middle'}/>
                    </button>

            </div>
        </td>
    )
}

ControlCell.propTypes = {
    hidden: PropTypes.bool,
    icon: PropTypes.element,
    label: PropTypes.any,
    onClick: PropTypes.func
}
