import React, {useEffect, useState} from "react";
import {Alert} from "sis-aeb-misc";
import {DropDownField, TextField} from "sis-aeb-inputs";
import PropTypes from "prop-types";
import OperationPT from "../../../../packages/locales/OperationPT";
import EntityLayout from "../../../shared/misc/form/EntityLayout";
import OperationRequests from "../../../../utils/fetch/OperationRequests";

export default function ActionItemForm(props) {
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
                create={props.create} label={props.create ? lang.newAction : lang.action}
                dependencies={{
                    fields: [
                        {name: 'detailing', type: 'string'},
                        {name: 'accomplished', type: 'bool'},
                    ],
                    changed: changed
                }}
                returnButton={true}
                handleSubmit={() =>
                    OperationRequests.submitActionItem({
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
                                placeholder={lang.detailing} label={lang.detailing}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'detailing', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.detailing}
                                required={true}
                                width={'100%'}/>
                            <DropDownField
                                dark={true}
                                placeholder={lang.accomplished}
                                label={lang.accomplished}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'accomplished', value: event})
                                }} value={props.data === null ? null : props.data.accomplished} required={true}
                                width={'100%'} choices={lang.options}/>
                        </>
                    )
                }]}/>
        </>
    )

}

ActionItemForm.propTypes = {
    id: PropTypes.number,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    operation: PropTypes.object
}
