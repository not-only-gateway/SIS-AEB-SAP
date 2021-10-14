import React, {useEffect, useState} from "react";
import {FormRow, TextField} from "sis-aeb-core";
import PropTypes from "prop-types";
import OperationRequests from "../../utils/requests/OperationRequests";
import ExecutionPT from "../../locales/ExecutionPT";
import Form from "../../../../core/inputs/form/Form";
import useDataWithDraft from "../../../../core/inputs/form/useDataWithDraft";
import Cookies from "universal-cookie/lib";

export default function NoteForm(props) {
    const lang = ExecutionPT
    const [initialData, setInitialData] = useState(props.data)
    const formHook = useDataWithDraft({
        initialData: initialData,
        draftUrl: '',
        draftHeaders: {'authorization': (new Cookies()).get('jwt')},
        interval: 120000
    })

    useEffect(() => {
        if (props.create)
            setInitialData({
                ...props.data,
                ...{
                    operation_phase: props.operation
                }
            })
    }, [])

    return (
        <Form
            hook={formHook}
            initialData={initialData}
            create={props.create} title={props.create ? lang.newNote : lang.note}
            dependencies={
                [
                    {name: 'number', type: 'string'},
                    {name: 'value', type: 'number'}
                ]

            }
            returnButton={props.create}
            handleSubmit={(data, clearState) =>
                OperationRequests.submitNote({
                    pk: data.id,
                    data: data,
                    create: props.create
                }).then(res => {
                    if (props.create && res) {
                        props.returnToMain()
                        clearState()
                    }
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
                        value={data.number}
                        required={true}
                        width={'calc(50% - 16px)'}/>


                    <TextField
                        placeholder={lang.value} label={lang.value} maskStart={'R$'} currencyMask={true}
                        handleChange={event => {

                            handleChange({key: 'value', value: event.target.value})
                        }} value={data.value}
                        required={true} type={'number'}
                        width={'calc(50% - 16px)'}/>

                </FormRow>
            )}
        </Form>
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
