import styles from "../../styles/Canvas.module.css";
import {DeleteForeverRounded, LinkRounded, VisibilityRounded} from "@material-ui/icons";
import React from "react";
import PropTypes from 'prop-types'

export default function NodeContextMenu(props) {
    return (
        <div className={styles.options}>
            <button className={styles.optionButton} onClick={() => {
                props.handleClose()
                props.show()

            }}>
                <VisibilityRounded/>
                Visualizar
            </button>

            <button className={styles.optionButton} onClick={() => {
                props.handleDelete(props.entity)
                props.handleClose()
            }}
                    style={{
                        color: '#ff5555',
                        border: 'none'
                    }}>
                <DeleteForeverRounded/>
                Deletar modulo
            </button>
        </div>
    )
}
NodeContextMenu.propTypes = {
    entity: PropTypes.object,
    show: PropTypes.func,
    handleClose: PropTypes.func,
    handleDelete: PropTypes.func
}