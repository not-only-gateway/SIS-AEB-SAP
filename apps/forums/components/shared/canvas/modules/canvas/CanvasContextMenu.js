import styles from "../../styles/Canvas.module.css";
import {AddRounded, GetAppRounded, SaveRounded} from "@material-ui/icons";
import React, {useRef} from "react";
import PropTypes from 'prop-types'
export default function CanvasContextMenu(props){
    return(
        <div className={styles.options}>
            <button className={styles.optionButton} onClick={() => props.handleTriggerUpdate()}>
                <SaveRounded/>
                Salvar layout
            </button>
            <button className={styles.optionButton} disabled={true}>
                <GetAppRounded/>
                Download
            </button>

            <button
                className={styles.optionButton}
                onClick={() => {
                    props.handleCreate()
                }}>
                <AddRounded/>
                Criar modulo
            </button>
        </div>
    )
}
CanvasContextMenu.propTypes={
    handleTriggerUpdate: PropTypes.func,
    handleCreate: PropTypes.func,
}