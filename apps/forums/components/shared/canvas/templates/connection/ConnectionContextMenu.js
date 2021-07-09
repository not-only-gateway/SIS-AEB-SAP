import PropTypes from "prop-types";
import styles from "../../styles/Styles.module.css";
import {CloseRounded, DeleteForeverRounded, EditRounded} from "@material-ui/icons";
import React from "react";

export default function ConnectionContextMenu(props){
    return(
        <div className={styles.lineOptionsContainer}>
            <button className={styles.optionButton}>
                <EditRounded/>
                Editar conexão
            </button>
            <button className={styles.optionButton} style={{color: '#ff5555'}}>
                <DeleteForeverRounded/>
                Deletar conexão
            </button>
        </div>
    )

}
ConnectionContextMenu.propTypes = {
    // renderOnRoot: PropTypes.func
}