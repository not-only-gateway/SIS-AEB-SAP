import React from "react";
import PropTypes from "prop-types";

import {Modal} from "sis-aeb-misc";
import styles from "../../styles/subject/Pop.module.css";
import {CloseRounded} from "@material-ui/icons";
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
    id: PropTypes.any,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    handleClose: PropTypes.func,
    fetchPops: PropTypes.func,
}