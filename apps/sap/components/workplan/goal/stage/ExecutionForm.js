import React, {useEffect, useState} from "react";
import {Alert} from "sis-aeb-misc";
import {DateField, TextField} from "sis-aeb-inputs";
import PropTypes from "prop-types";
import OperationPT from "../../../../packages/locales/OperationPT";
import EntityLayout from "../../../shared/misc/form/EntityLayout";
import OperationRequests from "../../../../utils/fetch/OperationRequests";

export default function ExecutionForm(props) {
    const [changed, setChanged] = useState(false)
    const lang = OperationPT
    const [status, setStatus] = useState({
        type: undefined, message: undefined
    })
    useEffect(() => {
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

                        {name: 'execution_date', type: 'date'},
                    ],
                    changed: changed
                }}
                returnButton={true}
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

                                placeholder={lang.currentExecution} label={lang.currentExecution}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'current_execution', value: event.target.value})
                                }} locale={props.locale}
                                value={props.data === null ? null : props.data.current_execution}
                                required={true} type={'number'}
                                width={'calc(50% - 16px)'}/>


                            <TextField
                                placeholder={lang.committed} label={lang.committed}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'committed', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.committed}
                                required={true} type={'number'}
                                width={'calc(50% - 16px)'}/>

                            <TextField
                                placeholder={lang.liquidated} label={lang.liquidated}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'liquidated', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.liquidated}
                                required={true} type={'number'}
                                width={'calc(50% - 16px)'}/>

                            <TextField
                                placeholder={lang.paid} label={lang.paid}
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
