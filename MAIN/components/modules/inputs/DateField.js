import styles from '../../../styles/Input.module.css'
import PropTypes from 'prop-types'
import React from "react";

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
                height: '100px',
                display: 'grid',
                alignItems: props.value ? 'unset' : 'flex-start',
                gap: '4px',
            }}>
            <label htmlFor={'input-' + props.label + '-date'} className={styles.labelContainer}>{props.label}</label>

            <div className={styles.fieldsContainer}>
                <input
                    disabled={props.disabled}
                    id={'input-' + props.label + '-date'}
                    style={{
                        height: '56px',
                        fontWeight: 500,
                        fontSize: '1rem',
                        fontFamily: '\'Source Sans Pro\', sans-serif',
                        cursor: props.disabled ? 'initial' : 'text'
                    }}
                    className={[styles.inputContainer, props.disabled ? {} : props.dark ? styles.darkHighlight : styles.highlight].join(' ')}
                    value={props.value}
                    type={'date'}
                    onChange={props.handleChange}
                    maxLength={props.maxLength}
                />
            </div>


            <label htmlFor={'input-' + props.label + '-date'} className={styles.alertLabel}
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
    disabled: PropTypes.bool,
    dark: PropTypes.bool
}