import PropTypes from 'prop-types'
import styles from "./styles/Form.module.css";
import React from "react";

export default function FormRow(props){

    return(
        <fieldset className={[styles.fieldsetContainer, styles.formFieldsContainer].join(' ')}
                  style={{
                      borderTop: props.title === undefined ? 'none' : undefined,
                      paddingTop: props.title === undefined ? '0' : undefined
                  }}>
            <legend style={{display: props.title === undefined ? 'none' : undefined}} className={styles.legend}>{props.title}</legend>
            {props.children}
        </fieldset>
    )
}

FormRow.propTypes ={
    children: PropTypes.node,
    title: PropTypes.string
}