import styles from "../styles/Form.module.css";
import React from "react";
import EntityLayoutPT from "../locales/EntityLayoutPT";
import PropTypes from "prop-types";

export default function SubmitButton(props){
    const lang = EntityLayoutPT
    return(
        <div className={[styles.headerContainer, styles.submitContainer].join(' ')}>
            <button
                className={styles.saveButton}
                onClick={() => props.submit(props.data)} disabled={props.disabled}
            >
                {props.create ? lang.create : lang.save}
            </button>
        </div>
    )
}
SubmitButton.propTypes={
    data: PropTypes.object,
    submit: PropTypes.func,
    create: PropTypes.bool,
    disabled: PropTypes.bool
}