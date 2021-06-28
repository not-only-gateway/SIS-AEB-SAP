import PropTypes from 'prop-types'
import styles from "../../styles/Person.module.css";
import {AddRounded, CloseRounded, EditRounded, HistoryRounded, LaunchRounded} from "@material-ui/icons";
import React, {useState} from "react";
import {Modal} from "sis-aeb-misc";

export default function OptionRow(props) {
    const [modal, setModal] = useState(false)

    const renderModal = () => {
        return (
            <Modal open={modal} handleClose={() => setModal(false)} rootElementID={'root'}
            >
                <div style={{
                    height: '100vh',
                    width: '100vw',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <div className={styles.modalContainer}>
                        <div style={{display: 'grid', gap: '16px', height: '100%', overflow: 'auto', alignContent: 'flex-start'}}>
                                {props.modalContent}
                        </div>
                        <button className={styles.closeButton} onClick={() => setModal(false)}>
                            <CloseRounded/>
                        </button>
                    </div>

                </div>
            </Modal>
        )
    }
    return (
        <div className={styles.optionContainer}>
            {renderModal()}
            <button className={styles.rowContainer}
                    onClick={() => props.modalContent === null? props.setOption() : setModal(true)}
                    style={{
                        width: '100%',
                        justifyContent: props.modalContent !== null ? 'space-between' : undefined,
                        boxShadow: props.modalContent === null ? 'unset' : undefined
                    }}>
                {props.modalContent === null ? <AddRounded/> : null}
                {props.label}
                {props.modalContent === null ? null : <LaunchRounded style={{fontSize: '1.2rem'}}/>}
            </button>
            <button onClick={() => props.setOption()} className={styles.choiceButtonContainer}
                    style={{
                        display: props.modalContent === null ? 'none' : undefined
                    }}>
                <EditRounded style={{fontSize: '1.2rem'}}/>
            </button>
            <div style={{
                background: '#e0e0e0',
                width: '1px',
                height: '100%',
                display: props.modalContent === null ? 'none' : undefined
            }}/>
            <button className={styles.choiceButtonContainer} onClick={() => props.setHistory()}
                    style={{
                        display: props.modalContent === null ? 'none' : undefined,
                    }}><HistoryRounded/>
            </button>
        </div>
    )
}

OptionRow.propTypes = {
    label: PropTypes.string,
    setOption: PropTypes.func,
    modalContent: PropTypes.any,
    setHistory: PropTypes.func
}