import React, {useEffect, useState} from "react";
import {
    useQuery,
    Tabs,
    List,
    Modal,
    Selector,
    Form, FormRow,
    DateField,
    DropDownField,
    FileField,
    MultiSelectField,
    Navigation,
    Requester,
    TextField,
    ToolTip
} from "sis-aeb-core";
import PropTypes from "prop-types";
import WorkPlanRequests from "../../utils/requests/WorkPlanRequests";
import InfrastructurePT from "../../locales/InfrastructurePT";
import handleObjectChange from "../../utils/shared/HandleObjectChange";

export default function InfrastructureForm(props) {

    const lang = InfrastructurePT

    const [data, setData] = useState(null)


    useEffect(() => {
        if (props.data !== undefined)
            setData(props.data)
        if (!props.create) {

            try {
                handleObjectChange({
                    event: {name: 'latitude', value: props.data.address.split(", ")[0]},
                    setData: setData
                })
                handleObjectChange({
                    event: {name: 'longitude', value: props.data.address.split(", ")[1]},
                    setData: setData
                })
            } catch (e) {
                console.log(e)
            }
        }
    }, [])

    const content = (
        <>

            <Form
                initialData={props.data}
                create={props.create} title={props.create ? lang.newInfrastructure : lang.infrastructure}
                dependencies={
                    [
                        {name: 'name', type: 'string'},
                        {name: 'type', type: 'string'},
                    ]
                }
                returnButton={true} noAutoHeight={!props.asDefault}
                handleSubmit={() =>
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

                                handleObjectChange({
                                    event: {name: 'name', value: event.target.value},
                                    setData: setData
                                })
                            }}  value={data === null ? null : data.name}
                            required={true}
                            width={'calc(50% - 16px)'}/>


                        <DropDownField
                            placeholder={lang.type}
                            label={lang.type}
                            handleChange={event => {

                                handleObjectChange({event: {name: 'type', value: event}, setData: setData})
                            }} value={data === null ? null : data.type} required={true}
                            width={'calc(50% - 16px)'} choices={lang.typeOptions}/>

                        <TextField
                            placeholder={lang.latitude} label={lang.latitude} type={'number'}
                            handleChange={event => {

                                handleObjectChange({
                                    event: {name: 'latitude', value: event.target.value},
                                    setData: setData
                                })

                            }}
                            value={data === null ? null : data.latitude}
                            required={false}
                            width={'calc(50% - 16px)'}/>
                        <TextField
                            placeholder={lang.longitude} label={lang.longitude} type={'number'}
                            handleChange={event => {

                                handleObjectChange({
                                    event: {name: 'longitude', value: event.target.value},
                                    setData: setData
                                })
                            }} value={data === null ? null : data.longitude}
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
