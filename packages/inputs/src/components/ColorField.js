import PropTypes from 'prop-types'
import {CirclePicker} from "react-color";
import React from "react";
import LocalePT from "./locales/LocalePT";
import styles from "./styles/Input.module.css";

export default function ColorField(props){
    const lang = LocalePT
    return(
        <div style={{display: 'grid', gap: '3px'}}>
            <div className={styles.labelContainer}>{props.label}</div>
            <div style={{
                border: '#e0e0e0 1px solid',
                borderRadius: '8px',
                padding: '8px',
                width: props.width,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start'
            }}>
                <CirclePicker width={'100%'}
                              color={props.data === null ? {hex: null} : {hex: props.value}}
                              onChangeComplete={event => {
                                  props.handleChange(event.hex)
                              }}/>
            </div>

            <div className={styles.alertLabel}
                   style={{
                       color: (props.value === null || !props.value || props.value.length === 0) ? '#ff5555' : '#262626',
                       visibility: props.required ? 'visible' : 'hidden'
                   }}>{lang.required}</div>
        </div>
    )
}
ColorField.propTypes={
    value: PropTypes.string,
    handleChange: PropTypes.func,
    width: PropTypes.string,
    required: PropTypes.bool,
    label: PropTypes.string
}