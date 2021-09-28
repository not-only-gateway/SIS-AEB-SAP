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
import OperationPT from "../../locales/OperationPT";
import OperationRequests from "../../utils/requests/OperationRequests";

export default function ActionItemForm(props) {
    const lang = OperationPT

    useEffect(() => {
        props.handleChange({name: 'operation_phase', value: props.operation.id})
    }, [])

    return (
        <>

            <Form
                initialData={props.data} create={props.create}
                returnButton={true} handleClose={() => props.returnToMain()}

                title={props.create ? lang.newAction : lang.action}
                dependencies={[
                    {name: 'detailing', type: 'string'},
                    {name: 'accomplished', type: 'bool'}
                ]}

                handleSubmit={() =>
                    OperationRequests.submitActionItem({
                        pk: props.data.id,
                        data: props.data,
                        create: props.create
                    }).then(res => {
                        if (props.create && res)
                            props.returnToMain()
                    })
                }
            >

                {(data, handleChange) => (
                    <FormRow>


                            <TextField
                                placeholder={lang.detailing} label={lang.detailing}
                                handleChange={event => {

                                    handleChange({key: 'detailing', value: event.target.value})
                                }}  value={props.data === null ? null : props.data.detailing}
                                required={true}
                                width={'100%'}/>
                            <DropDownField
                                dark={true}
                                placeholder={lang.accomplished}
                                label={lang.accomplished}
                                handleChange={event => {

                                    handleChange({key: 'accomplished', value: event.target.value})
                                }} value={props.data === null ? null : props.data.accomplished} required={true}
                                width={'100%'} choices={lang.options}/>
                        </FormRow>
                    )}
                </Form>
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
