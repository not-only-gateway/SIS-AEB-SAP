import styles from "../../../styles/Canvas.module.css";
import {DeleteForeverRounded} from "@material-ui/icons";
import React from "react";
import PropTypes from 'prop-types'

export default function LinkContextMenu(props) {

    return (
        <div className={styles.options}>
            <button
                className={styles.optionButton} style={{color: '#ff5555'}}
                onClick={() => {
                    props.deleteLink()
                    props.handleClose()
                }}
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
    type: PropTypes.string,
    handleClose: PropTypes.func
}