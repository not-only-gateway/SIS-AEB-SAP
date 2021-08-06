import styles from './styles/Input.module.css'
import PropTypes from 'prop-types'
import React, {useState} from 'react'
import InputMask from 'react-input-mask'
import {VisibilityOffRounded, VisibilityRounded} from '@material-ui/icons'
import LocalePT from './locales/LocalePT'

export default function TextField(props) {
    const [visible, setVisible] = useState(false)
    const lang = LocalePT
    const getInput = (event) => {
        return (
            props.variant === 'area' ?
                <textarea
                    disabled={props.disabled}
                    id={props.label + 'text_field'}

                    placeholder={props.placeholder}

                    value={props.phoneMask ? event.value : props.value}
                    className={styles.inputContainer}
                    style={{
                        background: props.disabled ? 'white' : undefined,
                        border: props.disabled ? '#ecedf2 1px solid' : undefined,
                        boxShadow: props.disabled ? 'none' : undefined,
                        resize: 'vertical'
                    }}
                    onChange={props.phoneMask ? event.onChange : props.handleChange}
                    maxLength={props.maxLength}
                />
                :
                <input
                    disabled={props.disabled}
                    id={props.label + 'text_field'}

                    placeholder={props.placeholder}

                    value={props.phoneMask ? event.value : props.value}
                    className={styles.inputContainer}
                    style={{
                        background: props.disabled ? 'white' : undefined,
                        border: props.disabled ? '#ecedf2 1px solid' : undefined,
                        boxShadow: props.disabled ? 'none' : undefined
                    }}
                    onChange={props.phoneMask ? event.onChange : props.handleChange}
                    maxLength={props.maxLength}
                />
        )
    }
    return (
        <div
            style={{
                width: props.width,
                height: props.variant === 'area' ? 'auto' : '100px',
                display: 'grid',
                alignItems: props.value ? 'unset' : 'flex-start',
                gap: '4px',
            }}
        >
            <label htmlFor={props.label + 'text_field'} className={styles.labelContainer}
                   style={{
                       visibility: (props.value !== undefined && props.value !== null && props.value.length > 0) || props.type === 'time' || props.type === 'number' ? 'visible' : 'hidden',
                       opacity: (props.value !== undefined && props.value !== null && props.value.length > 0) || props.type === 'time' || props.type === 'number' ? '1' : '0',
                       transition: 'visibility 0.2s ease,opacity 0.2s ease'
                   }}>{props.label}</label>

            {props.phoneMask ?
                <InputMask mask={'(99) 9999-9999'}
                           value={props.value}
                           onChange={props.handleChange}>
                    {event =>
                        getInput(event)
                    }
                </InputMask>
                :
                <div className={styles.fieldsContainer}>
                    {getInput()}
                    {props.passwordMask ?
                        !visible ? <VisibilityOffRounded htmlFor={props.label + 'text_field'}
                                                         style={{transition: '300ms ease-in-out'}}
                                                         onClick={() => setVisible(true)}
                                                         className={styles.visibilityContainer}/> :
                            <VisibilityRounded htmlFor={props.label + 'text_field'}
                                               style={{transition: '300ms ease-in-out'}}
                                               className={styles.visibilityContainer}
                                               onClick={() => setVisible(false)}/>
                        :
                        null
                    }
                </div>
            }
            <label htmlFor={props.label + 'text_field'} className={styles.alertLabel}
                   style={{
                       color: (props.value === null || !props.value || props.value.length === 0) ? '#ff5555' : '#262626',
                       visibility: props.required ? 'visible' : 'hidden'
                   }}>{lang.required}
            </label>

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
    locale: PropTypes.string,
    passwordMask: PropTypes.bool,
    phoneMask: PropTypes.bool,
    maxLength: PropTypes.number,
    disabled: PropTypes.bool,
    variant: PropTypes.oneOf([
        'default',
        'area'
    ]),
    type: PropTypes.string,
}
