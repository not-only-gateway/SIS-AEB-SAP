import React, {useMemo} from "react";

import {Form, FormRow, TextField} from "mfc-core";
import PropTypes from "prop-types";
import ExecutionPT from "../../locales/ExecutionPT";

import submit from "../../utils/submit";

import workPlanKeys from "../../keys/workPlanKeys";
import FormTemplate from "../../../../addons/FormTemplate";
import formOptions from "../../../../addons/formOptions";


export default function NoteForm(props) {
    const lang = ExecutionPT
    const initialData = useMemo(() => {
        return {
            ...props.data,
            ...{
                operation_phase: props.operation
            }
        }
    }, [props])


    return (
        <FormTemplate
            keys={workPlanKeys.note}
            endpoint={'commitment_note'}
            initialData={initialData}
        >
            {({setOpen, formHook, asDraft, asHistory}) => (
        <Form
            hook={formHook}
            options={formOptions({
                asDraft: asDraft,
                asHistory: asHistory,
                setOpen: setOpen,
                create: props.create
            })}
            create={props.create} title={props.create ? lang.newNote : lang.note}
            returnButton={true}
            handleSubmit={(data, clearState) =>
                submit({
                    suffix: 'commitment_note',
                    pk: data.id,
                    data: data,
                    create: props.create
                }).then(res => {
                    if (props.create && res.success) {
                        props.handleClose()
                        clearState()
                    }
                })

            }
            handleClose={() => props.handleClose()}>
            {(data, handleChange) => (
                <FormRow>

                    <TextField

                        placeholder={lang.number} label={lang.number}
                        handleChange={event => {

                            handleChange({key: 'number', event: event.target.value})

                        }}
                        value={data.number}
                        required={true}
                        width={'calc(50% - 16px)'}/>


                    <TextField
                        placeholder={lang.value} label={lang.value}
                        maskStart={'R$'}
                        floatFilter={true}
                        handleChange={event => {

                            handleChange({key: 'value', event: event.target.value})
                        }} value={data.value}

                        required={true} type={'number'}
                        width={'calc(50% - 16px)'}/>

                </FormRow>
            )}
        </Form>
            )}
        </FormTemplate>
    )

}

NoteForm.propTypes = {
    id: PropTypes.number,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    handleClose: PropTypes.func,
    create: PropTypes.bool,
    operation: PropTypes.object,
}
