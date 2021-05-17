import React, {useState} from "react";
import PropTypes from "prop-types";

import styles from '../../../styles/Input.module.css'
import {CloseRounded, CloudUploadRounded} from "@material-ui/icons";

export default function ImageField(props) {
    return (
        <div style={{
            width: props.width,
            marginBottom: 'auto',
            height: '63px',
            display: "grid",
            gap: '4px',
            alignItems: props.initialImage ? 'unset' : 'flex-end'
        }}>

            <label htmlFor={'upload-image'} className={styles.labelContainer}
                   style={{
                       visibility: props.initialImage ? 'visible' : 'hidden',
                       opacity: props.initialImage ? '1' : '0',
                       transition: 'visibility 0.2s ease,opacity 0.2s ease'
                   }}>{props.label}</label>

            <form className={styles.imageFieldContainer}
            >
                {props.initialImage ? <p className={styles.labelContainer}
                                         style={{color: '#262626', margin: 'unset'}}>{props.initialImage.name}</p> :
                    <p className={styles.labelContainer} style={{color: '#555555', margin: 'unset'}}> {props.label}</p>}

                {props.initialImage ?

                    <div className={styles.uploadFormContainer} style={{cursor: 'pointer'}} onClick={() => {
                        props.setImage(null)
                        props.setChanged(true)
                    }}>
                        <CloseRounded/>
                    </div>
                    :
                    <label htmlFor='upload-image' className={styles.uploadFormContainer}
                           onChange={event => {
                               props.setImage(event)
                               props.setChanged(true)
                           }}><CloudUploadRounded/></label>

                }
                <input id="upload-image" type="file" style={{display: 'none'}}
                       onChange={event => {
                           props.setImage(event)
                           props.setChanged(true)
                       }}/>

            </form>
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
    width: PropTypes.string
}