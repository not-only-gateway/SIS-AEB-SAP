import PropTypes from "prop-types";
import Modal from "../../modal/Modal";
import styles from "../styles/Overview.module.css";
import {CloseRounded} from "@material-ui/icons";
import React from "react";

export default function Description(props) {
    return(
        <Modal handleClose={() => props.handleClose()}
               open={props.open}
               rootElementID={props.rootElementID}>
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
                        {props.information.map((field, index) => (
                            <div className={styles.descriptionContainer}>
                                <p style={{fontSize: '1.1rem', marginTop: index === 0 ? 0 : undefined}}>{field.label}</p>
                                <p style={{fontSize: '.9rem', color: '#555555'}}>
                                    {field.description}
                                </p>
                            </div>
                        ))}
                    </div>
                    <button className={styles.closeButton} onClick={() => props.handleClose()}>
                        <CloseRounded/>
                    </button>
                </div>
            </div>
        </Modal>
    )
}
Description.propTypes = {
    information: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            description: PropTypes.shape
        })
    ),
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    rootElementID: PropTypes.any
}