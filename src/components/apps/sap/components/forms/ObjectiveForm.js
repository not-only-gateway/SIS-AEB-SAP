import React, {useEffect, useState} from "react";
import ProjectPT from "../../locales/ProjectPT";

import {DateField, DropDownField, Form, FormRow, TextField} from "sis-aeb-core";
import PropTypes from "prop-types";
import ProjectRequests from "../../utils/requests/ProjectRequests";


export default function ObjectiveForm(props) {

    const lang = ProjectPT
    const [initialData, setInitialData] = useState(null)
    useEffect(() => {
        setInitialData({
            ...props.data,
            ...{
                project: props.project.id
            }
        })
    }, [])
    return (
        <>

            <Form
                initialData={initialData}
                create={props.create} label={lang.objectiveTitle}
                dependencies={
                    [
                        {key: 'description', type: 'string'},
                        {key: 'deadline', type: 'string'},
                        {key: 'status', type: 'string'},
                    ]
                }
                returnButton={true}
                handleSubmit={(data) =>
                    ProjectRequests.submitObjective({
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
                            placeholder={lang.description} label={lang.description}
                            handleChange={event => {

                                handleChange({key: 'description', value: event.target.value})
                            }}  value={ data.description}
                            required={true} width={'100%'}/>

                        <DropDownField
                            dark={true}
                            placeholder={lang.status}
                            label={lang.status}
                            handleChange={event => {

                                handleChange({key: 'status', value: event})
                            }} value={ data.status} required={true}
                            width={'calc(50% - 16px)'} choices={lang.statusOptions}/>

                        <DateField

                            placeholder={lang.deadline} label={lang.deadline}
                            handleChange={event => {

                                handleChange({key: 'deadline', value: event})
                            }}
                            value={
                                 data.deadline
                            }
                            required={true} width={'calc(50% - 16px)'}/>
                    </FormRow>
                )}
            </Form>
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