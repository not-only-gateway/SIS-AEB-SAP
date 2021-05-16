import styles from '../../styles/Input.module.css'
import PropTypes from 'prop-types'
import {useState} from "react";
import InputMask from 'react-input-mask';

export default function TextField(props) {
    const [focused, setFocused] = useState(false)

    function getLang(locale) {
        let response = 'This field is required.'

        if (locale === 'pt')
            response = 'Este campo é obrigatório.'

        return response
    }

    return (
        <div
            style={{width: props.width}}
            className={styles.textFieldContainer}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}>
            {(props.value !== undefined && props.value !== null && props.value.length > 0) ?
                <label htmlFor={'input'} className={styles.labelContainer}>{props.label}</label>
                :
                null
            }
            {props.phoneMask ?
            <InputMask mask={'(99) 9-9999-9999'}
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
                <input
                    id={'input'}
                    placeholder={props.placeholder}
                    style={{height: (props.value !== undefined && props.value !== null && props.value.length > 0) ? '40px' : '50px'}}
                    className={styles.inputContainer}
                    value={props.value}
                    onChange={props.handleChange}
                    maxLength={props.maxLength}
                />
            }

            {props.required ?
                <label htmlFor={'input'} className={styles.alertLabel}
                       style={{color: (props.value === null || !props.value || props.value.length === 0) ? '#ff5555' : '#262626'}}>{getLang(props.locale)}</label>
                :
                null
            }
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
    phoneMask: PropTypes.bool,
    maxLength: PropTypes.number
}