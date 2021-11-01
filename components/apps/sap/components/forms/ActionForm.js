import React, {useState} from "react";

import {TextField} from "mfc-core";

import PropTypes from "prop-types";
import ProjectPT from "../../locales/ProjectPT";
import Form from "../../../../core/inputs/form/Form";
import useDataWithDraft from "../../../../core/inputs/form/useDataWithDraft";
import Cookies from "universal-cookie/lib";
import submit from "../../utils/requests/submit";
import Host from "../../utils/shared/Host";
import FormRow from "../../../../core/inputs/form/FormRow";

export default function ActionForm(props) {

    const lang = ProjectPT
    const [draftID, setDraftID] = useState(props.draftID)

    const formHook = useDataWithDraft({
        initialData: props.data,
        draftUrl: Host().replace('api', 'draft') + 'action',
        draftHeaders: {'authorization': (new Cookies()).get('jwt')},
        interval: 5000,
        parsePackage: pack => {
            return {
                ...pack,
                identifier: draftID
            }
        },
        draftMethod: draftID ? 'put' : 'post',
        onSuccess: (res) => {
            console.log(res)
            setDraftID(res.data.id)
        }
    })

    return (
        <Form
            hook={formHook}
            title={props.create ? lang.newAction : lang.action}
            initialData={props.data} create={props.create}
            dependencies={[
                {key: 'number', type: 'string'},
                {key: 'detailing', type: 'object'},
            ]} returnButton={true} handleClose={() => props.handleClose()}
            handleSubmit={(data, clearState) =>
                submit({
                    suffix: 'action',
                    pk: data.id,
                    data: data,
                    create: props.create
                }).then(res => {
                    if (props.create && res.success) {
                        props.handleClose()
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
    handleClose: PropTypes.func,
    create: PropTypes.bool,
    asDefault: PropTypes.bool,
}
