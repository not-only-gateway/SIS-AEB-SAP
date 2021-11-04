import React, {useEffect, useState} from "react";

import PropTypes from "prop-types";
import ExecutionPT from "../../locales/ExecutionPT";
import Cookies from "universal-cookie/lib";
import {DateField, Selector, TextField} from "mfc-core";
import Form from "../../../../core/inputs/form/Form";
import useDataWithDraft from "../../../../core/inputs/form/useDataWithDraft";
import workPlanKeys from "../../keys/workPlanKeys";
import useQuery from "../../../../core/visualization/hooks/useQuery";
import getQuery from "../../queries/getQuery";
import submit from "../../utils/requests/submit";
import OperationForm from "./OperationForm";
import Host from "../../utils/shared/Host";
import FormRow from "../../../../core/inputs/form/FormRow";
import tedKeys from "../../keys/tedKeys";


export default function ExecutionForm(props) {

    const lang = ExecutionPT
    const [initialData, setInitialData] = useState(props.data)
    const operationHook = useQuery(getQuery('operation_phase', undefined, props.workPlan ? [{
        key: 'activity_stage',
        sub_relation: {key: 'goal', sub_relation: {key: 'work_plan'}},
        value: props.workPlan.id,
        type: 'object'
    }] : []))
    useEffect(() => {
        if (props.create) {

            const date = new Date()
            const newMonth = date.getMonth() + 1
            const newDay = date.getDate()

            setInitialData({
                ...props.data,
                ...{
                    execution_date: `${newDay < 10 ? ('0' + newDay) : newDay}/${newMonth < 10 ? ('0' + newMonth) : newMonth}/${(date.getFullYear())}`,
                    operation_phase: props.operation ? props.operation.id : props.data.operation_phase
                }
            })
        }
    }, [])


    return (
        <FormOptions
            keys={workPlanKeys.execution}
            endpoint={'execution'}
            initialData={initialData}
        >
            {({setOpen, formHook, asDraft, asHistory}) => (
        <Form
            hook={formHook}
            create={props.create} title={props.create ? lang.newExecution : lang.execution}
            returnButton={true}
            handleSubmit={(data, clearState) => {
                submit({
                    suffix: 'execution',
                    pk: data.id,
                    data: data,
                    create: props.create
                }).then(res => {
                    if (res.success) {
                        props.handleClose()
                        clearState()
                    }
                })
            }}
            handleClose={() => props.handleClose()}>
            {(data, handleChange) => (
                <FormRow>
                    <TextField
                        placeholder={lang.description} label={lang.description}
                        handleChange={event => {

                            handleChange({key: 'description', event: event.target.value})
                        }}
                        value={data.description}
                        required={true} variant={'area'}
                        width={'100%'}
                    />
                    <TextField

                        placeholder={lang.difficulties} label={lang.difficulties}
                        handleChange={event => {

                            handleChange({key: 'difficulties', event: event.target.value})
                        }}
                        value={data.difficulties}
                        required={true} variant={'area'}
                        width={'100%'}/>
                    <TextField

                        placeholder={lang.measures} label={lang.measures}
                        handleChange={event => {

                            handleChange({key: 'measures_taken', event: event.target.value})
                        }}
                        value={data.measures_taken}
                        required={true} variant={'area'}
                        width={'100%'}/>

                    {props.operation ? null :
                        <Selector
                            hook={operationHook}
                            placeholder={'Fase / operação'}
                            title={'Fase / operação'}
                            handleChange={e => handleChange({event: e, key: 'operation_phase'})}
                            value={data.operation_phase} width={'calc(33.333% - 21.5px)'} required={true}
                            keys={workPlanKeys.operation}
                            createOption={true}
                        >
                            {handleClose => (
                                <OperationForm create={true} asDefault={true} handleClose={() => handleClose()}/>
                            )}
                        </Selector>
                    }
                    <TextField

                        placeholder={lang.currentExecution} label={lang.currentExecution}
                        handleChange={event => {

                            handleChange({key: 'difficulties', event: event.target.value})
                            handleChange({key: 'current_execution', event: event.target.value})
                        }}
                        value={data.current_execution}
                        required={true} type={'number'}
                        width={props.workPlan !== undefined ? 'calc(33.333% - 21.5px)' : 'calc(50% - 16px)'}/>


                    <TextField
                        placeholder={lang.committed} label={lang.committed} maskStart={'R$'} currencyMask={true}
                        handleChange={event => {

                            handleChange({key: 'committed', event: event.target.value})
                        }} value={data.committed}
                        required={true} type={'number'}
                        width={props.workPlan !== undefined ? 'calc(33.333% - 21.5px)' : 'calc(50% - 16px)'}/>

                    <TextField
                        placeholder={lang.liquidated} label={lang.liquidated} maskStart={'R$'}
                        currencyMask={true}
                        handleChange={event => {

                            handleChange({key: 'liquidated', event: event.target.value})
                        }} value={data.liquidated}
                        required={true} type={'number'}
                        width={'calc(50% - 16px)'}/>

                    <TextField
                        placeholder={lang.paid} label={lang.paid} maskStart={'R$'} currencyMask={true}
                        handleChange={event => {

                            handleChange({key: 'paid', event: event.target.value})
                        }} value={data.paid}
                        required={true} type={'number'}
                        width={'calc(50% - 16px)'}/>

                    <DateField
                        placeholder={lang.executionDate} label={lang.executionDate}
                        handleChange={event => {

                            handleChange({key: 'execution_date', event: event})
                        }}
                        value={
                            data.execution_date
                        }
                        required={true} width={'100%'}/>
                </FormRow>
            )}
        </Form>
            )}
        </FormOptions>
    )

}

ExecutionForm.propTypes = {
    workPlan: PropTypes.object,
    id: PropTypes.number,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    handleClose: PropTypes.func,
    create: PropTypes.bool,
    operation: PropTypes.object,
}
