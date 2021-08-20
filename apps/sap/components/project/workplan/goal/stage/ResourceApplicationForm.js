import React, {useEffect, useState} from "react";

import {DropDownField, TextField} from "sis-aeb-inputs";
import PropTypes from "prop-types";
import OperationRequests from "../../../../../utils/fetch/OperationRequests";
import EntityLayout from "../../../../shared/misc/form/EntityLayout";
import PermanentGoodsPT from "../../../../../packages/locales/PermanentGoodsPT";
import Alert from "../../../../shared/misc/alert/Alert";
import ResourcePT from "../../../../../packages/locales/ResourcePT";

export default function ResourceApplicationForm(props) {
    const [changed, setChanged] = useState(false)
    const lang = ResourcePT
    const [status, setStatus] = useState({
        type: undefined, message: undefined
    })
    useEffect(() => {
        if (props.create)
            props.handleChange({name: 'operation_phase', value: props.operation.id})
    }, [])
    return (
        <>
            <Alert
                type={status.type} render={status.type !== undefined}
                handleClose={() => setStatus({type: undefined, message: undefined})}
                message={status.message}
            />
            <EntityLayout
                entity={props.data}
                create={props.create} label={props.create ? lang.newResource : lang.resource}
                dependencies={{
                    fields: [
                        {name: 'gnd', type: 'string'},
                        {name: 'nature_expense', type: 'string'},
                        {name: 'description', type: 'number'},
                        {name: 'indirect_cost', type: 'bool'},
                        {name: 'value', type: 'number'}
                    ],
                    changed: changed
                }}
                returnButton={true}
                handleSubmit={() =>
                    OperationRequests.submitResource({
                        pk: props.data.id,
                        data: props.data,
                        setStatus: setStatus,
                        create: props.create
                    }).then(res => {
                        setChanged(!res)
                    })}
                handleClose={() => props.returnToMain()}
                forms={[{
                    child: (
                        <>
                            <DropDownField
                                placeholder={lang.gnd }
                                label={lang.gnd }
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'gnd', value: event})
                                }} value={props.data === null ? null : props.data.gnd } required={false}
                                width={'calc(50% - 16px)'} choices={[{key: 3, value: '3'},{key: 4, value: '4'}]}/>


                            <TextField
                                placeholder={lang.natureExpense}
                                label={lang.natureExpense}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'nature_expense', value: event.target.value})
                                }} value={props.data === null ? null : props.data.nature_expense}
                                required={true}
                                width={'calc(50% - 16px)'}/>
                            {/*<DropDownField*/}
                            {/*    dark={true}*/}
                            {/*    placeholder={lang.natureExpense }*/}
                            {/*    label={lang.natureExpense }*/}
                            {/*    handleChange={event => {*/}
                            {/*        setChanged(true)*/}
                            {/*        props.handleChange({name: 'nature_expense', value: event})*/}
                            {/*    }} value={props.data === null ? null : props.data.nature_expense } required={false}*/}
                            {/*    width={'calc(50% - 16px)'} choices={lang.natureOptions}/>*/}


                            <TextField
                                placeholder={lang.description} label={lang.description}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'description', value: event.target.value})
                                }} value={props.data === null ? null : props.data.description}
                                required={true}
                                width={'100%'} variant={'area'}/>
                            <DropDownField
                                dark={true}
                                placeholder={lang.indirectCosts }
                                label={lang.indirectCosts }
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'indirect_cost', value: event})
                                }} value={props.data === null ? null : props.data.indirect_cost } required={false}
                                width={'calc(50% - 16px)'} choices={lang.baseOptions}/>

                            <TextField
                                placeholder={lang.value} label={lang.value}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'value', value: event.target.value})
                                }} value={props.data === null ? null : props.data.value}
                                required={true} type={'number'} maskStart={'R$'} currencyMask={true}
                                width={'calc(50% - 16px)'}/>
                        </>
                    )
                }]}/>
        </>
    )

}

ResourceApplicationForm.propTypes = {
    id: PropTypes.number,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    operation: PropTypes.object
}
