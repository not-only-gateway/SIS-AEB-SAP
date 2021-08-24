import PropTypes from 'prop-types'
import styles from "./styles/Form.module.css";
import React from "react";
import FormPT from "./locales/FormPT";
import LayoutPropsTemplate from "./templates/LayoutPropsTemplate";

export default function FormLayout(props) {
    return (
        <div style={{height: '100%', overflow: 'visible'}}>
            <div className={styles.container}>
                <div className={styles.formInfoContainer}
                     style={{display: props.formInfo === undefined || props.formInfo === null ? 'none' : undefined}}>
                    {props.formInfo}
                </div>
                <div className={styles.formContainer}>

                    <div style={{width: '100%', display: "grid", gap: '64px'}}>
                        {props.forms.map((element, index) => (
                            <fieldset className={[styles.fieldsetContainer, styles.formFieldsContainer].join(' ')} key={index+'-form-layout-row'}
                                      style={{
                                          borderTop: element.title === undefined ? undefined : '#e0e0e0 1px solid',
                                          paddingTop: element.title === undefined ? '0' : undefined
                                      }}>
                                <legend
                                    style={{display: element.title === undefined ? 'none' : undefined}}>{element.title}</legend>
                                {element.child}
                            </fieldset>

                        ))}
                    </div>

                </div>

            </div>

        </div>
    )
}
FormLayout.propTypes = LayoutPropsTemplate