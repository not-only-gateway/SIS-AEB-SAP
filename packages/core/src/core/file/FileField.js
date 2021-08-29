import React from 'react'
import PropTypes from 'prop-types'
import styles from '../text/styles/Input.module.css'
import {CloseRounded, GetAppRounded} from '@material-ui/icons'
import LocalePT from '../packages/LocalePT'

export default function FileField(props) {
    const lang = LocalePT
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
                {props.initialImage && props.initialImage.name ?
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
                    >{props.initialImage.name}</p> :
                    <p
                        className={styles.labelContainer}
                        style={{color: '#555555', margin: 'unset'}}
                    > {props.label}</p>}

                {props.initialImage ?

                    <div className={styles.uploadFormContainer} style={{cursor: 'pointer'}} onClick={() => {
                        props.setImage(null)
                        props.setChanged(true)
                    }}>
                        <CloseRounded/>
                    </div>
                    :
                    <div
                           className={styles.uploadFormContainer}
                           onChange={event => {
                               props.setImage(event)
                               props.setChanged(true)
                           }}><GetAppRounded style={{transform: 'rotate(180deg)'}}/></div>

                }
                <input type="file" style={{display: 'none'}}
                       disabled={props.disabled}
                       onChange={event => {
                           props.setImage(event)
                           props.setChanged(true)
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
    setImage: PropTypes.func,
    initialImage: PropTypes.any,
    size: PropTypes.string,
    label: PropTypes.string,
    base64: PropTypes.bool,
    setChanged: PropTypes.func,
    width: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
}
