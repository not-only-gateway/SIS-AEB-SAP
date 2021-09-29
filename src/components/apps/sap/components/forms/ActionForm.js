import React from "react";

import {Form, FormRow, TextField} from "sis-aeb-core";
import PropTypes from "prop-types";
import ProjectRequests from "../../utils/requests/ProjectRequests";
import ProjectPT from "../../locales/ProjectPT";

export default function ActionForm(props) {

    const lang = ProjectPT

    const content = (
        <>
            <Form
                title={props.create ? lang.newAction : lang.action}
                initialData={props.data} create={props.create}
                dependencies={[
                    {name: 'number', type: 'string'},
                    {name: 'detailing', type: 'object'},
                ]} returnButton={true} handleClose={() => props.returnToMain()}
                handleSubmit={(data) =>
                    ProjectRequests.submitAction({
                        pk: data.id,
                        data: data,
                        create: props.create
                    }).then(res => {
                        if (props.create && res)
                            props.returnToMain()
                    })}
                noAutoHeight={!props.asDefault}>
                {(data, handleChange) => (
                    <FormRow>
                        <TextField
                            placeholder={lang.number} label={lang.number}
                            handleChange={event => {
                                handleChange({
                                    event: event.target.value,
                                    key:'number'
                                })

                            }} value={data.number}
                            required={true} width={'100%'}/>
                        <TextField
                            placeholder={lang.detailing} label={lang.detailing}
                            handleChange={event => {

                                handleChange({
                                    event:event.target.value,
                                    key: 'detailing'
                                })
                            }} value={data.detailing}
                            required={true} width={'100%'} variant={'area'}
                        />
                    </FormRow>
                )}
            </Form>
        </>
    )

    return (
        content
    )

}

ActionForm.propTypes = {
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    asDefault: PropTypes.bool
}
