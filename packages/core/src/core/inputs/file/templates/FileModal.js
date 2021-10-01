import React, {useMemo, useRef} from "react";
import styles from '../styles/File.module.css'
import {CloseRounded} from "@material-ui/icons";
import File from "./File";
import PropTypes from "prop-types";
import EmptyListIndicator from "../../../shared/components/EmptyListIndicator";
import Modal from "../../../misc/modal/Modal";

export default function FileModal(props) {
    const ref = useRef()
    const areaRef = useRef()

    const files = useMemo(() => {
        if (props.files !== undefined && props.files !== null)
            return props.files.map((e, i) => (
                <React.Fragment key={'file-' + i}>
                    <File type={(e.name.split('.').pop())} index={i} name={e.name}
                          handleDelete={props.handleFileRemoval}/>
                </React.Fragment>
            ))
    }, [props.files])

    return (
        <Modal open={props.open} handleClose={() => props.setOpen(false)}>
            <div className={styles.modalContainer}>
                <div className={[styles.modalContent, styles.modalGrid].join(' ')}>
                    <div className={styles.header}>
                        Anexe seus arquivos
                        <div className={styles.divider}/>
                        <div className={styles.headerAccepted}>
                            Tipos
                            aceitos: {props.accept.length > 0 ? props.accept.map((e, i) => e.split('.')[e.split('.').length - 1] + ((i < props.accept.length - 1) ? ', ' : '')) : 'todos'}
                        </div>
                    </div>
                    <button
                        disabled={!props.multiple && props.files.length > 0}
                        className={styles.uploadButton}
                        onClick={event => {
                            event.preventDefault()
                            ref.current.click()
                        }}>
                        Anexar arquivos
                    </button>

                    <div
                        className={[styles.dropArea, props.files.length > 0 ? styles.dropAreaContent : ''].join(' ')}
                        ref={areaRef}
                        style={{background: !props.multiple && props.files.length > 0 ? 'white' : undefined}}
                        onDragLeave={(e) => {
                            if (!(!props.multiple && props.files.length > 0)) {
                                areaRef.current.style.borderColor = '#e0e0e0'
                                areaRef.current.style.background = '#f9fafb'
                            }
                        }}
                        onDragOver={(e) => {
                            e.preventDefault()
                            if (!(!props.multiple && props.files.length > 0)) {
                                areaRef.current.style.borderColor = '#0095ff'
                                areaRef.current.style.background = '#E8F0FE'
                            }
                        }}
                        onDrop={e => {
                            e.preventDefault()
                            if (!(!props.multiple && props.files.length > 0)) {
                                areaRef.current.style.borderColor = '#0095ff'
                                areaRef.current.style.background = '#E8F0FE'
                                props.setFiles([...props.files, ...Array.from(e.dataTransfer.files)])
                            }

                        }}>
                        {props.files.length === 0 ?
                            <EmptyListIndicator customLabel={'Arraste seus arquivos aqui'}/>
                            :
                            files}
                    </div>
                    <input type="file" style={{display: 'none'}}
                           disabled={props.disabled} accept={props.accept}
                           multiple={props.multiple} ref={ref}
                           onChange={event => {
                               props.setFiles(Array.from(event.target.files))
                               ref.current.value = ''
                           }}
                    />
                    <button
                        onClick={() => {
                            props.setOpen(false)
                        }}
                        className={styles.closeButton}
                    >
                        <CloseRounded/>
                    </button>
                </div>
            </div>
        </Modal>
    )
}

FileModal.propTypes = {
    handleFileRemoval: PropTypes.func,
    setFiles: PropTypes.func,
    files: PropTypes.array,
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    multiple: PropTypes.bool,
    accept: PropTypes.array
}
