import PropTypes from 'prop-types'
import styles from "../styles/Form.module.css";
import React from "react";

export default function Row(props){

    return(
        <fieldset className={[styles.fieldsetContainer, styles.formFieldsContainer].join(' ')}
                  style={{
                      borderTop: props.title === undefined ? undefined : '#e0e0e0 1px solid',
                      paddingTop: props.title === undefined ? '0' : undefined
                  }}>
            <legend style={{display: props.title === undefined ? 'none' : undefined}}>{props.title}</legend>
            {props.children}
        </fieldset>
    )
}

Row.propTypes ={
    children: PropTypes.node,
    title: PropTypes.string
}