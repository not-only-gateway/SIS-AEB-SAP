import React, {useRef} from 'react'
import PropTypes from 'prop-types'
import styles from '../shared/styles/Input.module.css'
import {CloseRounded, GetAppRounded} from '@material-ui/icons'
import LocalePT from '../packages/LocalePT'

export default function FileField(props) {
    const lang = LocalePT
    const ref = useRef()
    return (
        <div style={{
            width: props.width,
            marginBottom: 'auto',
            height: '100px',
            display: "grid",
            gap: '4px',
            alignItems: props.initialImage ? 'unset' : 'flex-end'
        }}>

            <div className={styles.labelContainer}
                 style={{
                     visibility: props.initialImage && props.initialImage.name ? 'visible' : 'hidden',
                     opacity: props.initialImage ? '1' : '0',
                     transition: 'visibility 0.2s ease,opacity 0.2s ease'
                 }}>{props.label}</div>

            <form className={styles.imageFieldContainer} style={{
                background: props.disabled ? 'white' : undefined,
                border: props.disabled ? '#ecedf2 1px solid' : undefined,
                boxShadow: props.disabled ? 'none' : undefined
            }}>
                {props.file !== undefined && props.file !== null ?
                    <p
                        className={styles.labelContainer}
                        style={{
                            color: '#262626',
                            margin: 'unset',
                            overflowX: 'hidden',
                            width: '75%',
                            wordBreak: 'keep-all',
                            whiteSpace: 'nowrap'
                        }}
                    >{Array.isArray(props.file) ? props.file.length + ' - Anexados': props.file.name}</p> :
                    <p
                        className={styles.labelContainer}
                        style={{color: '#555555', margin: 'unset'}}
                    > {props.label}</p>}

                {props.initialImage ?

                    <div className={styles.uploadFormContainer} style={{cursor: 'pointer'}} onClick={() => {
                        props.handleChange(null)
                    }}>
                        <CloseRounded/>
                    </div>
                    :
                    <button
                        className={styles.uploadFormContainer}
                        onClick={event => {
                            event.preventDefault()
                            ref.current.click()
                        }}><GetAppRounded style={{transform: 'rotate(180deg)'}}/></button>

                }
                <input type="file" style={{display: 'none'}}
                       disabled={props.disabled} accept={props.accept}
                       multiple={props.multiple} ref={ref}
                       onChange={event => {
                           // event.preventDefault()
                           console.log(event.target.files)
                           props.handleChange(event.target.files)
                           ref.current.value = ''
                       }}/>

            </form>

            <div className={styles.alertLabel}
                 style={{
                     color: (props.value === null || !props.value || props.value.length === 0) ? '#ff5555' : '#262626',
                     visibility: props.required ? 'visible' : 'hidden'
                 }}>{lang.required}</div>

        </div>
    )
}

FileField.propTypes = {
    file: PropTypes.object,
    multiple: PropTypes.bool,
    accept: PropTypes.string,
    handleChange: PropTypes.func,
    label: PropTypes.string,
    width: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
}
