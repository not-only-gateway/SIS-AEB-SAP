import React, {useState} from 'react'
import PropTypes from 'prop-types'
import styles from '../shared/Input.module.css'
import {AttachFileRounded} from '@material-ui/icons'
import LocalePT from '../shared/LocalePT'
import FileModal from "./templates/FileModal";

export default function FileField(props) {
    const lang = LocalePT

    const [openModal, setOpenModal] = useState(false)


    return (
        <div style={{
            width: props.width,
            marginBottom: 'auto',
            height: '100px',
            display: "grid",
            gap: '4px'
        }}>

            <div className={styles.labelContainer}
                 style={{
                     opacity: props.files.length > 0 ? 1 : 0,
                     transition: 'visibility 0.2s ease,opacity 0.2s ease'
                 }}>{props.label}</div>

            <button className={styles.uploadFormContainer}
                    onClick={() => setOpenModal(true)}
                    style={{
                        background: props.disabled ? 'white' : undefined,
                        border: props.disabled ? '#ecedf2 1px solid' : undefined,
                        boxShadow: props.disabled ? 'none' : undefined
                    }}>
                <div
                    className={styles.labelContainer}
                    style={{
                        color: '#555555',
                        alignItems: 'center',
                        height: '100%',
                        gap: '16px',
                        display: 'flex'
                    }}
                >Anexar arquivos {props.files.length > 0 ?
                    <div style={{fontSize: '.7rem', color: '#777777'}}>
                        ({props.files.length} Anexados)
                    </div> : null}</div>


                <AttachFileRounded/>
                <FileModal open={openModal} setOpen={setOpenModal} files={props.files} multiple={props.multiple}
                           setFiles={props.handleChange} accept={props.accept}
                           handleFileRemoval={props.handleFileRemoval}/>

            </button>

            <div className={styles.alertLabel}
                 style={{
                     color: (props.files.length === 0) ? '#ff5555' : '#262626',
                     visibility: props.required ? 'visible' : 'hidden'
                 }}>{lang.required}</div>
        </div>
    )
}

FileField.propTypes = {
    handleFileRemoval: PropTypes.func,
    files: PropTypes.array,
    multiple: PropTypes.bool,
    accept: PropTypes.array,
    handleChange: PropTypes.func,
    label: PropTypes.string,
    width: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
}
