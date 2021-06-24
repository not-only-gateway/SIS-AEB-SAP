import PropTypes from 'prop-types'
import shared from "./styles/Form.module.css";
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
        <div className={shared.formContainer}>
            <button className={shared.returnButtonContainer} onClick={() => props.handleClose()}
                    style={{display: props.returnButton ? undefined : 'none'}}>
                <ArrowBackRounded/>
                {lang.return}
            </button>

            {props.forms.map((element, index) => (
                <div style={{width: '100%', display: "grid", gap: '16px'}}>
                    <fieldset className={[shared.fieldsetContainer, shared.formFieldsContainer].join(' ')}>
                        {element.child}
                    </fieldset>
                </div>
            ))}

            <div style={{width: '100%', padding: '16px 0'}}>
                <button
                    className={shared.saveButtonContainer}
                    onClick={() => props.handleSubmit()} disabled={isDisabled()}
                    style={{
                        color: isDisabled() ? '#777777' : 'white',
                        cursor: isDisabled() ? 'auto' : 'pointer',
                        border: isDisabled() ? undefined : 'none',
                        boxShadow: isDisabled() ? 'none' : undefined,
                        background: isDisabled() ? undefined : '#0095ff',
                    }}>
                    {lang.save}
                </button>

            </div>
        </div>
    )
}
FormLayout.propTypes = {
    returnButton: PropTypes.bool,
    forms: PropTypes.arrayOf(
        PropTypes.shape({
            child: PropTypes.object
        })
    ),
    handleSubmit: PropTypes.func,
    dependencies: PropTypes.shape({
        fields: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string,
            type: PropTypes.oneOf(['string', 'number', 'object'])
        })),
        entity: PropTypes.object,
        changed: PropTypes.bool
    }),
    handleClose: PropTypes.func,
}
