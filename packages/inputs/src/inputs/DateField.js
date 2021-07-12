import styles from './styles/Input.module.css'
import PropTypes from 'prop-types'
import React from 'react'
import LocalePT from './locales/LocalePT'

export default function DateField(props) {
    const lang = LocalePT
    // const [data, setData] = useState('')
    return (
        <div style={{
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
                        cursor: props.disabled ? 'initial' : 'text',
                        background: props.disabled ? 'white' : undefined,
                        border: props.disabled ? '#ecedf2 1px solid' : undefined,
                        boxShadow: props.disabled ? 'none' : undefined
                    }}
                    className={styles.inputContainer}
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
                   }}>{lang.required}</label>

        </div>
    )
}

DateField.propTypes = {
    width: PropTypes.string,
    label: PropTypes.string,
    handleChange: PropTypes.func,
    value: PropTypes.string,
    required: PropTypes.bool,
    locale: PropTypes.string,
    disabled: PropTypes.bool,
    dark: PropTypes.bool
}
