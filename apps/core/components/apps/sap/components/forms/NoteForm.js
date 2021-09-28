import React, {useEffect, useState} from "react";
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
import PropTypes from "prop-types";
import OperationRequests from "../../utils/requests/OperationRequests";
import ExecutionPT from "../../locales/ExecutionPT";

export default function NoteForm(props) {

    const lang = ExecutionPT

    useEffect(() => {
        if (props.create)
            props.handleChange({name: 'operation_phase', value: props.operation})
    }, [])
    return (
        <>

            <Form
                initialData={props.data}
                create={props.create} title={props.create ? lang.newNote : lang.note}
                dependencies={
                    [
                        {name: 'number', type: 'string'},
                        {name: 'value', type: 'number'}
                    ]

                }
                returnButton={props.create}
                handleSubmit={() =>
                    OperationRequests.submitNote({
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

                            placeholder={lang.number} label={lang.number}
                            handleChange={event => {

                                handleChange({key: 'number', value: event.target.value})

                            }}
                            value={props.data === null ? null : props.data.number}
                            required={true}
                            width={'calc(50% - 16px)'}/>


                        <TextField
                            placeholder={lang.value} label={lang.value} maskStart={'R$'} currencyMask={true}
                            handleChange={event => {

                                handleChange({key: 'value', value: event.target.value})
                            }}  value={props.data === null ? null : props.data.value}
                            required={true} type={'number'}
                            width={'calc(50% - 16px)'}/>

                    </FormRow>
                )}
            </Form>
        </>
    )

}

NoteForm.propTypes = {
    id: PropTypes.number,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    operation: PropTypes.object
}
