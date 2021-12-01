import React from "react";

import PropTypes from "prop-types";
import ProjectPT from "../../locales/ProjectPT";

import {Form, FormRow, SelectField, TextField} from "mfc-core";
import submit from "../../utils/submit";

import associativeKeys from "../../keys/associativeKeys";
import FormTemplate from "../../templates/FormTemplate";
import formOptions from "../../templates/formOptions";


export default function NatureExpenseForm(props) {
    const lang = ProjectPT

    return (
        <FormTemplate
            keys={associativeKeys.natureOfExpense}
            endpoint={'nature_of_expense'}
            initialData={props.data}
        >
            {({setOpen, formHook, asDraft, asHistory}) => (
        <Form
            hook={formHook}
            create={props.create}
            title={props.create ? lang.newNatureOfExpense : lang.natureOfExpense}
            options={formOptions({
                asDraft: asDraft,
                asHistory: asHistory,
                setOpen: setOpen,
                create: props.create
            })}
            returnButton={true}
            handleSubmit={(data, clearState) =>
                submit({
                    suffix: 'nature_of_expense',
                    pk: data.id,
                    data: data,
                    create: props.create
                }).then(res => {
                    if (props.create && res.success) {
                        props.handleClose()
                        clearState()
                    }
                })}
            handleClose={() => props.handleClose()}
         >
            {(data, handleChange) => (
                <FormRow>


                    <TextField
                        placeholder={lang.description} label={lang.description}
                        handleChange={event => {
                            handleChange({
                                event: event.target.value,
                                key: 'description'
                            })
                        }} value={data.description}
                        required={true} width={'100%'} variant={'area'}/>

                    <SelectField
                        placeholder={'gnd'}
                        label={'gnd'}
                        handleChange={event => {
                            handleChange({
                                event: event,
                                key: 'gnd'
                            })
                        }} value={data.gnd} required={false}
                        width={'calc(50% - 16px)'} choices={[{key: 3, value: 3}, {key: 4, value: 4}]}/>
                    <TextField
                        placeholder={lang.natureOfExpense} label={lang.natureOfExpense}
                        handleChange={event => {
                            handleChange({
                                event: event.target.value,
                                key: 'nature_of_expense'
                            })
                        }} value={data.nature_of_expense}
                        required={true} width={'calc(50% - 16px)'}
                    />
                </FormRow>
            )}
        </Form>
            )}
        </FormTemplate>
    )

}

NatureExpenseForm.propTypes = {
    handleClose: PropTypes.func,
    create: PropTypes.bool,
    asDefault: PropTypes.bool,
}
