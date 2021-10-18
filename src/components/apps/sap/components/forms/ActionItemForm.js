import React, {useEffect, useState} from "react";
import {DropDownField, FormRow, TextField} from "sis-aeb-core";
import PropTypes from "prop-types";
import OperationPT from "../../locales/OperationPT";
import Form from "../../../../core/inputs/form/Form";
import useDataWithDraft from "../../../../core/inputs/form/useDataWithDraft";
import Cookies from "universal-cookie/lib";
import submit from "../../utils/requests/submit";

export default function ActionItemForm(props) {
    const lang = OperationPT
    const [initialData, setInitialData] = useState(null)
    const formHook = useDataWithDraft({
        initialData: initialData,
        draftUrl: '',
        draftHeaders: {'authorization': (new Cookies()).get('jwt')},
        interval: 120000
    })

    useEffect(() => {
        setInitialData({
            ...props.data,
            ...{
                operation_phase: props.operation.id
            }
        })
    }, [])

    return (


        <Form
            hook={formHook}
            initialData={initialData} create={props.create}
            returnButton={true} handleClose={() => props.handleClose()}

            title={props.create ? lang.newAction : lang.action}
            dependencies={[
                {key: 'detailing', type: 'string'},
                {key: 'accomplished', type: 'bool'}
            ]}

            handleSubmit={(data, clearState) =>
                submit({
                    suffix: 'action_item',
                    pk: data.id,
                    data: data,
                    create: props.create
                }).then(res => {
                    if (props.create && res.success) {
                        props.handleClose()
                        clearState()
                    }
                })
            }
        >

            {(data, handleChange) => (
                <FormRow>


                    <TextField
                        placeholder={lang.detailing} label={lang.detailing}
                        handleChange={event => {

                            handleChange({key: 'detailing', value: event.target.value})
                        }} value={data.detailing}
                        required={true}
                        width={'100%'}/>
                    <DropDownField
                        dark={true}
                        placeholder={lang.accomplished}
                        label={lang.accomplished}
                        handleChange={event => {

                            handleChange({key: 'accomplished', value: event.target.value})
                        }} value={data.accomplished} required={true}
                        width={'100%'} choices={lang.options}/>
                </FormRow>
            )}
        </Form>

    )

}

ActionItemForm.propTypes = {
    id: PropTypes.number,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    handleClose: PropTypes.func,
    create: PropTypes.bool,
    operation: PropTypes.object
}
