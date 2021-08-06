import React, {useEffect, useState} from "react";
import ProjectPT from "../../packages/locales/ProjectPT";
import {Alert} from "sis-aeb-misc";
import EntityLayout from "../shared/misc/form/EntityLayout";
import {DateField, TextField} from "sis-aeb-inputs";
import PropTypes from "prop-types";
import ProjectRequests from "../../utils/fetch/ProjectRequests";

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
                                required={true}
                                width={'100%'}
                            />

                            <DateField
                                dark={true}
                                placeholder={lang.deadline} label={lang.deadline}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'deadline', value: event.target.value})
                                }}
                                value={
                                    props.data === null ? null : props.data.deadline
                                }
                                required={true} width={'100%'}/>

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
