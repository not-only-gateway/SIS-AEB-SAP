import React, {useEffect, useState} from "react";
import {DropDownField, Form, FormRow, TextField} from "sis-aeb-core";
import PropTypes from "prop-types";
import WorkPlanRequests from "../../utils/requests/WorkPlanRequests";
import InfrastructurePT from "../../locales/InfrastructurePT";


export default function InfrastructureForm(props) {
    const lang = InfrastructurePT
    const [initialData, setInitialData] = useState(props.data)


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

    const content = (
        <>

            <Form
                initialData={initialData}
                create={props.create} title={props.create ? lang.newInfrastructure : lang.infrastructure}
                dependencies={
                    [
                        {name: 'name', type: 'string'},
                        {name: 'type', type: 'string'},
                    ]
                }
                returnButton={true} noAutoHeight={!props.asDefault}
                handleSubmit={(data) =>
                    WorkPlanRequests.submitInfrastructure({
                        pk: data.id,
                        data: data,
                        create: props.create
                    }).then(res => {
                        if (props.create && res)
                            props.returnToMain()
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
        </>
    )
    return (
        content
    )

}

InfrastructureForm.propTypes = {
    data: PropTypes.object,
    handleChange: PropTypes.func,
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    asDefault: PropTypes.bool
}
