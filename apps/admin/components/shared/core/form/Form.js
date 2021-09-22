import styles from './styles/EntityLayout.module.css'
import React from "react";
import LayoutPropsTemplate from "./templates/FormProps";
import useForm from "./hooks/useForm";
import Header from "./templates/Header";
import SubmitButton from "./templates/SubmitButton";

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
Form.propTypes = LayoutPropsTemplate
