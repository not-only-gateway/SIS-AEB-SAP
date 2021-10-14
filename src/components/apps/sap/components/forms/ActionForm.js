import React from "react";

import {FormRow, TextField} from "sis-aeb-core";
import PropTypes from "prop-types";
import ProjectRequests from "../../utils/requests/ProjectRequests";
import ProjectPT from "../../locales/ProjectPT";
import Form from "../../../../core/inputs/form/Form";
import useDataWithDraft from "../../../../core/inputs/form/useDataWithDraft";
import Cookies from "universal-cookie/lib";

export default function ActionForm(props) {

    const lang = ProjectPT
    const formHook = useDataWithDraft({
        initialData: props.data,
        draftUrl: '',
        draftHeaders: {'authorization': (new Cookies()).get('jwt')},
        interval: 120000
    })

    return (
        <Form
            hook={formHook}
            title={props.create ? lang.newAction : lang.action}
            initialData={props.data} create={props.create}
            dependencies={[
                {name: 'number', type: 'string'},
                {name: 'detailing', type: 'object'},
            ]} returnButton={true} handleClose={() => props.returnToMain()}
            handleSubmit={(data, clearState) =>
                ProjectRequests.submitAction({
                    pk: data.id,
                    data: data,
                    create: props.create
                }).then(res => {
                    if (props.create && res) {
                        props.returnToMain()
                        clearState()
                    }
                })}
            noAutoHeight={!props.asDefault}>
            {(data, handleChange) => (
                <FormRow>
                    <TextField
                        placeholder={lang.number} label={lang.number}
                        handleChange={event => {
                            handleChange({
                                event: event.target.value,
                                key: 'number'
                            })

                        }} value={data.number}
                        required={true} width={'100%'}/>
                    <TextField
                        placeholder={lang.detailing} label={lang.detailing}
                        handleChange={event => {

                            handleChange({
                                event: event.target.value,
                                key: 'detailing'
                            })
                        }} value={data.detailing}
                        required={true} width={'100%'} variant={'area'}
                    />
                </FormRow>
            )}
        </Form>
    )

}

ActionForm.propTypes = {
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    asDefault: PropTypes.bool
}
