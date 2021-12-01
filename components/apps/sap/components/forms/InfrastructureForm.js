import React, {useMemo} from "react";

import {Form, FormRow, SelectField, TextField} from "mfc-core";
import PropTypes from "prop-types";
import InfrastructurePT from "../../locales/InfrastructurePT";

import submit from "../../utils/submit";

import associativeKeys from "../../keys/associativeKeys";
import FormTemplate from "../../templates/FormTemplate";
import formOptions from "../../templates/formOptions";


export default function InfrastructureForm(props) {
    const lang = InfrastructurePT
    const initialData = useMemo(() => {
        if (!props.create)
            return {
                ...props.data,
                ...{
                    latitude: props.data.address?.split(", ")[0],
                    longitude: props.data.address?.split(", ")[1]
                }
            }
        else return props.data
    }, [props])

    return (
        <FormTemplate
            keys={associativeKeys.infrastructure}
            endpoint={'infrastructure'}
            initialData={initialData}
        >
            {({setOpen, formHook, asDraft, asHistory}) => (
                <Form
                    hook={formHook}
                    create={props.create}
                    options={formOptions({
                        asDraft: asDraft,
                        asHistory: asHistory,
                        setOpen: setOpen,
                        create: props.create
                    })}
                    title={props.create ? lang.newInfrastructure : lang.infrastructure}
                    returnButton={props.create}
                    handleSubmit={(data, clearState) =>
                        submit({
                            suffix: 'infrastructure',
                            pk: data.id,
                            data: {
                                ...data,
                                address: data.latitude + ', ' + data.longitude
                            },
                            create: props.create
                        }).then(res => {
                            if (props.create && res.success) {
                                props.handleClose()
                                clearState()
                            }
                        })}
                    handleClose={() => props.handleClose()}>
                    {(data, handleChange) => (
                        <FormRow>

                            <TextField

                                placeholder={lang.name} label={lang.name}
                                handleChange={event => {
                                    handleChange({
                                        event: event.target.value,
                                        key: 'name'
                                    })
                                }} value={data.name}
                                required={true}
                                width={'calc(50% - 16px)'}/>


                            <SelectField
                                placeholder={lang.type}
                                label={lang.type}
                                handleChange={event => {

                                    handleChange({
                                        event: event,
                                        key: 'type'
                                    })
                                }} value={data.type} required={true}
                                width={'calc(50% - 16px)'} choices={lang.typeOptions}/>

                            <TextField
                                placeholder={lang.latitude} label={lang.latitude} type={'number'}
                                handleChange={event => {
                                    handleChange({
                                        event: event.target.value,
                                        key: 'latitude'
                                    })
                                }}
                                value={data.latitude}
                                required={false}
                                width={'calc(50% - 16px)'}/>
                            <TextField
                                placeholder={lang.longitude} label={lang.longitude} type={'number'}
                                handleChange={event => {
                                    handleChange({
                                        event: event.target.value,
                                        key: 'longitude'
                                    })
                                }} value={data.longitude}
                                required={false}
                                width={'calc(50% - 16px)'}
                            />
                        </FormRow>
                    )}
                </Form>
            )}
        </FormTemplate>
    )

}

InfrastructureForm.propTypes = {
    data: PropTypes.object,

    handleClose: PropTypes.func,
    create: PropTypes.bool,
    asDefault: PropTypes.bool,
}
