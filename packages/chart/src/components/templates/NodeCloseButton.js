import PropTypes from "prop-types";
import styles from "../styles/NodeMisc.module.css";
import {CloseRounded} from "@material-ui/icons";
import React from "react";

export default function NodeCloseButton(props) {
    return (
        <button
            className={styles.closeButton}
            style={{
                display: props.visible ? undefined : 'none',
                height: props.smaller ? '28px' : '38px',
                width: props.smaller ? '28px' : '38px',
                right: props.smaller ? '-14px' : '-19px',
                top: props.smaller ? '-14px' : '-19px',
                zIndex: props.smaller ? '250' : '500'
            }}
            onClick={() => props.handleClose()}>
            <CloseRounded style={{fontSize: props.smaller ? '1.1rem' : '1.4rem'}}/>
        </button>
    )
}

NodeCloseButton.propTypes = {
    smaller: PropTypes.bool,
    handleClose: PropTypes.func,
    visible: PropTypes.bool
}