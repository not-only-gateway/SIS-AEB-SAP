import React, {useMemo} from "react";

import PropTypes from "prop-types";
import GoalPT from "../../locales/GoalPT";


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

} from 'mfc-core';
import submit from "../../utils/submit";

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
                    data: {...data, value: parseFloat(data.value)},

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

                            handleChange={event => {
                                handleChange({key: 'value', event: event.target.value})
                            }} value={data.value}
                            required={true}
                            width={'calc(33.333% - 21.5px)'}
                        />
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
