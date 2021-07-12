import styles from "../../styles/Canvas.module.css";
import {AddRounded, GetAppRounded, SaveRounded} from "@material-ui/icons";
import React, {useRef, useState} from "react";
import PropTypes from 'prop-types'

export default function CanvasContextMenu(props) {

    return (
        <div className={styles.options}>
            <button className={styles.optionButton} onClick={() => props.triggerUpdate()}>
                <SaveRounded/>
                Salvar layout
            </button>


            <button
                className={styles.optionButton}
                onClick={() => {
                    props.handleCreate()
                }}>
                <AddRounded/>
                Criar modulo
            </button>
            <div style={{background: '#e0e0e0', width: '100%', height: '1px'}}/>
            <button className={styles.optionButton} onClick={() => {
                props.handlePrint()
            }}>
                <GetAppRounded/>
                Download
            </button>
        </div>
    )
}
CanvasContextMenu.propTypes = {
    handlePrint: PropTypes.func,
    triggerUpdate: PropTypes.func,
    handleCreate: PropTypes.func,
}