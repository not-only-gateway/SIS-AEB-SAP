import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";

import {Alert, Modal, EntityLayout} from "sis-aeb-misc";
import PopFormPT from "../../packages/locales/PopFormPT";
import submitPop from "../../utils/submit/SubmitPop";
import styles from "../../styles/subject/Pop.module.css";
import {CloseRounded} from "@material-ui/icons";
import {Overview} from 'sis-aeb-misc'
import ForumRequests from "../../utils/fetch/ForumRequests";
import handleObjectChange from "../../utils/shared/HandleObjectChange";
import TextField from "../shared/inputs/TextField";
import ImageField from "../shared/inputs/ImageField";
import TextArea from "../shared/inputs/TextArea";
import {BlockPicker, CirclePicker} from "react-color";
import ColorField from "../shared/inputs/ColorField";
import SubjectForm from "./SubjectForm";

export default function SubjectEditModal(props) {

    return (
        <>

            <Modal handleClose={() => props.handleClose()}
                   open={props.open}
                   rootElementID={'root'}>
                <div style={{
                    height: '100vh',
                    width: '100vw',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>

                    <div className={styles.modalContainer}>
                        <div style={{
                            display: 'grid',
                            height: '100%',
                            overflow: 'auto',
                            alignContent: 'flex-start'
                        }}>
                           <SubjectForm data={props.data} handleChange={props.handleChange} id={props.id} returnToMain={props.handleClose}/>
                        </div>
                        <button className={styles.closeButton} onClick={() => props.handleClose()}>
                            <CloseRounded/>
                        </button>
                    </div>
                </div>

            </Modal>
        </>
    )

}

SubjectEditModal.propTypes = {
    open: PropTypes.bool,
    id: PropTypes.number,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    handleClose: PropTypes.func,
    fetchPops: PropTypes.func,
}