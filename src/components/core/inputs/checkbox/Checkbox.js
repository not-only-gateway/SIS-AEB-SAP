import styles from './styles/Checkbox.module.css'
import PropTypes from 'prop-types'
import {CheckRounded} from "@material-ui/icons";
import React, {useContext} from 'react'
import ThemeContext from "../../theme/ThemeContext";

export default function Checkbox(props) {
    return (
        <div style={{display: 'flex', alignItems: 'center', gap: '16px', opacity: props.disabled ? '.8' : 1}}>
            <button
                className={styles.container}
                disabled={props.disabled}
                style={{
                    background: props.checked ? '#0095ff' : undefined,
                    border: props.checked ? '#0095ff 1px solid' : undefined
                }}
                onClick={() => props.handleCheck(props.checked)}>
                <CheckRounded style={{
                    color: 'white',
                    visibility: props.checked ? 'visible' : 'hidden',
                    fontSize: '15px',
                    fontWeight: "bold"
                }}/>
            </button>
            {props.label ?
                <div style={{fontSize: '.9rem'}}>
                    {props.label}
                </div>
                : null}
        </div>
    )
}
Checkbox.propTypes = {
    checked: PropTypes.bool,
    handleCheck: PropTypes.func,
    label: PropTypes.any,
    disabled: PropTypes.bool
}
