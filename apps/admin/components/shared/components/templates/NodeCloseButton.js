import PropTypes from "prop-types";
import styles from "../styles/NodeMisc.module.css";
import {CancelRounded} from "@material-ui/icons";
import React from "react";

export default function NodeCloseButton(props) {
    return (
        <button
            className={styles.closeButton}
            style={{
                display: props.visible ? undefined : 'none',

                right:  '0',
                top: '0',
            }}
            onClick={() => props.handleClose()}>
            <CancelRounded style={{fontSize: props.smaller ? '1.1rem' : '1.4rem'}}/>
        </button>
    )
}

NodeCloseButton.propTypes = {
    smaller: PropTypes.bool,
    handleClose: PropTypes.func,
    visible: PropTypes.bool
}
