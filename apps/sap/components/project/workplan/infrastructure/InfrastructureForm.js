import React, {useEffect, useState} from "react";
import {Alert} from "sis-aeb-misc";
import EntityLayout from "../../../shared/misc/form/EntityLayout";
import {TextField} from "sis-aeb-inputs";
import PropTypes from "prop-types";
import WorkPlanRequests from "../../../../utils/fetch/WorkPlanRequests";
import InfrastructurePT from "../../../../packages/locales/InfrastructurePT";

export default function InfrastructureForm(props) {
    const [changed, setChanged] = useState(false)
    const lang = InfrastructurePT
    const [status, setStatus] = useState({
        type: undefined, message: undefined
    })
    useEffect(() => {
        props.handleChange({name: 'work_plan', value: props.workPlan.id})
        if (!props.create)
            try {
                props.handleChange({name: 'latitude', value: props.data.address.split(", ")[0]})
                props.handleChange({name: 'longitude', value: props.data.address.split(", ")[1]})
            } catch (e) {
                console.log(e)
            }


    }, [])
    return (
        <>
            <Alert
                type={status.type} render={status.type !== undefined} rootElementID={'root'}
                handleClose={() => setStatus({type: undefined, message: undefined})} message={status.message}
            />
            <EntityLayout
                rootElementID={'root'} entity={props.data}
                create={props.create} label={props.create ? lang.newInfrastructure : lang.infrastructure}
                dependencies={{
                    fields: [
                        {name: 'name', type: 'string'},
                        {name: 'type', type: 'string'},
                    ],
                    changed: changed
                }}
                returnButton={true} noHeader={!props.create}
                handleSubmit={() =>
                    WorkPlanRequests.submitInfrastructure({
                        pk: props.data.id,
                        data: props.data,
                        setStatus: setStatus,
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
                                    props.handleChange({name: 'name', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.name}
                                required={true}
                                width={'calc(50% - 16px)'}/>


                            <TextField
                                placeholder={lang.type} label={lang.type}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'type', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.type}
                                required={true}
                                width={'calc(50% - 16px)'}/>

                            <TextField
                                placeholder={lang.latitude} label={lang.latitude} type={'number'}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'latitude', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.latitude}
                                required={false}
                                width={'calc(50% - 16px)'}/>
                            <TextField
                                placeholder={lang.longitude} label={lang.longitude} type={'number'}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'longitude', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.longitude}
                                required={false}
                                width={'calc(50% - 16px)'}
                            />
                        </>
                    )
                }]}/>
        </>
    )

}

InfrastructureForm.propTypes = {
    data: PropTypes.object,
    handleChange: PropTypes.func,
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    workPlan: PropTypes.object
}
