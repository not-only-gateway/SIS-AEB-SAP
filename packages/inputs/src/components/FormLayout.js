import PropTypes from 'prop-types'
import styles from "./styles/Form.module.css";
import {ArrowBackRounded} from "@material-ui/icons";
import React from "react";
import FormPT from "./locales/FormPT";

export default function FormLayout(props) {
  const lang = FormPT

  function isDisabled() {

    let response = props.dependencies === undefined || props.dependencies === null || props.dependencies.entity === null || props.dependencies.entity === undefined || !props.dependencies.changed
    let i
    if (props.dependencies !== undefined && props.dependencies !== null && props.dependencies.entity !== null && props.dependencies.entity !== undefined && props.dependencies.changed)
      for (i = 0; i < props.dependencies.fields.length; i++)
        if (props.dependencies.fields[i] !== undefined && props.dependencies.fields[i] !== null)
          response = (
            response ||
            props.dependencies.entity[props.dependencies.fields[i].name] === null ||
            props.dependencies.entity[props.dependencies.fields[i].name] === undefined ||
            (props.dependencies.fields[i].type === 'string' ?
              props.dependencies.entity[props.dependencies.fields[i].name].length === 0
              :
              false)
          )

    return response
  }

  return (
    <div className={styles.container}>
      <div className={styles.labelContainer}>
        <button className={styles.returnButtonContainer} onClick={() => props.handleClose()}
                style={{display: props.returnButton ? undefined : 'none'}}>
          <ArrowBackRounded/>
        </button>
        {props.formLabel}
      </div>
      <div className={styles.formInfoContainer}
           style={{display: props.formInfo === undefined || props.formInfo === null ? 'none' : undefined}}>
        {props.formInfo}
      </div>
      <div className={styles.formContainer}>

        <div style={{width: '100%', display: "grid", gap: '64px'}}>
          {props.forms.map((element, index) => (

            <fieldset className={[styles.fieldsetContainer, styles.formFieldsContainer].join(' ')}
                      style={{borderTop: element.title === undefined || element.title === null ? undefined : '#e0e0e0 1px solid'}}>
              <legend
                style={{display: element.title === undefined || element.title === null ? 'none' : undefined}}>{element.title}</legend>
              {element.child}
            </fieldset>

          ))}
        </div>

        <button
          className={styles.saveButtonContainer}
          onClick={() => props.handleSubmit()} disabled={isDisabled()}
          style={{
            color: isDisabled() ? '#777777' : 'white',
            cursor: isDisabled() ? 'auto' : 'pointer',
            border: isDisabled() ? undefined : 'none',
            boxShadow: isDisabled() ? 'none' : undefined,
            background: isDisabled() ? undefined : '#0095ff',
          }}>
          {props.create ? lang.create : lang.save}
        </button>


      </div>
    </div>
  )
}
FormLayout.propTypes = {
  create: PropTypes.bool,
  formInfo: PropTypes.object,
  formLabel: PropTypes.string,
  returnButton: PropTypes.bool,
  forms: PropTypes.arrayOf(
    PropTypes.shape({
      child: PropTypes.object,
      title: PropTypes.string
    })
  ),
  handleSubmit: PropTypes.func,
  dependencies: PropTypes.shape({
    fields: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.oneOf(['string', 'number', 'object', 'bool'])
    })),
    entity: PropTypes.object,
    changed: PropTypes.bool
  }),
  handleClose: PropTypes.func,

}
