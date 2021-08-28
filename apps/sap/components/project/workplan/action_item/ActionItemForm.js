import React, {useEffect, useState} from "react";
import {DropDownField, TextField} from "sis-aeb-inputs";
import PropTypes from "prop-types";
import OperationPT from "../../../../packages/locales/OperationPT";
import EntityLayout from "../../../shared/core/form/EntityLayout";
import OperationRequests from "../../../../utils/requests/OperationRequests";

export default function ActionItemForm(props) {
    const [changed, setChanged] = useState(false)
    const lang = OperationPT

    useEffect(() => {
        props.handleChange({name: 'operation_phase', value: props.operation.id})
    }, [])

    return (
        <>

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
                        create: props.create
                    }).then(res => {
                        if(props.create && res)
                            props.returnToMain()
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
