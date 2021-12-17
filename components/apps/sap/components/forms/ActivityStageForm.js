import React, {useMemo} from "react";
import {
    useCopyToClipboard, useFile,

    Empty,
    request, Alert, ToolTip,

    Selector, Form, FormRow, DateField,
    SelectField, MultiSelectField,
    TextField, Button, Checkbox, CheckboxGroup,
    FileField,

    ThemeContext, MfcWrapper, Ripple,

    ScrollStepper, StepperWrapper,
    Tab, Tabs, VerticalTabs, Modal, Breadcrumbs,
    Carousel, DynamicRoutes, Switcher, RailActionButton,
    RailContext, NavigationRail, Dropdown, RailActionWrapper,

    List,  Feed, FeedCard, Filter,
    useInfiniteScroll, useQuery

} from 'mfc-core'

import PropTypes from "prop-types";
import GoalPT from "../../locales/GoalPT";
import submit from "../../utils/submit";
import getQuery from "../../utils/getQuery";

import workPlanKeys from "../../keys/workPlanKeys";

import FormTemplate from "../../../../addons/FormTemplate";
import formOptions from "../../../../addons/formOptions";


export default function ActivityStageForm(props) {
    const lang = GoalPT
    const initialData = useMemo(() => {
        return {...props.data, goal: props.goal?.id}
    }, [props])

    const goalHook = useQuery(getQuery('work_plan_goal', props.workPlan ? {work_plan: props.workPlan.id} : undefined))
    return (
        <FormTemplate
            keys={workPlanKeys.activity}
            endpoint={'activity_stage'}
            initialData={initialData}
        >
            {({setOpen, formHook, asDraft, asHistory}) => (
        <Form
            hook={formHook}
            create={props.create} title={props.create ? lang.newStage : lang.stage}

            returnButton={true}
            options={formOptions({
                asDraft: asDraft,
                asHistory: asHistory,
                setOpen: setOpen,
                create: props.create
            })}
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
                        }} label={'Meta plano de tabalho'} placeholder={'Meta plano de tabalho'}
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
                        }} floatFilter={true} maskEnd={'%'}
                        value={data.representation}
                        required={true} type={'number'}
                        width={props.goal !== null && props.goal !== undefined ? 'calc(33.333% - 21.5px)' : 'calc(50% - 16px)'}/>
                </FormRow>
            )}
        </Form>
            )}
        </FormTemplate>
    )

}

ActivityStageForm.propTypes = {
    data: PropTypes.object,
    handleChange: PropTypes.func,
    handleClose: PropTypes.func,
    create: PropTypes.bool,
    goal: PropTypes.object,
    workPlan: PropTypes.object,
}
