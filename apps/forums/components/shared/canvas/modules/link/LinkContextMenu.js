import styles from "../../styles/Canvas.module.css";
import {DeleteForeverRounded, EditRounded} from "@material-ui/icons";
import React, {useState} from "react";
import PropTypes from 'prop-types'

export default function LinkContextMenu(props) {
    const [openModal, setOpenModal] = useState(false)
    const renderModal = () => {
        return (
            null
        )
    }
    return (
        <div className={styles.options}>
            <button className={styles.optionButton} onClick={() => setOpenModal(true)}>
                <EditRounded/>
                Editar conexão
            </button>
            <button className={styles.optionButton} style={{color: '#ff5555'}}
                    onClick={() => props.triggerLinkChange({
                        childID: props.child,
                        parentID: props.parent,
                        action: 'delete'
                    })}
            >
                <DeleteForeverRounded/>
                Deletar conexão
            </button>
        </div>
    )

}
LinkContextMenu.propTypes = {
    triggerLinkChange: PropTypes.func,
    parent: PropTypes.number,
    child: PropTypes.number
}