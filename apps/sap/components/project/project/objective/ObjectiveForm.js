import React, {useEffect, useState} from "react";
import ProjectPT from "../../../../packages/locales/ProjectPT";
import EntityLayout from "../../../shared/core/form/EntityLayout";
import {DateField, TextField} from "sis-aeb-core";

import PropTypes from "prop-types";
import ProjectRequests from "../../../../utils/requests/ProjectRequests";
import DropDownField from "../../../shared/core/dropdown/DropDownField";


export default function ObjectiveForm(props) {

    const [changed, setChanged] = useState(false)
    const lang = ProjectPT

    useEffect(() => {
        props.handleChange({name: 'project', value: props.project.id})
    }, [])
    return (
        <>

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
                        pk: props.data.id,
                        data: props.data,
                        create: props.create
                    }).then(res => {
                        if(props.create && res)
                            props.returnToMain()
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
