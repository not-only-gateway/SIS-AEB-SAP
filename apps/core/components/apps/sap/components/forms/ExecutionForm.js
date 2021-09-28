import React, {useEffect, useState} from "react";

import PropTypes from "prop-types";
import OperationRequests from "../../utils/requests/OperationRequests";
import ExecutionPT from "../../locales/ExecutionPT";
import Host from "../../utils/shared/Host";
import Cookies from "universal-cookie/lib";
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

export default function ExecutionForm(props) {

    const lang = ExecutionPT

    useEffect(() => {
        if (props.create) {
            const date = new Date()
            if (props.workPlan === undefined)
                props.handleChange({name: 'operation_phase', value: props.operation})
            props.handleChange({
                name: 'execution_date',
                value: (date.getFullYear()) + '-' + (date.getMonth() + 1) + '-' + (date.getDate())
            })
        }
    }, [])
    return (
        <>
            <Form
                initialData={props.data}
                create={props.create} title={props.create ? lang.newExecution : lang.execution}
                dependencies={
                    [
                        {name: 'current_execution', type: 'number'},
                        {name: 'operation_phase', type: 'object'},
                        {name: 'committed', type: 'number'},
                        {name: 'liquidated', type: 'number'},
                        {name: 'paid', type: 'number'},
                        {name: 'description', type: 'string'},
                        {name: 'difficulties', type: 'string'},
                        {name: 'measures_taken', type: 'string'},
                        {name: 'execution_date', type: 'date'},
                    ]

                }
                returnButton={props.create}
                handleSubmit={() =>
                    OperationRequests.submitExecution({
                        pk: props.data.id,
                        data: props.data,
                        create: props.create
                    }).then(res => {
                        if (props.create && res)
                            props.returnToMain()

                    })
                }
                handleClose={() => props.returnToMain()}>
                {(data, handleChange) => (
                    <FormRow>


                        <TextField
                            placeholder={lang.description} label={lang.description}
                            handleChange={event => {

                                handleChange({key: 'description', value: event.target.value})
                            }}
                            value={props.data === null ? null : props.data.description}
                            required={true} variant={'area'}
                            width={'100%'}
                        />
                        <TextField

                            placeholder={lang.difficulties} label={lang.difficulties}
                            handleChange={event => {

                                handleChange({key: 'difficulties', value: event.target.value})
                            }}
                            value={props.data === null ? null : props.data.difficulties}
                            required={true} variant={'area'}
                            width={'100%'}/>
                        <TextField

                            placeholder={lang.measures} label={lang.measures}
                            handleChange={event => {

                                handleChange({key: 'measures_taken', value: event.target.value})
                            }}
                            value={props.data === null ? null : props.data.measures_taken}
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
                                    props.handleChange({name: 'operation_phase', value: entity})
                                }} label={'Vincular fase / operação'}
                                setChanged={() => null}
                                selected={props.data === null || !props.data.operation_phase ? null : props.data.operation_phase}
                                required={true}
                                width={'calc(33.333% - 21.5px)'}
                                fields={[
                                    {name: 'phase', type: 'string', label: 'Fase'},
                                    {name: 'initial_situation', type: 'string'},
                                    {name: 'indicator_planned', type: 'string'},
                                    {name: 'detailing', type: 'string'},
                                    {name: 'estimated_cost', type: 'number', maskStart: 'R$ '}
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

                                handleChange({key: 'difficulties', value: event.target.value})
                                props.handleChange({name: 'current_execution', value: event.target.value})
                            }}
                            value={props.data === null ? null : props.data.current_execution}
                            required={true} type={'number'}
                            width={props.workPlan !== undefined ? 'calc(33.333% - 21.5px)' : 'calc(50% - 16px)'}/>


                        <TextField
                            placeholder={lang.committed} label={lang.committed} maskStart={'R$'} currencyMask={true}
                            handleChange={event => {

                                props.handleChange({name: 'committed', value: event.target.value})
                            }}  value={props.data === null ? null : props.data.committed}
                            required={true} type={'number'}
                            width={props.workPlan !== undefined ? 'calc(33.333% - 21.5px)' : 'calc(50% - 16px)'}/>

                        <TextField
                            placeholder={lang.liquidated} label={lang.liquidated} maskStart={'R$'}
                            currencyMask={true}
                            handleChange={event => {

                                props.handleChange({name: 'liquidated', value: event.target.value})
                            }}  value={props.data === null ? null : props.data.liquidated}
                            required={true} type={'number'}
                            width={'calc(50% - 16px)'}/>

                        <TextField
                            placeholder={lang.paid} label={lang.paid} maskStart={'R$'} currencyMask={true}
                            handleChange={event => {

                                props.handleChange({name: 'paid', value: event.target.value})
                            }}  value={props.data === null ? null : props.data.paid}
                            required={true} type={'number'}
                            width={'calc(50% - 16px)'}/>

                        <DateField
                            placeholder={lang.executionDate} label={lang.executionDate}
                            handleChange={event => {

                                props.handleChange({name: 'execution_date', value: event})
                            }}
                            value={
                                props.data === undefined || props.data === null || props.data.execution_date === undefined ? null : props.data.execution_date
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
