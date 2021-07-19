import styles from "../../styles/Canvas.module.css";
import {DeleteForeverRounded, EditRounded} from "@material-ui/icons";
import React, {useState} from "react";
import PropTypes from 'prop-types'

export default function LinkContextMenu(props) {

    return (
        <div className={styles.options}>
            <button className={styles.optionButton} onClick={() => props.changeType()}>
                <EditRounded/>
                Mudar para {props.type === 'weak' ? 'forte' : 'fraca'}
            </button>
            <button
                className={styles.optionButton} style={{color: '#ff5555'}}
                onClick={() => props.deleteLink()}
            >
                <DeleteForeverRounded/>
                Deletar conexão
            </button>
        </div>
    )

}
LinkContextMenu.propTypes = {
    deleteLink: PropTypes.func,
    changeType: PropTypes.func,
    parent: PropTypes.number,
    child: PropTypes.number,
    type: PropTypes.string
}