import React, {useEffect, useState} from "react";

import PropTypes from "prop-types";
import OperationRequests from "../../utils/requests/OperationRequests";
import ExecutionPT from "../../locales/ExecutionPT";
import Host from "../../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import {DateField, Form, FormRow, Selector, TextField} from "sis-aeb-core";

export default function ExecutionForm(props) {

    const lang = ExecutionPT
    const [initialData, setInitialData] = useState(props.data)
    useEffect(() => {
        if (props.create) {
            const date = new Date()
            setInitialData({
                ...props.data,
                ...{
                    infrastructure: props.infrastructure.id,
                    operation_phase: props.operation,
                    execution_date: (date.getFullYear()) + '-' + (date.getMonth() + 1) + '-' + (date.getDate())
                }
            })
        }
    }, [])


    return (
        <>
            <Form
                initialData={initialData}
                create={props.create} title={props.create ? lang.newExecution : lang.execution}
                dependencies={
                    [
                        {key: 'current_execution', type: 'number'},
                        {key: 'operation_phase', type: 'object'},
                        {key: 'committed', type: 'number'},
                        {key: 'liquidated', type: 'number'},
                        {key: 'paid', type: 'number'},
                        {key: 'description', type: 'string'},
                        {key: 'difficulties', type: 'string'},
                        {key: 'measures_taken', type: 'string'},
                        {key: 'execution_date', type: 'date'},
                    ]

                }
                returnButton={props.create}
                handleSubmit={(data, clearState) =>
                    OperationRequests.submitExecution({
                        pk: data.id,
                        data: data,
                        create: props.create
                    }).then(res => {
                        if (props.create && res){
                            props.returnToMain()
                            clearState()
                        }

                    })
                }
                handleClose={() => props.returnToMain()}>
                {(data, handleChange) => (
                    <FormRow>


                        <TextField
                            placeholder={lang.description} label={lang.description}
                            handleChange={event => {

                                handleChange({key: 'description', event: event.target.value})
                            }}
                            value={ data.description}
                            required={true} variant={'area'}
                            width={'100%'}
                        />
                        <TextField

                            placeholder={lang.difficulties} label={lang.difficulties}
                            handleChange={event => {

                                handleChange({key: 'difficulties', event: event.target.value})
                            }}
                            value={ data.difficulties}
                            required={true} variant={'area'}
                            width={'100%'}/>
                        <TextField

                            placeholder={lang.measures} label={lang.measures}
                            handleChange={event => {

                                handleChange({key: 'measures_taken', event: event.target.value})
                            }}
                            value={ data.measures_taken}
                            required={true} variant={'area'}
                            width={'100%'}/>

                        {props.workPlan !== undefined ?
                            <Selector
                                getEntityKey={entity => {
                                    if (entity !== null && entity !== undefined)
                                        return entity.id
                                    else return -1
                                }} searchFieldName={'search_input'}
                                handleChange={entity => {
                                    handleChange({key: 'operation_phase', event: entity})
                                }} label={'Vincular fase / operação'}
                                setChanged={() => null}
                                selected={props.data === null || !props.data.operation_phase ? null : props.data.operation_phase}
                                required={true}
                                width={'calc(33.333% - 21.5px)'}
                                fields={[
                                    {key: 'phase', type: 'string', label: 'Fase'},
                                    {key: 'initial_situation', type: 'string'},
                                    {key: 'indicator_planned', type: 'string'},
                                    {key: 'detailing', type: 'string'},
                                    {key: 'estimated_cost', type: 'number', maskStart: 'R$ '}
                                ]}
                                labels={['Fase', 'Situação inicial', 'indicador planejado', 'detalhamento da fase', 'custo estimado']}
                                fetchUrl={Host() + 'list/operation_phase'}
                                fetchParams={{
                                    work_plan: props.workPlan.id
                                }}
                                fetchToken={(new Cookies()).get('jwt')}
                            />
                            :
                            null}
                        <TextField

                            placeholder={lang.currentExecution} label={lang.currentExecution}
                            handleChange={event => {

                                handleChange({key: 'difficulties', event: event.target.value})
                                handleChange({key: 'current_execution', event: event.target.value})
                            }}
                            value={ data.current_execution}
                            required={true} type={'number'}
                            width={props.workPlan !== undefined ? 'calc(33.333% - 21.5px)' : 'calc(50% - 16px)'}/>


                        <TextField
                            placeholder={lang.committed} label={lang.committed} maskStart={'R$'} currencyMask={true}
                            handleChange={event => {

                                handleChange({key: 'committed', event: event.target.value})
                            }}  value={ data.committed}
                            required={true} type={'number'}
                            width={props.workPlan !== undefined ? 'calc(33.333% - 21.5px)' : 'calc(50% - 16px)'}/>

                        <TextField
                            placeholder={lang.liquidated} label={lang.liquidated} maskStart={'R$'}
                            currencyMask={true}
                            handleChange={event => {

                                handleChange({key: 'liquidated', event: event.target.value})
                            }}  value={ data.liquidated}
                            required={true} type={'number'}
                            width={'calc(50% - 16px)'}/>

                        <TextField
                            placeholder={lang.paid} label={lang.paid} maskStart={'R$'} currencyMask={true}
                            handleChange={event => {

                                handleChange({key: 'paid', event: event.target.value})
                            }}  value={ data.paid}
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
        </>
    )

}

ExecutionForm.propTypes = {
    workPlan: PropTypes.object,
    id: PropTypes.number,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    operation: PropTypes.object
}
