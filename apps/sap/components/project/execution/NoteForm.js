import React, {useEffect, useState} from "react";
import {Alert} from "sis-aeb-misc";
import {TextField} from "sis-aeb-inputs";
import PropTypes from "prop-types";
import EntityLayout from "../../shared/misc/form/EntityLayout";
import OperationRequests from "../../../utils/fetch/OperationRequests";
import ExecutionPT from "../../../packages/locales/ExecutionPT";

export default function NoteForm(props) {
    const [changed, setChanged] = useState(false)
    const lang = ExecutionPT
    const [status, setStatus] = useState({
        type: undefined, message: undefined
    })
    useEffect(() => {
        if(props.create)
            props.handleChange({name: 'execution', value: props.execution})
    }, [])
    return (
        <>
            <Alert
                type={status.type} render={status.type !== undefined} rootElementID={'root'}
                handleClose={() => setStatus({type: undefined, message: undefined})} message={status.message}
            />
            <EntityLayout
                rootElementID={'root'} entity={props.data}
                create={props.create} label={props.create ? lang.newNote : lang.note}
                dependencies={{
                    fields: [
                        {name: 'number', type: 'string'},

                        {name: 'value', type: 'number'}
                    ],
                    changed: changed
                }}
                returnButton={props.create}
                handleSubmit={() =>
                    OperationRequests.submitNote({
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

                                placeholder={lang.number} label={lang.number}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'number', value: event.target.value})
                                }} locale={props.locale}
                                value={props.data === null ? null : props.data.number}
                                required={true}
                                width={'calc(50% - 16px)'}/>


                            <TextField
                                placeholder={lang.value} label={lang.value} maskStart={'R$'}  currencyMask={true}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'value', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.value}
                                required={true} type={'number'}
                                width={'calc(50% - 16px)'}/>

                        </>
                    )
                }]}/>
        </>
    )

}

NoteForm.propTypes = {
    id: PropTypes.number,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    execution: PropTypes.object
}
