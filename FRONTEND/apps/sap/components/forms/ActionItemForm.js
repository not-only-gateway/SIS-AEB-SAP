import React, {useMemo} from "react";

import PropTypes from "prop-types";
import OperationPT from "../../locales/OperationPT";
import {Form, FormRow, SelectField, TextField} from 'mfc-core'
import submit from "../../utils/submit";

import workPlanKeys from "../../keys/workPlanKeys";
import FormTemplate from "../../../../templates/FormTemplate";
import FORM_OPTIONS from "../../../../static/FORM_OPTIONS";

export default function ActionItemForm(props) {
    const lang = OperationPT
    const initialData = useMemo(() => {
        return {
            ...props.data,
            ...{
                operation_phase: props.operation?.id
            }
        }
    }, [props])


    return (
        <FormTemplate
            keys={workPlanKeys.action}
            endpoint={'action_item'}
            initialData={initialData}
        >
            {({setOpen, formHook, asDraft, asHistory}) => (
                <Form
                    hook={formHook}
                    create={props.create}
                    returnButton={true} handleClose={() => props.handleClose()}
                    options={FORM_OPTIONS({
                        asDraft: asDraft,
                        asHistory: asHistory,
                        setOpen: setOpen,
                        create: props.create
                    })}
                    title={props.create ? lang.newAction : lang.action}


                    handleSubmit={(data, clearState) =>
                        submit({
                            suffix: 'action_item',
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
                >
                    {(data, handleChange) => (

                        <FormRow>
                            <TextField
                                placeholder={lang.detailing} label={lang.detailing}
                                handleChange={event => {
                                    handleChange({key: 'detailing', event: event.target.value})
                                }} value={data.detailing}
                                required={true}
                                width={'100%'}/>
                            <SelectField
                                dark={true}
                                placeholder={lang.accomplished}
                                label={lang.accomplished}
                                handleChange={event => {
                                    handleChange({key: 'accomplished', event: event})
                                }} value={data.accomplished} required={true}
                                width={'100%'} choices={lang.options}/>
                        </FormRow>
                    )}
                </Form>
            )}
        </FormTemplate>

    )

}

ActionItemForm.propTypes = {
    id: PropTypes.number,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    handleClose: PropTypes.func,
    create: PropTypes.bool,
    operation: PropTypes.object,
}
