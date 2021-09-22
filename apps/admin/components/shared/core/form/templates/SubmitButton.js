import styles from "../styles/EntityLayout.module.css";
import fStyles from "../styles/Form.module.css";
import React from "react";
import EntityLayoutPT from "../locales/EntityLayoutPT";
import LayoutPropsTemplate from "./FormProps";
import PropTypes from "prop-types";

export default function SubmitButton(props){
    const lang = EntityLayoutPT
    return(
        <div className={[styles.headerContainer, styles.submitContainer].join(' ')}>
            <button
                className={fStyles.saveButton}
                onClick={() => props.handleSubmit()} disabled={props.disabled}
            >
                {props.create ? lang.create : lang.save}
            </button>
        </div>
    )
}
SubmitButton.propTypes={
    ...LayoutPropsTemplate,
    disabled: PropTypes.bool
}