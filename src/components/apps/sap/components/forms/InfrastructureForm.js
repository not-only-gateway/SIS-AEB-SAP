import React, {useEffect, useState} from "react";
import {DropDownField, FormRow, TextField} from "sis-aeb-core";
import PropTypes from "prop-types";
import InfrastructurePT from "../../locales/InfrastructurePT";
import Form from "../../../../core/inputs/form/Form";
import useDataWithDraft from "../../../../core/inputs/form/useDataWithDraft";
import Cookies from "universal-cookie/lib";
import submit from "../../utils/requests/submit";

export default function InfrastructureForm(props) {
    const lang = InfrastructurePT
    const [initialData, setInitialData] = useState(props.data)

    const formHook = useDataWithDraft({
        initialData: initialData,
        draftUrl: '',
        draftHeaders: {'authorization': (new Cookies()).get('jwt')},
        interval: 120000
    })
    useEffect(() => {
        if (props.data !== undefined)
            setInitialData(props.data)
        if (!props.create) {
            try {
                setInitialData({
                    ...props.data,
                    ...{
                        latitude: props.data.address.split(", ")[0],
                        longitude: props.data.address.split(", ")[1]
                    }
                })

            } catch (e) {
                console.log(e)
            }
        }
    }, [])

    return (
        <Form
            hook={formHook}
            initialData={initialData}
            create={props.create} title={props.create ? lang.newInfrastructure : lang.infrastructure}
            dependencies={
                [
                    {key: 'name', type: 'string'},
                    {key: 'type', type: 'string'},
                ]
            }
            returnButton={true} noAutoHeight={!props.asDefault}
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
                        props.returnToMain()
                        clearState()
                    }
                })}
            handleClose={() => props.returnToMain()}>
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


                    <DropDownField
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
    )

}

InfrastructureForm.propTypes = {
    data: PropTypes.object,
    handleChange: PropTypes.func,
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    asDefault: PropTypes.bool
}
