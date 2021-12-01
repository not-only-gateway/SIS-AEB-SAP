import React, {useMemo} from "react";

import {Form, FormRow, TextField} from 'mfc-core'
import PropTypes from "prop-types";
import StatusPT from "../../locales/StatusPT";

import submit from "../../utils/submit";

import workPlanKeys from "../../keys/workPlanKeys";
import FormTemplate from "../../templates/FormTemplate";
import formOptions from "../../templates/formOptions";


export default function StatusForm(props) {
    const lang = StatusPT

    const initialData = useMemo(() => {
        if (props.create)
            return {
                ...props.data,
                ...{
                    work_plan: props.workPlan?.id
                }
            }
        else return props.data
    }, [props])

    return (
        <FormTemplate
            keys={workPlanKeys.status}
            endpoint={'status'}
            initialData={initialData}
        >
            {({setOpen, formHook, asDraft, asHistory}) => (
                <Form
                    hook={formHook}
                    create={props.create}
                    title={props.create ? lang.newStatus : lang.status}
                    returnButton={true}
                    options={formOptions({
                        asDraft: asDraft,
                        asHistory: asHistory,
                        setOpen: setOpen,
                        create: props.create
                    })}
                    handleSubmit={(data, clearState) =>
                        submit({
                            suffix: 'status',
                            pk: data.id,
                            data: {
                                ...data,
                                update_date: (new Date()).toDateString()
                            },
                            create: props.create
                        }).then(res => {
                            if (props.create && res.success) {
                                props.handleClose()
                                clearState()
                            }
                        })}
                    handleClose={() => props.handleClose()}>
                    {(data, handleChange) => (
                        <FormRow>

                            <TextField

                                placeholder={lang.status} label={lang.status}
                                handleChange={event => {

                                    handleChange({key: 'status', event: event.target.value})
                                }} value={data.status}
                                required={true}
                                width={'100%'} variant={'area'}/>

                            <TextField
                                placeholder={lang.difficulties} label={lang.difficulties}
                                handleChange={event => {

                                    handleChange({key: 'difficulties', event: event.target.value})
                                }} value={data.difficulties}
                                required={true}
                                width={'100%'} variant={'area'}/>

                        </FormRow>
                    )}
                </Form>
            )}
        </FormTemplate>
    )

}

StatusForm.propTypes = {
    id: PropTypes.number,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    handleClose: PropTypes.func,
    create: PropTypes.bool,
    workPlan: PropTypes.object,
}
