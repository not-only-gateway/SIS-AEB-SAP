import React from 'react'
import PropTypes from 'prop-types'
import './Input.css'
import { CloseRounded, CloudUploadRounded } from '@material-ui/icons'

export default function ImageField(props) {

    function getLang(locale) {
        let response = 'This field is required.'

        if (locale === 'pt')
            response = 'Este campo é obrigatório.'

        return response
    }

    return (
        <div style={{
            width: props.width,
            marginBottom: 'auto',
            height: '100px',
            display: "grid",
            gap: '4px',
            alignItems: props.initialImage ? 'unset' : 'flex-end'
        }}>

            <label htmlFor={'upload-image'} className={'.labelContainer'}
                   style={{
                       visibility: props.initialImage && props.initialImage.name ? 'visible' : 'hidden',
                       opacity: props.initialImage ? '1' : '0',
                       transition: 'visibility 0.2s ease,opacity 0.2s ease'
                   }}>{props.label}</label>

            <form className={'.imageFieldContainer, .highlight'}>
                {props.initialImage && props.initialImage.name ?
                    <p
                        className={'.labelContainer'}
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
                        className={'.labelContainer'}
                        style={{color: '#555555', margin: 'unset'}}
                    > {props.label}</p>}

                {props.initialImage ?

                    <div className={'.uploadFormContainer'} style={{cursor: 'pointer'}} onClick={() => {
                        props.setImage(null)
                        props.setChanged(true)
                    }}>
                        <CloseRounded/>
                    </div>
                    :
                    <label htmlFor='upload-image'
                           className={'.uploadFormContainer'}
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

            <label htmlFor={'input'} className={'.alertLabel'}
                   style={{
                       color: (props.value === null || !props.value || props.value.length === 0) ? '#ff5555' : '#262626',
                       visibility: props.required ? 'visible' : 'hidden'
                   }}>{getLang(props.locale)}</label>

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
