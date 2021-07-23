import React, {useEffect, useState} from "react";
import ProjectPT from "../../packages/locales/ProjectPT";
import {Alert} from "sis-aeb-misc";
import EntityLayout from "../shared/misc/form/EntityLayout";
import submitProject from "../../utils/submit/SubmitProject";
import {TextField} from "sis-aeb-inputs";
import PropTypes from "prop-types";
import ProjectRequests from "../../utils/fetch/ProjectRequests";
import WorkPlanRequests from "../../utils/fetch/WorkPlanRequests";

export default function GoalForm(props) {
    const [changed, setChanged] = useState(false)
    const lang = ProjectPT
    const [status, setStatus] = useState({
        type: undefined, message: undefined
    })
    useEffect(() => {
        props.handleChange({name: 'work_plan', value: props.workPlan.id})
    }, [])
    return (
        <>
            <Alert
                type={status.type} render={status.type !== undefined} rootElementID={'root'}
                handleClose={() => setStatus({type: undefined, message: undefined})} message={status.message}
            />
            <EntityLayout
                rootElementID={'root'} entity={props.data}
                create={props.create} label={lang.risksTitle}
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
                returnButton={true}
                handleSubmit={() =>
                    WorkPlanRequests.submitGoal({
                        pk: props.id,
                        data: props.data,
                        setStatus: setStatus,
                        create: props.create
                    }).then(res => {
                        setChanged(!res)
                    })}
                handleClose={() => props.returnToMain()}
                forms={[{
                    child: (
                        <>
                            <TextField

                                placeholder={lang.number} label={lang.number}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'goal_number', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.goal_number}
                                required={true}
                                width={'calc(50% - 16px)'}/>


                            <TextField
                                placeholder={lang.detailing} label={lang.detailing}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'detailing', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.detailing}
                                required={true}
                                width={'calc(50% - 16px)'}/>

                            <TextField
                                placeholder={lang.measurement} label={lang.measurement}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'unit_of_measurement', value: event.target.value})
                                }} locale={props.locale}
                                value={props.data === null ? null : props.data.unit_of_measurement}
                                required={true}
                                width={'calc(50% - 16px)'}/>
                            
                            <TextField
                                type={'number'}
                                placeholder={lang.value} label={lang.value}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'value', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.value}
                                required={true}
                                width={'calc(50% - 16px)'}/>

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
