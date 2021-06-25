import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles/Input.module.css'
import {CloseRounded, CloudUploadRounded} from '@material-ui/icons'
import LocalePT from './locales/LocalePT'

export default function ImageField(props) {

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

            <label htmlFor={'upload-image'} className={styles.labelContainer}
                   style={{
                       visibility: props.initialImage && props.initialImage.name ? 'visible' : 'hidden',
                       opacity: props.initialImage ? '1' : '0',
                       transition: 'visibility 0.2s ease,opacity 0.2s ease'
                   }}>{props.label}</label>

            <form className={styles.imageFieldContainer}>
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
                    <label htmlFor='upload-image'
                           className={styles.uploadFormContainer}
                           onChange={event => {
                               props.setImage(event)
                               props.setChanged(true)
                           }}><CloudUploadRounded/></label>

                }
                <input id="upload-image" type="file" style={{display: 'none'}}
                        disabled={props.disabled}
                       onChange={event => {
                           props.setImage(event)
                           props.setChanged(true)
                       }}/>

            </form>

            <label htmlFor={'input'} className={styles.alertLabel}
                   style={{
                       color: (props.value === null || !props.value || props.value.length === 0) ? '#ff5555' : '#262626',
                       visibility: props.required ? 'visible' : 'hidden'
                   }}>{lang.required}</label>

        </div>
    )
}

ImageField.propTypes = {
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
