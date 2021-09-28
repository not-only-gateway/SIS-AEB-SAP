import React, {useEffect, useState} from "react";
import {
    useQuery,
    Tabs,
    List,
    Modal,
    Selector,
    Form, FormRow,
    DateField,
    DropDownField,
    FileField,
    MultiSelectField,
    Navigation,
    Requester,
    TextField,
    ToolTip
} from "sis-aeb-core";
import PropTypes from "prop-types";
import WorkPlanRequests from "../../utils/requests/WorkPlanRequests";
import GoalPT from "../../locales/GoalPT";

export default function GoalForm(props) {
    const lang = GoalPT

    useEffect(() => {
        if (props.create)
            props.handleChange({name: 'work_plan', value: props.workPlan.id})
    }, [])
    return (
        <>

            <Form
                initialData={props.data}
                create={props.create} title={props.create ? lang.newGoal : lang.goal}
                dependencies={
                    [
                        {name: 'goal_number', type: 'string'},
                        {name: 'detailing', type: 'string'},

                        {name: 'unit_of_measurement', type: 'string'},
                        {name: 'value', type: 'number'},
                        {name: 'initial_situation', type: 'number'},
                        {name: 'final_situation', type: 'number'}
                    ]
                }
                returnButton={props.create}
                handleSubmit={() =>
                    WorkPlanRequests.submitGoal({
                        pk: props.data.id,
                        data: props.data,

                        create: props.create
                    }).then(res => {
                        if (res !== null && props.create)
                            props.redirect(res)
                    })}
                handleClose={() => props.returnToMain()}>
                {(data, handleChange) => (
                    <>
                        <FormRow>
                            <TextField

                                placeholder={lang.goalNumber} label={lang.goalNumber}
                                handleChange={event => {

                                    props.handleChange({name: 'goal_number', value: event.target.value})
                                }}  value={props.data === null ? null : props.data.goal_number}
                                required={true}
                                width={'calc(33.333% - 21.5px)'}/>

                            <TextField
                                placeholder={lang.measurement} label={lang.measurement}
                                handleChange={event => {

                                    props.handleChange({name: 'unit_of_measurement', value: event.target.value})
                                }}
                                value={props.data === null ? null : props.data.unit_of_measurement}
                                required={true}
                                width={'calc(33.333% - 21.5px)'}/>

                            <TextField
                                type={'number'}
                                placeholder={lang.value} label={lang.value}
                                handleChange={event => {

                                    props.handleChange({name: 'value', value: event.target.value})
                                }}  value={props.data === null ? null : props.data.value}
                                required={true}
                                width={'calc(33.333% - 21.5px)'}/>
                            <TextField
                                placeholder={lang.detailing} label={lang.detailing}
                                handleChange={event => {

                                    props.handleChange({name: 'detailing', value: event.target.value})
                                }}  value={props.data === null ? null : props.data.detailing}
                                required={true}
                                width={'100%'}/>


                        </FormRow>

                        <FormRow>
                            <TextField
                                type={'number'}
                                placeholder={lang.initialSituation} label={lang.initialSituation}
                                handleChange={event => {

                                    props.handleChange({name: 'initial_situation', value: event.target.value})
                                }}
                                value={props.data === null ? null : props.data.initial_situation}
                                required={true}
                                width={'calc(50% - 16px)'}/>
                            <TextField
                                type={'number'}
                                placeholder={lang.finalSituation} label={lang.finalSituation}
                                handleChange={event => {

                                    props.handleChange({name: 'final_situation', value: event.target.value})
                                }}  value={props.data === null ? null : props.data.final_situation}
                                required={true}
                                width={'calc(50% - 16px)'}/>

                        </FormRow>
                    </>
                    )}
            </Form>
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
