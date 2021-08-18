import React, {useEffect, useState} from "react";
import {Alert} from "sis-aeb-misc";
import {DateField, TextField} from "sis-aeb-inputs";
import PropTypes from "prop-types";
import EntityLayout from "../../shared/misc/form/EntityLayout";
import OperationRequests from "../../../utils/fetch/OperationRequests";
import ExecutionPT from "../../../packages/locales/ExecutionPT";

export default function ExecutionForm(props) {
    const [changed, setChanged] = useState(false)
    const lang = ExecutionPT
    const [status, setStatus] = useState({
        type: undefined, message: undefined
    })
    useEffect(() => {
        if(props.create)
            props.handleChange({name: 'operation_phase', value: props.operation.id})
    }, [])
    return (
        <>
            <Alert
                type={status.type} render={status.type !== undefined} rootElementID={'root'}
                handleClose={() => setStatus({type: undefined, message: undefined})} message={status.message}
            />
            <EntityLayout
                rootElementID={'root'} entity={props.data}
                create={props.create} label={props.create ? lang.newExecution : lang.execution}
                dependencies={{
                    fields: [
                        {name: 'current_execution', type: 'number'},

                        {name: 'committed', type: 'number'},
                        {name: 'liquidated', type: 'number'},
                        {name: 'paid', type: 'number'},

                        {name: 'description', type: 'string'},
                        {name: 'difficulties', type: 'string'},
                        {name: 'measures_taken', type: 'string'},

                        {name: 'execution_date', type: 'date'},
                    ],
                    changed: changed
                }}
                returnButton={props.create}
                handleSubmit={() =>
                    OperationRequests.submitExecution({
                        pk: props.data.id,
                        data: props.data,
                        setStatus: setStatus,
                        create: props.create
                    }).then(res => {
                        setChanged(false)
                    })

                }
                handleClose={() => props.returnToMain()}
                forms={[{
                    child: (
                        <>
                            <TextField
                                placeholder={lang.description} label={lang.description}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'description', value: event.target.value})
                                }} locale={props.locale}
                                value={props.data === null ? null : props.data.description}
                                required={true} variant={'area'}
                                width={'100%'}/>
                            <TextField

                                placeholder={lang.difficulties} label={lang.difficulties}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'difficulties', value: event.target.value})
                                }} locale={props.locale}
                                value={props.data === null ? null : props.data.difficulties}
                                required={true} variant={'area'}
                                width={'100%'}/>
                            <TextField

                                placeholder={lang.measures} label={lang.measures}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'measures_taken', value: event.target.value})
                                }} locale={props.locale}
                                value={props.data === null ? null : props.data.measures_taken}
                                required={true} variant={'area'}
                                width={'100%'}/>

                            <TextField

                                placeholder={lang.currentExecution} label={lang.currentExecution}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'current_execution', value: event.target.value})
                                }} locale={props.locale}
                                value={props.data === null ? null : props.data.current_execution}
                                required={true} type={'number'}
                                width={'calc(50% - 16px)'}/>


                            <TextField
                                placeholder={lang.committed} label={lang.committed} maskStart={'R$'}  currencyMask={true}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'committed', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.committed}
                                required={true} type={'number'}
                                width={'calc(50% - 16px)'}/>

                            <TextField
                                placeholder={lang.liquidated} label={lang.liquidated} maskStart={'R$'}  currencyMask={true}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'liquidated', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.liquidated}
                                required={true} type={'number'}
                                width={'calc(50% - 16px)'}/>

                            <TextField
                                placeholder={lang.paid} label={lang.paid} maskStart={'R$'}  currencyMask={true}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'paid', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.paid}
                                required={true} type={'number'}
                                width={'calc(50% - 16px)'}/>
                            <DateField
                                dark={true}
                                placeholder={lang.executionDate} label={lang.executionDate}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'execution_date', value: event.target.value})
                                }}
                                value={
                                    props.data === null ? null : props.data.execution_date
                                }
                                required={true} width={'100%'}/>
                        </>
                    )
                }]}/>
        </>
    )

}

ExecutionForm.propTypes = {
    id: PropTypes.number,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    operation: PropTypes.object
}
