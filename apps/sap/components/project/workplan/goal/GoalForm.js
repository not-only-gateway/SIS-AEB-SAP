import React, {useEffect, useState} from "react";
import Form from "../../../shared/core/form/Form";
import {TextField} from "sis-aeb-core";
import PropTypes from "prop-types";
import WorkPlanRequests from "../../../../utils/requests/WorkPlanRequests";
import GoalPT from "../../../../packages/locales/GoalPT";

export default function GoalForm(props) {
    const [changed, setChanged] = useState(false)
    const lang = GoalPT

    useEffect(() => {
        if (props.create)
                props.handleChange({name: 'work_plan', value: props.workPlan.id})
    }, [])
    return (
        <>

            <Form
                rootElementID={'root'} entity={props.data}
                create={props.create} label={props.create ? lang.newGoal : lang.goal}
                dependencies={{
                    fields: [
                        {name: 'goal_number', type: 'string'},
                        {name: 'detailing', type: 'string'},

                        {name: 'unit_of_measurement', type: 'string'},
                        {name: 'value', type: 'number'},
                        {name: 'initial_situation', type: 'number'},
                        {name: 'final_situation', type: 'number'}
                    ],
                    changed: changed
                }}
                returnButton={props.create}
                handleSubmit={() =>
                    WorkPlanRequests.submitGoal({
                        pk: props.data.id,
                        data: props.data,

                        create: props.create
                    }).then(res => {
                        if (res !== null && props.create)
                            props.redirect(res)

                        if (!props.create && res)
                            setChanged(false)
                    })}
                handleClose={() => props.returnToMain()}
                forms={[{
                    child: (
                        <>
                            <TextField

                                placeholder={lang.goalNumber} label={lang.goalNumber}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'goal_number', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.goal_number}
                                required={true}
                                width={'calc(33.333% - 21.5px)'}/>

                            <TextField
                                placeholder={lang.measurement} label={lang.measurement}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'unit_of_measurement', value: event.target.value})
                                }} locale={props.locale}
                                value={props.data === null ? null : props.data.unit_of_measurement}
                                required={true}
                                width={'calc(33.333% - 21.5px)'}/>

                            <TextField
                                type={'number'}
                                placeholder={lang.value} label={lang.value}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'value', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.value}
                                required={true}
                                width={'calc(33.333% - 21.5px)'}/>
                            <TextField
                                placeholder={lang.detailing} label={lang.detailing}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'detailing', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.detailing}
                                required={true}
                                width={'100%'}/>



                        </>
                    )
                }, {
                    child: (
                        <>
                            <TextField
                                type={'number'}
                                placeholder={lang.initialSituation} label={lang.initialSituation}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'initial_situation', value: event.target.value})
                                }} locale={props.locale}
                                value={props.data === null ? null : props.data.initial_situation}
                                required={true}
                                width={'calc(50% - 16px)'}/>
                            <TextField
                                type={'number'}
                                placeholder={lang.finalSituation} label={lang.finalSituation}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'final_situation', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.final_situation}
                                required={true}
                                width={'calc(50% - 16px)'}/>
                        </>
                    )
                }]}/>
        </>
    )

}

GoalForm.propTypes = {
    id: PropTypes.number,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    workPlan: PropTypes.object
}
