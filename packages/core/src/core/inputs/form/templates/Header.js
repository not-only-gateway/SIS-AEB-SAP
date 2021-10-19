import styles from "../styles/Form.module.css";
import {ArrowBackRounded} from "@material-ui/icons";
import React from "react";
import PropTypes from "prop-types";

export default function Header(props) {
    return (
        <div className={styles.headerContainer} style={{display: props.noHeader ? 'none' : undefined}}>
            <div className={styles.header}>
                <button className={styles.buttonContainer}
                        style={{display: props.returnButton ? undefined : 'none'}}
                        onClick={() => props.handleClose()}>
                    <ArrowBackRounded/>
                </button>
                {props.title}

            </div>
        </div>
    )
}

Header.propTypes = {
    noHeader: PropTypes.bool,
    handleClose: PropTypes.func,
    title: PropTypes.string,
    returnButton : PropTypes.bool
}
