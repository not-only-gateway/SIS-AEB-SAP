import styles from '../../styles/Input.module.css'
import PropTypes from 'prop-types'
import React, {useState} from "react";
import InputMask from 'react-input-mask';
import {VisibilityOffRounded, VisibilityRounded} from "@material-ui/icons";

export default function TextField(props) {
    const [focused, setFocused] = useState(false)
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
                height: '82px',
                display: 'grid',
                alignItems: props.value ? 'unset' : 'flex-start',
                gap: '4px',
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}>
            <label htmlFor={'input'} className={styles.labelContainer}
                   style={{
                       visibility: (props.value !== undefined && props.value !== null && props.value.length > 0) ? 'visible' : 'hidden',
                       opacity: (props.value !== undefined && props.value !== null && props.value.length > 0) ? '1' : '0',
                       transition: 'visibility 0.2s ease,opacity 0.2s ease'
                   }}>{props.label}</label>

            {props.phoneMask ?
                <InputMask mask={'(99) 9999-9999'}
                           value={props.value}
                           onChange={props.handleChange}>
                    {event =>
                        <input
                            id={'input'}
                            placeholder={props.placeholder}
                            style={{height: (props.value !== undefined && props.value !== null && props.value.length > 0) ? '40px' : '50px'}}
                            className={styles.inputContainer}
                            value={event.value}
                            onChange={event.onChange}
                            maxLength={props.maxLength}
                        />}
                </InputMask>
                :
                <div
                    className={styles.fieldsContainer}
                    style={{height: (props.value !== undefined && props.value !== null && props.value.length > 0) ? '40px' : '50px'}}>
                    <input
                        id={'input'}
                        placeholder={props.placeholder}
                        style={{height: '100%'}}
                        className={styles.inputContainer}
                        value={props.value}
                        type={props.passwordMask && !visible ? 'password' : 'text'}
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

}