import styles from '../shared/Input.module.css'
import React, {useMemo, useState} from 'react'
import InputMask from 'react-input-mask'
import {VisibilityOffRounded, VisibilityRounded} from '@material-ui/icons'
import LocalePT from '../shared/LocalePT'
import PropTypes from "prop-types";
import ParseCurrency from "./methods/ParseCurrency";

export default function TextField(props) {
    const [visible, setVisible] = useState(false)
    const lang = LocalePT
    const mask = useMemo(() => {
        if (props.type === 'number')
            return props.value && props.value.length > 1 ? props.value.replace(new RegExp("[0-9]", "g"), "9"): '9'
        else
            return props.mask
    }, [props.mask, props.value])
    return (
        <div
            style={{
                width: props.width,
                height: 'auto',
                display: 'grid',
                alignItems: props.value ? 'unset' : 'flex-start',
                gap: '4px',
            }}
        >
            <div className={styles.labelContainer}
                 style={{
                     visibility: (props.value !== undefined && props.value !== null && props.value.length > 0) || props.type === 'time' || props.type === 'number' ? 'visible' : 'hidden',
                     opacity: (props.value !== undefined && props.value !== null && props.value.length > 0) || props.type === 'time' || props.type === 'number' ? '1' : '0',
                     transition: 'visibility 0.2s ease,opacity 0.2s ease'
                 }}>{props.label}</div>

            <div className={styles.fieldsContainer}>
                {props.variant === 'area' ?
                    <textarea
                        disabled={props.disabled}
                        placeholder={props.placeholder}
                        value={props.value}
                        className={styles.inputContainer}
                        style={{
                            background: props.disabled ? 'white' : undefined,
                            border: props.disabled ? '#ecedf2 1px solid' : undefined,
                            boxShadow: props.disabled ? 'none' : undefined,
                            resize: 'vertical'
                        }}
                        onChange={props.handleChange}
                        maxLength={props.maxLength}
                    />
                    :
                    <InputMask
                        mask={mask} maskPlaceholder={''}
                        value={props.value} alwaysShowMask={false}
                    >
                        {event =>
                            <div style={{width: '100%', position: 'relative'}}>
                                <input
                                    disabled={props.disabled}
                                    placeholder={props.placeholder}
                                    type={props.type !== 'password' ? undefined : (!props.visible ? 'password' : 'text')}
                                    value={event.value}
                                    className={styles.inputContainer}
                                    style={{
                                        background: props.disabled ? 'white' : undefined,
                                        border: props.disabled ? '#ecedf2 1px solid' : undefined,
                                        boxShadow: props.disabled ? 'none' : undefined,
                                        paddingLeft: props.maskStart ? '32px' : undefined
                                    }}
                                    onChange={e => {
                                        console.log('THIS IS EVENT ', e.target.value)
                                        let data = e.target.value
                                        if (props.type === 'number') {
                                            data = ParseCurrency(e.target.value)
                                            console.log(data)
                                        }
                                        props.handleChange({target: {value: data}})
                                    }}
                                    maxLength={props.maxLength}
                                />
                                <span className={styles.maskStart}>{props.maskStart}</span>
                            </div>
                        }
                    </InputMask>}
                {props.passwordMask ?
                    !visible ?
                        <VisibilityOffRounded htmlFor={props.label + 'text_field'}
                                              style={{transition: '300ms ease-in-out'}}
                                              onClick={() => setVisible(true)}
                                              className={styles.visibilityContainer}/>
                        :
                        <VisibilityRounded htmlFor={props.label + 'text_field'}
                                           style={{transition: '300ms ease-in-out'}}
                                           className={styles.visibilityContainer}
                                           onClick={() => setVisible(false)}/>
                    :
                    null
                }
            </div>
            <div className={styles.alertLabel}
                 style={{
                     color: (props.value === null || !props.value || props.value.length === 0) ? '#ff5555' : '#262626',
                     visibility: props.required ? 'visible' : 'hidden'
                 }}>{lang.required}
            </div>

        </div>
    )
}

TextField.propTypes = {
    width: PropTypes.string,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    handleChange: PropTypes.func,
    value: PropTypes.string,
    required: PropTypes.bool,

    passwordMask: PropTypes.bool,
    mask: PropTypes.string,

    maxLength: PropTypes.number,
    disabled: PropTypes.bool,
    variant: PropTypes.oneOf([
        'default',
        'area'
    ]),
    type: PropTypes.oneOf(['number', 'text']),

    maskStart: PropTypes.string
}
