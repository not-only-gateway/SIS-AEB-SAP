import styles from '../../../styles/Input.module.css'
import PropTypes from 'prop-types'
import React, {useState} from "react";
import InputMask from 'react-input-mask';
import {VisibilityOffRounded, VisibilityRounded} from "@material-ui/icons";

export default function TextField(props) {
    const [visible, setVisible] = useState(false)


    function getLang(locale) {
        let response = 'This field is required.'

        if (locale === 'pt')
            response = 'Este campo é obrigatório.'

        return response
    }

    return (
        <div
            style={{
                width: props.width,
                height: props.variant === 'small' ? '86px' : '100px',
                display: 'grid',
                alignItems: props.value ? 'unset' : 'flex-start',
                gap: '4px',
            }}
        >
            <label htmlFor={'input'} className={styles.labelContainer}
                   style={{
                       visibility: (props.value !== undefined && props.value !== null && props.value.length > 0) || props.type === 'time' ? 'visible' : 'hidden',
                       opacity: (props.value !== undefined && props.value !== null && props.value.length > 0) || props.type === 'time' ? '1' : '0',
                       transition: 'visibility 0.2s ease,opacity 0.2s ease'
                   }}>{props.label}</label>

            {props.phoneMask ?
                <InputMask mask={'(99) 9999-9999'}
                           value={props.value}
                           onChange={props.handleChange}>
                    {event =>
                        <input
                            disabled={props.disabled}
                            id={'input'}
                            placeholder={props.placeholder}
                            className={[styles.inputContainer, props.disabled ? {} : styles.hovered].join(' ')}
                            value={event.value}
                            onChange={event.onChange}
                            maxLength={props.maxLength}
                        />}
                </InputMask>
                :
                <div className={styles.fieldsContainer}>
                    <input
                        disabled={props.disabled}
                        id={'input'}

                        placeholder={props.placeholder}
                        className={[styles.inputContainer, props.disabled ? {} : styles.hovered].join(' ')}
                        value={props.value}
                        style={{height: props.variant === 'small' ? '40px' : undefined}}
                        type={props.passwordMask && !visible ? 'password' : props.type ? props.type : 'text'}
                        onChange={props.handleChange}
                        maxLength={props.maxLength}
                    />
                    {props.passwordMask ?
                        !visible ? <VisibilityOffRounded htmlFor={'input'} style={{transition: '300ms ease-in-out'}}
                                                         onClick={() => setVisible(true)}
                                                         className={styles.visibilityContainer}/> :
                            <VisibilityRounded htmlFor={'input'} style={{transition: '300ms ease-in-out'}}
                                               className={styles.visibilityContainer}
                                               onClick={() => setVisible(false)}/>
                        :
                        null
                    }
                </div>
            }


            <label htmlFor={'input'} className={styles.alertLabel}
                   style={{
                       color: (props.value === null || !props.value || props.value.length === 0) ? '#ff5555' : '#262626',
                       visibility: props.required ? 'visible' : 'hidden'
                   }}>{getLang(props.locale)}</label>

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
        'small'
    ]),
    type: PropTypes.string
}