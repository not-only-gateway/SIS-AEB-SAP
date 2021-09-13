import React, {useEffect, useState} from "react";
import Form from "../../../shared/core/form/Form";
import {DateField, TextField} from "sis-aeb-core";
import PropTypes from "prop-types";
import TedRequests from "../../../../utils/requests/TedRequests";
import TedPT from "../../../../packages/locales/TedPT";

export default function AddendumForm(props) {
    const [changed, setChanged] = useState(false)
    const lang = TedPT

    useEffect(() => {
        props.handleChange({name: 'ted', value: props.ted.id})
    }, [])
    return (
        <>

            <Form
                rootElementID={'root'} entity={props.data}
                create={props.create} label={props.create ? lang.newAddendum : lang.eAddendum}
                dependencies={{
                    fields: [
                        {name: 'number', type: 'string'},
                        {name: 'global_value', type: 'number'},
                        {name: 'start_date', type: 'date'},
                        {name: 'end_date', type: 'date'},
                        {name: 'changes', type: 'string'}
                    ],
                    changed: changed
                }}
                returnButton={true}
                handleSubmit={() =>
                    TedRequests.submitAddendum({
                        pk: props.data.id,
                        data: props.data,

                        create: props.create
                    }).then(res => {
                        if(props.create && res)
                            props.returnToMain()
                        setChanged(!res)
                    })}
                handleClose={() => props.returnToMain()}
                forms={[{
                    child: (
                        <>
                            <TextField

                                placeholder={lang.number} label={lang.number}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'number', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.number}
                                required={true}
                                width={'calc(50% - 16px)'}/>
                            <TextField
                                type={'number'}
                                placeholder={lang.globalValue} label={lang.globalValue} currencyMask={true}
                                maskStart={'R$'}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'global_value', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.global_value}
                                required={true}
                                width={'calc(50% - 16px)'}/>
                            <TextField
                                variant={'area'}
                                placeholder={lang.changes} label={lang.changes}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'changes', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.changes}
                                required={true}
                                width={'100%'}/>

                            <DateField
                                dark={true}
                                placeholder={lang.startDate} label={lang.startDate}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'start_date', value: event})
                                }}
                                value={
                                    props.data === null ? null : props.data.start_date
                                }
                                required={true} width={'calc(50% - 16px)'}/>
                            <DateField
                                dark={true}
                                placeholder={lang.endDate} label={lang.endDate}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'end_date', value: event})
                                }}
                                value={
                                    props.data === null ? null : props.data.end_date
                                }
                                required={true} width={'calc(50% - 16px)'}/>
                        </>
                    )
                }]}/>
        </>
    )

}

AddendumForm.propTypes = {
    id: PropTypes.number,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    ted: PropTypes.object
}
