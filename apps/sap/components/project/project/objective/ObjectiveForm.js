import React, {useEffect, useState} from "react";
import ProjectPT from "../../../../packages/locales/ProjectPT";
import {Alert} from "sis-aeb-misc";
import EntityLayout from "../../../shared/misc/form/EntityLayout";
import { DropDownField, TextField} from "sis-aeb-inputs";

import PropTypes from "prop-types";
import ProjectRequests from "../../../../utils/fetch/ProjectRequests";
import DateField from "../../../shared/inputs/date/DateField";


export default function ObjectiveForm(props) {

    const [changed, setChanged] = useState(false)
    const lang = ProjectPT
    const [status, setStatus] = useState({
        type: undefined, message: undefined
    })
    useEffect(() => {
        props.handleChange({name: 'project', value: props.project.id})
    }, [])
    return (
        <>
            <Alert
                type={status.type} render={status.type !== undefined} rootElementID={'root'}
                handleClose={() => setStatus({type: undefined, message: undefined})} message={status.message}
            />
            <EntityLayout
                rootElementID={'root'} entity={props.data}
                create={props.create} label={lang.objectiveTitle}
                dependencies={{
                    fields: [
                        {name: 'description', type: 'string'},
                        {name: 'deadline', type: 'string'},
                        {name: 'status', type: 'string'},
                    ],
                    changed: changed
                }}
                returnButton={true}
                handleSubmit={() =>
                    ProjectRequests.submitObjective({
                        pk: props.id,
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
                                placeholder={lang.description} label={lang.description}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'description', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.description}
                                required={true} width={'100%'}/>

                            <DropDownField
                                dark={true}
                                placeholder={lang.status}
                                label={lang.status}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'status', value: event})
                                }} value={props.data === null ? null : props.data.status} required={true}
                                width={'calc(50% - 16px)'} choices={lang.statusOptions}/>

                            <DateField

                                placeholder={lang.deadline} label={lang.deadline}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'deadline', value: event})
                                }}
                                value={
                                    props.data === null ? null : props.data.deadline
                                }
                                required={true} width={'calc(50% - 16px)'}/>

                        </>

                    )
                }]}/>
        </>
    )

}

ObjectiveForm.propTypes = {
    id: PropTypes.number,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    project: PropTypes.object
}
