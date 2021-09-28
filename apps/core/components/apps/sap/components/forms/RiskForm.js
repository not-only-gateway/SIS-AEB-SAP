import React, {useEffect, useState} from "react";
import ProjectPT from "../../locales/ProjectPT";
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
import ProjectRequests from "../../utils/requests/ProjectRequests";


export default function RiskForm(props){

    const lang = ProjectPT
    useEffect(() => {
        props.handleChange({name: 'project', value: props.project.id})
    }, [])
    return (
        <>

            <Form
                initialData={props.data}
                create={props.create} label={lang.risksTitle}
                dependencies={
                    [
                        {name: 'description', type: 'string'},
                        {name: 'analysis', type: 'string'},
                    ]

                }
                returnButton={true}
                handleSubmit={() =>
                    ProjectRequests.submitRisk({
                        pk: props.data.id,
                        data: props.data,
                        create: props.create
                    }).then(res => {
                        if(props.create && res)
                            props.returnToMain()
                    })}
                handleClose={() => props.returnToMain()}>
                {(data, handleChange) => (
                    <FormRow>

                            <TextField

                                placeholder={lang.description} label={lang.description}
                                handleChange={event => {

                                    props.handleChange({name: 'description', value: event.target.value})
                                }}  value={props.data === null ? null : props.data.description}
                                required={true}
                                width={'100%'}/>

                            <DropDownField
                                dark={true}
                                placeholder={lang.analysis}
                                label={lang.analysis}
                                handleChange={event => {

                                    props.handleChange({name: 'analysis', value: event})
                                }} value={props.data === null ? null : props.data.analysis} required={true}
                                width={'100%'} choices={lang.riskOptions}/>
                    </FormRow>
                )}

            </Form>
        </>
    )

}

RiskForm.propTypes = {
    id: PropTypes.number,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    project: PropTypes.object
}
