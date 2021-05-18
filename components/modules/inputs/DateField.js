import styles from '../../../styles/Input.module.css'
import PropTypes from 'prop-types'
import React, {useState} from "react";
import InputMask from 'react-input-mask';
import {VisibilityOffRounded, VisibilityRounded} from "@material-ui/icons";

export default function DateField(props) {

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
            }}>
            <label htmlFor={'input'} className={styles.labelContainer}>{props.label}</label>

            <div
                className={styles.fieldsContainer}
                style={{height: (props.value !== undefined && props.value !== null) ? '40px' : '50px'}}>
                <input
                    id={'input'}
                    style={{height: '100%', fontWeight: 500, fontSize: '1rem', fontFamily: '\'Source Sans Pro\', sans-serif'}}
                    className={styles.inputContainer}
                    value={props.value}
                    type={'date'}
                    onChange={props.handleChange}
                    maxLength={props.maxLength}
                />
            </div>


            <label htmlFor={'input'} className={styles.alertLabel}
                   style={{
                       color: (props.value === null || !props.value) ? '#ff5555' : '#262626',
                       visibility: props.required ? 'visible' : 'hidden'
                   }}>{getLang(props.locale)}</label>

        </div>
    )
}

DateField.propTypes = {
    width: PropTypes.string,
    label: PropTypes.string,
    handleChange: PropTypes.func,
    value: PropTypes.number,
    required: PropTypes.bool,
    locale: PropTypes.string,


}