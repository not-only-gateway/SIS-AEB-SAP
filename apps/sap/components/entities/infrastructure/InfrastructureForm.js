import React, {useEffect, useState} from "react";
import EntityLayout from "../../shared/misc/form/EntityLayout";
import {DropDownField, TextField} from "sis-aeb-inputs";
import PropTypes from "prop-types";
import WorkPlanRequests from "../../../utils/requests/WorkPlanRequests";
import InfrastructurePT from "../../../packages/locales/InfrastructurePT";
import handleObjectChange from "../../../utils/shared/HandleObjectChange";

export default function InfrastructureForm(props) {
    const [changed, setChanged] = useState(false)
    const lang = InfrastructurePT

    const [data, setData] = useState(null)


    useEffect(() => {
        if (!props.create) {
            setData(props.data)
            try {
                handleObjectChange({event: {name: 'latitude', value: props.data.address.split(", ")[0]}, setData: setData})
                handleObjectChange({event: {name: 'longitude', value: props.data.address.split(", ")[1]}, setData: setData})
            } catch (e) {
                console.log(e)
            }
        }
    }, [])

    const content = (
        <>

            <EntityLayout
                rootElementID={'root'} entity={data}
                create={props.create} label={props.create ? lang.newInfrastructure : lang.infrastructure}
                dependencies={{
                    fields: [
                        {name: 'name', type: 'string'},
                        {name: 'type', type: 'string'},
                    ],
                    changed: changed
                }}
                returnButton={true}
                handleSubmit={() =>
                    WorkPlanRequests.submitInfrastructure({
                        pk: data.id,
                        data: data,
                        create: props.create
                    }).then(res => {
                        setChanged(!res)
                    })}
                handleClose={() => props.returnToMain()}
                forms={[{
                    child: (
                        <>
                            <TextField

                                placeholder={lang.name} label={lang.name}
                                handleChange={event => {
                                    setChanged(true)
                                    handleObjectChange({event: {name: 'name', value: event.target.value}, setData: setData})
                                }} locale={props.locale} value={data === null ? null : data.name}
                                required={true}
                                width={'calc(50% - 16px)'}/>


                            <DropDownField
                                placeholder={lang.type}
                                label={lang.type}
                                handleChange={event => {
                                    setChanged(true)
                                    handleObjectChange({event: {name: 'type', value: event}, setData: setData})
                                }} value={data === null ? null : data.type} required={true}
                                width={'calc(50% - 16px)'} choices={lang.typeOptions}/>

                            <TextField
                                placeholder={lang.latitude} label={lang.latitude} type={'number'}
                                handleChange={event => {
                                    setChanged(true)
                                    handleObjectChange({event: {name: 'latitude', value: event.target.value}, setData: setData})

                                }}
                                value={data === null ? null : data.latitude}
                                required={false}
                                width={'calc(50% - 16px)'}/>
                            <TextField
                                placeholder={lang.longitude} label={lang.longitude} type={'number'}
                                handleChange={event => {
                                    setChanged(true)
                                    handleObjectChange({event: {name: 'longitude', value: event.target.value}, setData: setData})
                                }} value={data === null ? null : data.longitude}
                                required={false}
                                width={'calc(50% - 16px)'}
                            />
                        </>
                    )
                }]}/>
        </>
    )
    return (
        props.asDefault ? content :
            <div style={{width: '55vw', height: '400px', background: 'white', borderRadius: '8px'}}>
                {content}
            </div>
    )

}

InfrastructureForm.propTypes = {
    data: PropTypes.object,
    handleChange: PropTypes.func,
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    asDefault: PropTypes.bool
}
