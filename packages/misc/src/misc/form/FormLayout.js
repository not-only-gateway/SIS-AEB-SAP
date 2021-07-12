import PropTypes from 'prop-types'
import styles from "./styles/Form.module.css";
import {ArrowBackRounded, InfoRounded} from "@material-ui/icons";
import React from "react";
import FormPT from "./locales/FormPT";
import entityStyles from './styles/EntityLayout.module.css'

export default function FormLayout(props) {
    const lang = FormPT

    function isDisabled() {

        let response = props.dependencies === undefined || props.entity === null || props.entity === undefined || !props.dependencies.changed
        let i
        if (props.dependencies !== undefined && props.entity !== null && props.entity !== undefined && props.dependencies.changed)
            for (i = 0; i < props.dependencies.fields.length; i++)
                if (props.dependencies.fields[i] !== undefined)
                    response = (
                        response ||
                        props.entity[props.dependencies.fields[i].name] === null ||
                        props.entity[props.dependencies.fields[i].name] === undefined ||
                        (props.dependencies.fields[i].type === 'string' ?
                            props.entity[props.dependencies.fields[i].name].length === 0
                            :
                            false)
                    )

        return response
    }

    return (
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
    hasInfo: PropTypes.bool,
    entity: PropTypes.object,
    create: PropTypes.bool,
    formInfo: PropTypes.object,
    label: PropTypes.string,
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
            type: PropTypes.oneOf(['string', 'number', 'object', 'bool', 'date'])
        })),

        changed: PropTypes.bool
    }),
    handleClose: PropTypes.func,
    openFormInfo: PropTypes.func
}
