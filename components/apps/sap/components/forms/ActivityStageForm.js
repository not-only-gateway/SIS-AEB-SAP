import React, {useMemo, useState} from "react";
import Form from "../../../../core/inputs/form/Form";
import {FormRow, TextField, useQuery} from "mfc-core";
import PropTypes from "prop-types";
import GoalPT from "../../locales/GoalPT";
import useDataWithDraft from "../../../../core/inputs/form/useDataWithDraft";
import Cookies from "universal-cookie/lib";
import submit from "../../utils/requests/submit";
import getQuery from "../../queries/getQuery";
import Selector from "../../../../core/inputs/selector/Selector";
import workPlanKeys from "../../keys/workPlanKeys";
import Host from "../../utils/shared/Host";
export default function ActivityStageForm(props) {
    const lang = GoalPT
    const initialData = useMemo(() => {
        return {...props.data, goal: props.goal?.id}
    }, [])
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
    
    const goalHook = useQuery(getQuery('work_plan_goal', props.workPlan ? {work_plan: props.workPlan.id} : undefined))
    return (
        <Form
            hook={formHook}
            create={props.create} title={props.create ? lang.newStage : lang.stage}
            dependencies={
                [
                    {key: 'stage', type: 'string'},
                    {key: 'description', type: 'string'},
                    {key: 'representation', type: 'number'},
                    {key: 'goal', type: 'object'},
                ]
            }
            returnButton={true}
            noHeader={!props.create}
            handleSubmit={(data, clearState) =>
                submit({
                    suffix: 'activity_stage',
                    pk: data.id,
                    data: {...data, goal: data.goal.id},
                    create: props.create
                }).then(res => {
                    if (res.success && props.create)
                        props.handleClose()
                })}
            handleClose={() => props.handleClose()}>
            {(data, handleChange) => (
                <FormRow>
                    {props.goal !== null && props.goal !== undefined ? null :
                        <Selector
                            hook={goalHook} keys={workPlanKeys.goal} value={data.goal}
                            width={'calc(50% - 16px)'} required={true} handleChange={e => {
                            handleChange({key: 'goal', event: e})
                        }} title={'Meta plano de tabalho'} placeholder={'Meta plano de tabalho'}
                        />
                    }
                    <TextField
                        type={'number'}
                        placeholder={lang.stage} label={lang.stage}
                        handleChange={event => {
                            handleChange({key: 'stage', event: event.target.value})
                        }} value={data.stage}
                        required={true}
                        width={props.goal !== null && props.goal !== undefined ? 'calc(33.333% - 21.5px)' : 'calc(50% - 16px)'}/>

                    <TextField
                        placeholder={lang.description} label={lang.description}
                        handleChange={event => {

                            handleChange({key: 'description', event: event.target.value})
                        }} value={data.description}
                        required={true}
                        width={props.goal !== null && props.goal !== undefined ? 'calc(33.333% - 21.5px)' : 'calc(50% - 16px)'}/>

                    <TextField
                        placeholder={lang.representation} label={lang.representation}
                        handleChange={event => {

                            handleChange({key: 'representation', event: event.target.value})
                        }} currencyMask={true} maskEnd={'%'}
                        value={data.representation}
                        required={true} type={'number'}
                        width={props.goal !== null && props.goal !== undefined ? 'calc(33.333% - 21.5px)' : 'calc(50% - 16px)'}/>
                </FormRow>
            )}
        </Form>
    )

}

ActivityStageForm.propTypes = {
    data: PropTypes.object,
    handleChange: PropTypes.func,
    handleClose: PropTypes.func,
    create: PropTypes.bool,
    goal: PropTypes.object,
    workPlan: PropTypes.object,
    draftID: PropTypes.number,
}
