import styles from './styles/Form.module.css'
import React from "react";
import useForm from "./hooks/useForm";
import Header from "./templates/Header";
import SubmitButton from "./templates/SubmitButton";
import PropTypes from "prop-types";

export default function Form(props) {
    const {
        ref, disabled,
        data, handleChange
    } = useForm({noAutoHeight: props.noAutoHeight, initialData: props.data, dependencies: props.dependencies})

    return (

        <div ref={ref} className={styles.container} style={{
            boxShadow: props.noShadow ? 'none' : undefined,
            alignContent: props.noAutoHeight ? 'space-between' : undefined
        }}>
            <Header title={props.title} returnButton={props.returnButton} noHeader={props.noHeader} handleClose={props.handleClose}/>
            <div style={{padding: '16px'}}>
                {props.children(data, handleChange)}
            </div>
            <SubmitButton submit={props.handleSubmit} data={data} create={props.create} disabled={disabled}/>
        </div>
    )
}
Form.propTypes = {
    noAutoHeight: PropTypes.bool,
    noHeader: PropTypes.bool,
    returnButton: PropTypes.bool,
    title: PropTypes.string,

    initialData: PropTypes.object,
    children: PropTypes.func,
    create: PropTypes.bool,

    handleSubmit: PropTypes.func,
    dependencies: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        type: PropTypes.oneOf(['string', 'number', 'object', 'bool', 'date'])
    })),
    handleClose: PropTypes.func
}
