import React, {useEffect, useMemo, useState} from "react";
import { TextField} from "mfc-core";
import PropTypes from "prop-types";
import GoalPT from "../../locales/GoalPT";
import Form from "../../../../core/inputs/form/Form";
import useDataWithDraft from "../../../../core/inputs/form/useDataWithDraft";
import Cookies from "universal-cookie/lib";
import submit from "../../utils/requests/submit";
import Host from "../../utils/shared/Host";
import FormRow from "../../../../core/inputs/form/FormRow";
import tedKeys from "../../keys/tedKeys";
import workPlanKeys from "../../keys/workPlanKeys";
import FormTemplate from "../../templates/FormTemplate";
import formOptions from "../../templates/formOptions";


export default function GoalForm(props) {
    const lang = GoalPT
    const initialData = useMemo(() => {
        return props.create ? {
            ...props.data,
            ...{
                work_plan: props.workPlan.id
            }
        } : props.data
    }, [props])

    return (
        <FormTemplate

            keys={workPlanKeys.goal}
            endpoint={'work_plan_goal'}
            initialData={initialData}
        >
            {({setOpen, formHook, asDraft, asHistory}) => (
        <Form
            hook={formHook}
            create={props.create} title={props.create ? lang.newGoal : lang.goal}
            returnButton={true}
            options={formOptions({
                asDraft: asDraft,
                asHistory: asHistory,
                setOpen: setOpen,
                create: props.create
            })}
            handleSubmit={(data, clearState) =>
                submit({
                    suffix: 'work_plan_goal',
                    pk: data.id,
                    data: data,

                    create: props.create
                }).then(res => {
                    if (res.success && props.create)
                        props.handleClose()
                })}
            handleClose={() => props.handleClose()}>
            {(data, handleChange) => (
                <>
                    <FormRow>
                        <TextField

                            placeholder={lang.goalNumber} label={lang.goalNumber}
                            handleChange={event => {

                                handleChange({key: 'goal_number', event: event.target.value})
                            }} value={data.goal_number}
                            required={true}
                            width={'calc(33.333% - 21.5px)'}/>

                        <TextField
                            placeholder={lang.measurement} label={lang.measurement}
                            handleChange={event => {

                                handleChange({key: 'unit_of_measurement', event: event.target.value})
                            }}
                            value={data.unit_of_measurement}
                            required={true}
                            width={'calc(33.333% - 21.5px)'}/>

                        <TextField
                            type={'number'}
                            placeholder={lang.value} label={lang.value}
                            currencyMask={true}
                            maskStart={'R$'}
                            handleChange={event => {

                                handleChange({key: 'value', event: event.target.value})
                            }} value={data.value}
                            required={true}
                            width={'calc(33.333% - 21.5px)'}/>
                        <TextField
                            placeholder={lang.detailing} label={lang.detailing}
                            handleChange={event => {

                                handleChange({key: 'detailing', event: event.target.value})
                            }} value={data.detailing}
                            required={true}
                            width={'100%'}/>


                    </FormRow>

                    <FormRow>
                        <TextField
                            type={'number'}
                            placeholder={lang.initialSituation} label={lang.initialSituation}
                            handleChange={event => {

                                handleChange({key: 'initial_situation', event: event.target.value})
                            }}
                            value={data.initial_situation}
                            required={true}
                            width={'calc(50% - 16px)'}/>
                        <TextField
                            type={'number'}
                            placeholder={lang.finalSituation} label={lang.finalSituation}
                            handleChange={event => {

                                handleChange({key: 'final_situation', event: event.target.value})
                            }} value={data.final_situation}
                            required={true}
                            width={'calc(50% - 16px)'}/>

                    </FormRow>
                </>
            )}
        </Form>
            )}
        </FormTemplate>
    )

}

GoalForm.propTypes = {

    data: PropTypes.object,

    handleClose: PropTypes.func,
    create: PropTypes.bool,
    workPlan: PropTypes.object,
}
