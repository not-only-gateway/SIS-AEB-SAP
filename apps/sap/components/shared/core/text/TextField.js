import styles from '../shared/styles/Input.module.css'
import React, {useState} from 'react'
import InputMask from 'react-input-mask'
import {VisibilityOffRounded, VisibilityRounded} from '@material-ui/icons'
import LocalePT from '../packages/LocalePT'
import TextFieldPropsTemplate from "./templates/TextFieldPropsTemplate";
import GetInput from "./methods/GetInput";

export default function TextField(props) {
    const [visible, setVisible] = useState(false)
    const lang = LocalePT

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
            <div className={styles.labelContainer}
                 style={{
                     visibility: (props.value !== undefined && props.value !== null && props.value.length > 0) || props.type === 'time' || props.type === 'number' ? 'visible' : 'hidden',
                     opacity: (props.value !== undefined && props.value !== null && props.value.length > 0) || props.type === 'time' || props.type === 'number' ? '1' : '0',
                     transition: 'visibility 0.2s ease,opacity 0.2s ease'
                 }}>{props.label}</div>

            {props.phoneMask ?
                <InputMask mask={'(99) 9999-9999'}
                           value={props.value}
                           onChange={props.handleChange}>
                    {event =>
                        GetInput({...props, ...{event: event}})
                    }
                </InputMask>
                :
                <div className={styles.fieldsContainer}>
                    {GetInput({...props, ...{visible: visible}})}
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
            }
            <div className={styles.alertLabel}
                 style={{
                     color: (props.value === null || !props.value || props.value.length === 0) ? '#ff5555' : '#262626',
                     visibility: props.required ? 'visible' : 'hidden'
                 }}>{lang.required}
            </div>

        </div>
    )
}

TextField.propTypes = TextFieldPropsTemplate