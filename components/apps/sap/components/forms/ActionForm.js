import React from "react";
import {Form, FormRow, TextField} from "mfc-core";
import PropTypes from "prop-types";
import ProjectPT from "../../locales/ProjectPT";

import submit from "../../utils/submit";

import associativeKeys from "../../keys/associativeKeys";
import FormTemplate from "../../../../addons/FormTemplate";
import formOptions from "../../../../addons/formOptions";


export default function ActionForm(props) {
    const lang = ProjectPT

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
                    title={props.create ? lang.newAction : lang.action}
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
                    noAutoHeight={!props.asDefault}>
                    {(data, handleChange) => (
                        <FormRow>
                            <TextField
                                placeholder={lang.number}

                                label={lang.number}
                                handleChange={event => {
                                    handleChange({
                                        event: event.target.value,
                                        key: 'number'
                                    })

                                }} value={data.number}
                                required={true} width={'100%'}/>
                            <TextField
                                placeholder={lang.detailing}

                                label={lang.detailing}
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
            )}
        </FormTemplate>
    )

}

ActionForm.propTypes = {
    handleClose: PropTypes.func,
    create: PropTypes.bool,
    asDefault: PropTypes.bool,
}
