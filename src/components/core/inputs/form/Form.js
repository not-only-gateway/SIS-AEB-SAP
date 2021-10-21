import styles from './styles/Form.module.css'
import React from "react";
import useForm from "./hooks/useForm";
import Header from "./templates/Header";
import SubmitButton from "./templates/SubmitButton";
import PropTypes from "prop-types";

export default function Form(props) {
    const {
        ref, disabled
    } = useForm({
        noAutoHeight: props.noAutoHeight,
        dependencies: props.dependencies,
        data: props.hook.data,
        changed: props.hook.changed
    })

    return (
        <div ref={ref} className={styles.container} style={{

            alignContent: props.noAutoHeight ? 'space-between' : undefined,
            borderColor: props.noBorder ? 'transparent' : undefined
        }}>
            <Header title={props.title} returnButton={props.returnButton} noHeader={props.noHeader}
                    handleClose={props.handleClose}/>
            <div style={{padding: props.noPadding ? '0' : '16px', overflow: 'visible'}}>
                {props.children(props.hook.data, props.hook.handleChange)}
            </div>
            <SubmitButton
                noBorder={props.noBorder} noPadding={props.noPadding}
                submit={(e, i) => {
                    props.handleSubmit(e, i)
                    props.hook.setChanged(false)
                }} data={props.hook.data}
                clearState={props.hook.clearState} create={props.create}
                disabled={disabled}
                submitLabel={props.submitLabel}
            />
        </div>
    )
}
Form.propTypes = {
    noAutoHeight: PropTypes.bool,
    noHeader: PropTypes.bool,
    noPadding: PropTypes.bool,
    noBorder: PropTypes.bool,
    returnButton: PropTypes.bool,
    title: PropTypes.string,

    hook: PropTypes.object.isRequired,
    children: PropTypes.func,
    create: PropTypes.bool,

    handleSubmit: PropTypes.func,
    dependencies: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        type: PropTypes.oneOf(['string', 'number', 'object', 'bool', 'date', 'array'])
    })),
    handleClose: PropTypes.func,
    submitLabel: PropTypes.func
}
