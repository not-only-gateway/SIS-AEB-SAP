import React from "react";
import {useQuery} from "mfc-core";
import PropTypes from "prop-types";
import OperationPT from "../../locales/OperationPT";
import Form from "../../../../core/inputs/form/Form";
import getQuery from "../../utils/getQuery";
import Selector from "../../../../core/inputs/selector/Selector";
import submit from "../../utils/submit";
import ActivityStageForm from "./ActivityStageForm";
import workPlanKeys from "../../keys/workPlanKeys";
import FormRow from "../../../../core/inputs/form/FormRow";
import FormTemplate from "../../templates/FormTemplate";
import formOptions from "../../templates/formOptions";
import TextField from "../../../../core/inputs/text/TextField";
import DateField from "../../../../core/inputs/date/DateField";

export default function OperationForm(props) {

    const activityHook = useQuery(getQuery('activity_stage', undefined,
        props.workPlan ? [{
            key: 'goal',
            sub_relation: {
                key: 'work_plan'
            },
            value: props.workPlan.id,
            type: 'object'
        }] : []))
    const lang = OperationPT



    return (
        <FormTemplate
            keys={workPlanKeys.operation}
            endpoint={'operation_phase'}
            initialData={props.data}
        >
            {({setOpen, formHook, asDraft, asHistory}) => (
        <Form
            hook={formHook}
            options={formOptions({
                asDraft: asDraft,
                asHistory: asHistory,
                setOpen: setOpen,
                create: props.create
            })}
            create={props.create} title={props.create ? lang.newOperation : lang.operation}
            returnButton={props.create}
            handleSubmit={(data, clearState) =>
                submit({
                    suffix: 'operation_phase',
                    pk: data.id,
                    data: data,
                    create: props.create
                }).then(res => {
                    if (props.create && res.success) {
                        props.handleClose()
                        clearState()
                    }
                    else if (res.success)
                        props.update()
                })
            }
            handleClose={() => props.handleClose()}>
            {(data, handleChange) => (
                <>
                    <FormRow>

                        <TextField

                            placeholder={lang.phase} label={lang.phase}
                            handleChange={event => {

                                handleChange({key: 'phase', event: event.target.value})
                            }} value={data.phase}
                            required={true}
                            width={'calc(33.333% - 21.5px)'}/>


                        <TextField
                            placeholder={lang.detailing} label={lang.detailing}
                            handleChange={event => {

                                handleChange({key: 'detailing', event: event.target.value})
                            }} value={data.detailing}
                            required={true}
                            width={'calc(33.333% - 21.5px)'}/>

                        <Selector
                            hook={activityHook} keys={workPlanKeys.activity}
                            width={'calc(33.333% - 21.5px)'}
                            required={true}
                            value={data.activity_stage}
                            label={'Etapa'}
                            placeholder={'Etapa'}
                            handleChange={entity => handleChange({key: 'activity_stage', event: entity})}
                            createOption={true}
                        >
                            {handleClose => (
                                <ActivityStageForm create={true} asDefault={true} handleClose={() => handleClose()}/>
                            )}
                        </Selector>
                    </FormRow>

                    <FormRow>

                        <TextField
                            placeholder={lang.stageRepresentation} label={lang.stageRepresentation}
                            handleChange={event => {

                                handleChange({key: 'stage_representation', event: event.target.value})
                            }} floatFilter={true}
                            maskEnd={'%'}
                            value={data.stage_representation}
                            required={true} type={'number'}
                            width={'calc(50% - 16px)'}/>

                        <TextField
                            type={'number'}
                            placeholder={lang.indicatorPlanned} label={lang.indicatorPlanned}
                            handleChange={event => {

                                handleChange({key: 'indicator_planned', event: event.target.value})
                            }}
                            value={data.indicator_planned}
                            required={true} maskEnd={'%'}
                            width={'calc(50% - 16px)'}/>
                        <TextField
                            type={'number'}
                            placeholder={lang.initialSituation} label={lang.initialSituation}
                            handleChange={event => {

                                handleChange({key: 'initial_situation', event: event.target.value})
                            }}
                            value={data.initial_situation}
                            required={true} maskEnd={'%'}
                            width={'calc(50% - 16px)'}/>
                        <TextField
                            type={'number'}
                            placeholder={lang.estimatedCost} label={lang.estimatedCost}
                            floatFilter={true}
                            handleChange={event => {

                                handleChange({key: 'estimated_cost', event: event.target.value})
                            }} maskStart={'R$'}
                            value={data.estimated_cost}
                            required={true}
                            width={'calc(50% - 16px)'}/>
                    </FormRow>

                    <FormRow>
                        <DateField hoursOffset={4}
                            dark={true}
                            placeholder={lang.startDate} label={lang.startDate}
                            handleChange={event => {

                                handleChange({key: 'start_date', event: event})
                            }}
                            value={
                                data.start_date
                            }
                            required={true} width={'calc(50% - 16px)'}/>
                        <DateField hoursOffset={4}
                            dark={true}
                            placeholder={lang.endDate} label={lang.endDate}
                            handleChange={event => {

                                handleChange({key: 'end_date', event: event})
                            }}
                            value={
                                data.end_date
                            }
                            required={true} width={'calc(50% - 16px)'}/>
                    </FormRow>
                </>
            )}
        </Form>
            )}
        </FormTemplate>
    )

}

OperationForm.propTypes = {

    data: PropTypes.object,
    update: PropTypes.func,
    handleClose: PropTypes.func,
    create: PropTypes.bool,
    stage: PropTypes.object,
}
