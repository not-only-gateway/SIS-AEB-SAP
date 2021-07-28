import React, {useEffect, useState} from "react";

import {Alert} from "sis-aeb-misc";
import {TextField} from "sis-aeb-inputs";
import PropTypes from "prop-types";
import InfrastructurePT from "../../../packages/locales/InfrastructurePT";
import EntityLayout from "../../shared/misc/form/EntityLayout";
import WorkPlanRequests from "../../../utils/fetch/WorkPlanRequests";


export default function ComponentForm(props) {
    const [changed, setChanged] = useState(false)
    const lang = InfrastructurePT
    const [status, setStatus] = useState({
        type: undefined, message: undefined
    })
    useEffect(() => {
        props.handleChange({name: 'infrastructure', value: props.infrastructure.id})
    }, [])
    return (
        <>
            <Alert
                type={status.type} render={status.type !== undefined} rootElementID={'root'}
                handleClose={() => setStatus({type: undefined, message: undefined})} message={status.message}
            />
            <EntityLayout
                rootElementID={'root'} entity={props.data}
                create={props.create} label={props.create ? lang.newComponent : lang.component}
                dependencies={{
                    fields: [
                        {name: 'situation', type: 'string'},
                        {name: 'type', type: 'string'},
                        {name: 'classification', type: 'string'}
                    ],
                    changed: changed
                }}
                returnButton={true}
                handleSubmit={() =>
                    WorkPlanRequests.submitComponent({
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

                                placeholder={lang.situation} label={lang.situation}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'situation', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.situation}
                                required={true}
                                width={'100%'}/>


                            <TextField
                                placeholder={lang.type} label={lang.type}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'type', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.type}
                                required={true}
                                width={'calc(50% - 16px)'}/>

                            <TextField
                                placeholder={lang.classification} label={lang.classification}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'classification', value: event.target.value})
                                }} locale={props.locale}
                                value={props.data === null ? null : props.data.classification}
                                required={true}
                                width={'calc(50% - 16px)'}/>


                        </>
                    )
                }]}/>
        </>
    )

}

ComponentForm.propTypes = {
    data: PropTypes.object,
    handleChange: PropTypes.func,
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    infrastructure: PropTypes.object
}
