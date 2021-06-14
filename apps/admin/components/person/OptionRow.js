import PropTypes from 'prop-types'
import styles from "../../styles/Person.module.css";
import shared from "../../styles/shared/Shared.module.css";
import {AddRounded, EditRounded, HistoryRounded} from "@material-ui/icons";
import React, {useState} from "react";
import {Modal} from "@material-ui/core";
import Button from "../shared/inputs/Button";

export default function OptionRow(props) {
    const [modal, setModal] = useState(false)

    const renderModal = () => {
        return (
            <Modal open={modal} onClose={() => setModal(false)}
                   style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <div className={shared.modalContainer}>
                    <div className={shared.modalContent}>
                        {props.modalContent}
                    </div>
                    <div className={shared.modalFooter}>
                        <Button width={'fit-content'} variant={'rounded'} padding={'8px 32px'} content={'Fechar'}
                                handleClick={() => setModal(false)} backgroundColor={'white'} fontColor={'black'}
                                border={'none'}/>
                    </div>
                </div>
            </Modal>
        )
    }
    return (
        <div className={styles.optionContainer}>
            {renderModal()}
            <button className={shared.rowContainer} disabled={props.modalContent === null}
                    onClick={() => setModal(true)}
                    style={{
                        width: '100%',
                        justifyContent: "space-between",
                        cursor: props.modalContent === null ? 'unset' : 'pointer',
                        color: '#282828',
                        boxShadow: props.modalContent === null ? 'unset' : undefined
                    }}>
                {props.label}
            </button>
            <button onClick={() => props.setOption()} className={shared.rowContainer}
                    style={{width: '56px', justifyContent: 'center', color: '#555555'}}> {props.modalContent === null ? <AddRounded/> : <EditRounded/>}
            </button>
            <button className={shared.rowContainer} onClick={() => props.setHistory()}
                    style={{width: '56px', justifyContent: 'center', display: props.modalContent === null ? 'none' : 'initial', color: '#555555'}}><HistoryRounded/>
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