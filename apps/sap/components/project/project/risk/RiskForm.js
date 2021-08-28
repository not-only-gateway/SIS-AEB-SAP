import React, {useEffect, useState} from "react";
import ProjectPT from "../../../../packages/locales/ProjectPT";
import EntityLayout from "../../../shared/core/form/EntityLayout";
import {DropDownField, TextField} from "sis-aeb-inputs";
import PropTypes from "prop-types";
import ProjectRequests from "../../../../utils/requests/ProjectRequests";

export default function RiskForm(props){
    const [changed, setChanged] = useState(false)
    const lang = ProjectPT
    useEffect(() => {
        props.handleChange({name: 'project', value: props.project.id})
    }, [])
    return (
        <>

            <EntityLayout
                rootElementID={'root'} entity={props.data}
                create={props.create} label={lang.risksTitle}
                dependencies={{
                    fields: [
                        {name: 'description', type: 'string'},
                        {name: 'analysis', type: 'string'},
                    ],
                    changed: changed
                }}
                returnButton={true}
                handleSubmit={() =>
                    ProjectRequests.submitRisk({
                        pk: props.id,
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
                                required={true}
                                width={'100%'}/>

                            <DropDownField
                                dark={true}
                                placeholder={lang.analysis}
                                label={lang.analysis}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'analysis', value: event})
                                }} value={props.data === null ? null : props.data.analysis} required={true}
                                width={'100%'} choices={lang.riskOptions}/>
                        </>
                    )
                }]}/>
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
