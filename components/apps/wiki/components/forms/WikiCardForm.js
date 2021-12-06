import React from "react";
import {Form, FormRow, TextField} from "mfc-core";
import PropTypes from "prop-types";
import submit from "../../utils/submit";
import associativeKeys from "../../keys/associativeKeys";
import FormTemplate from "../../templates/FormTemplate";
import formOptions from "../../templates/formOptions";


export default function WikiCardForm(props) {

    return (
        <FormTemplate
            keys={associativeKeys.action}
            endpoint={'action'}
            initialData={props.data}
        >
            {({setOpen, formHook, asDraft, asHistory}) => (
                <Form
                    hook={formHook}
                    options={formOptions({
                        asDraft: asDraft,
                        asHistory: asHistory,
                        setOpen: setOpen,
                        create: props.create
                    })}
                    title={props.create ? 'Cirar nova Wiki': 'Wiki'}
                    create={props.create}
                    returnButton={true} handleClose={() => props.handleClose()}
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
                >
                    {(data, handleChange) => (
                        <FormRow>
                            <TextField
                                placeholder={'Nome'}

                                label={'Nome'}
                                handleChange={event => {
                                    handleChange({
                                        event: event.target.value,
                                        key: 'name'
                                    })

                                }} value={data.name}
                                required={true} width={'100%'}/>
                            <TextField
                                placeholder={'Descrição'}

                                label={'Descrição'}
                                handleChange={event => {

                                    handleChange({
                                        event: event.target.value,
                                        key: 'description'
                                    })
                                }} value={data.description}
                                required={true} width={'100%'} variant={'area'}
                            />
                        </FormRow>
                    )}
                </Form>
            )}
        </FormTemplate>
    )

}

WikiCardForm.propTypes = {
    handleClose: PropTypes.func,
    create: PropTypes.bool,
    asDefault: PropTypes.bool,
}
