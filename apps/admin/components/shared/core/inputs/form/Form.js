import styles from './styles/EntityLayout.module.css'
import React from "react";
import useForm from "./hooks/useForm";
import Header from "./templates/Header";
import SubmitButton from "./templates/SubmitButton";
import PropTypes from "prop-types";

export default function Form(props) {
    const {
        ref,disabled,
        openOptions, setOpenOptions,
        fields
    } = useForm(props.noAutoHeight, props.forms, props.entity, props.dependencies)

    return (

        <div ref={ref} className={styles.container} style={{
            boxShadow: props.noShadow ? 'none' : undefined,
            alignContent: props.noAutoHeight ? 'space-between' : undefined
        }}>
            <Header {...props} openOptions={openOptions} setOpenOptions={setOpenOptions}/>
            <div style={{padding: '16px'}}>
                {fields}
            </div>
            <SubmitButton {...props} disabled={disabled}/>
        </div>
    )
}
Form.propTypes = {
    noAutoHeight: PropTypes.bool,
    noHeader: PropTypes.bool,
    returnButton: PropTypes.bool,
    label: PropTypes.string,
    entity: PropTypes.object,
    create: PropTypes.bool,
    forms: PropTypes.arrayOf(
        PropTypes.shape({
            child: PropTypes.node,
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
    handleClose: PropTypes.func
}
