import styles from "../../shared/Input.module.css";
import React from "react";
import PropTypes from 'prop-types'
import ParseCurrency from "./ParseCurrency";
import TextFieldPropsTemplate from "../templates/TextFieldPropsTemplate";

export default function  GetInput(props) {
    return (
        props.variant === 'area' ?
            <textarea
                disabled={props.disabled}
                placeholder={props.placeholder}
                value={props.phoneMask ? props.event.value : props.value}
                className={styles.inputContainer}
                style={{
                    background: props.disabled ? 'white' : undefined,
                    border: props.disabled ? '#ecedf2 1px solid' : undefined,
                    boxShadow: props.disabled ? 'none' : undefined,
                    resize: 'vertical'
                }}
                onChange={props.phoneMask ? props.event.onChange : props.handleChange}
                maxLength={props.maxLength}
            />
            :
            <div style={{width: '100%', position: 'relative'}}>
                <input
                    disabled={props.disabled}
                    placeholder={props.placeholder}
                    type={props.type !== 'password' ? props.type : (!props.visible ? 'password' : 'text')}
                    value={props.phoneMask ? props.event.value : props.value}
                    className={styles.inputContainer}
                    style={{
                        background: props.disabled ? 'white' : undefined,
                        border: props.disabled ? '#ecedf2 1px solid' : undefined,
                        boxShadow: props.disabled ? 'none' : undefined,
                        paddingLeft: props.maskStart ? '32px' : undefined
                    }}
                    onChange={props.phoneMask ? props.event.onChange : event => {
                        let data = event.target.value
                        if (props.currencyMask)
                            data = ParseCurrency(data)
                        props.handleChange({target: {value: data}})
                    }}
                    maxLength={props.maxLength}
                />
                <span className={styles.maskStart}>{props.maskStart}</span>
            </div>
    )
}
GetInput.propTypes={...TextFieldPropsTemplate, ...{event: PropTypes.object, visible: PropTypes.bool}}