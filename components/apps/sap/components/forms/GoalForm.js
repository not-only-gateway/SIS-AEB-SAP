import React, {useEffect, useState} from "react";
import {FormRow, TextField} from "mfc-core";
import PropTypes from "prop-types";
import GoalPT from "../../locales/GoalPT";
import Form from "../../../../core/inputs/form/Form";
import useDataWithDraft from "../../../../core/inputs/form/useDataWithDraft";
import Cookies from "universal-cookie/lib";
import submit from "../../utils/requests/submit";
import Host from "../../utils/shared/Host";


export default function GoalForm(props) {
    const lang = GoalPT
    const [initialData, setInitialData] = useState(null)
        const [draftID, setDraftID] = useState(props.draftID)
    const formHook = useDataWithDraft({
        initialData: initialData,
    draftUrl: Host().replace('api', 'draft') + 'action',
        draftHeaders: {'authorization': (new Cookies()).get('jwt')},
        interval: 120000,
        parsePackage: pack => {
            return {
                ...pack,
                identifier: draftID
            }
        },
        draftMethod: draftID ? 'put' : 'post',
        onSuccess: (res) => {
            setDraftID(res.data.id)
        }
    })
    


    useEffect(() => {
        if (props.create)
            setInitialData({
                ...props.data,
                ...{
                    work_plan: props.workPlan.id
                }
            })

    }, [])
    return (
        <Form
            hook={formHook}
            initialData={initialData}
            create={props.create} title={props.create ? lang.newGoal : lang.goal}
            dependencies={
                [
                    {key: 'goal_number', type: 'string'},
                    {key: 'detailing', type: 'string'},

                    {key: 'unit_of_measurement', type: 'string'},
                    {key: 'value', type: 'number'},
                    {key: 'initial_situation', type: 'number'},
                    {key: 'final_situation', type: 'number'}
                ]
            }
            returnButton={true}
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
    )

}

GoalForm.propTypes = {

    data: PropTypes.object,

    handleClose: PropTypes.func,
    create: PropTypes.bool,
    workPlan: PropTypes.object,
    draftID: PropTypes.number,
}
