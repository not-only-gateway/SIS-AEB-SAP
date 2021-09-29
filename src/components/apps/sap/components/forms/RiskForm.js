import React, {useEffect, useState} from "react";
import ProjectPT from "../../locales/ProjectPT";
import {DropDownField, Form, FormRow, TextField} from "sis-aeb-core";
import PropTypes from "prop-types";
import ProjectRequests from "../../utils/requests/ProjectRequests";


export default function RiskForm(props){
    const lang = ProjectPT
    const [initialData, setInitialData] = useState(props.data)

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
                create={props.create} label={lang.risksTitle}
                dependencies={[
                        {name: 'description', type: 'string'},
                        {name: 'analysis', type: 'string'},
                    ]

                }
                returnButton={true}
                handleSubmit={(data) =>
                    ProjectRequests.submitRisk({
                        pk: data.id,
                        data: data,
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

                                    handleChange({key: 'description', event: event.target.value})
                                }}  value={ data.description}
                                required={true}
                                width={'100%'}/>

                            <DropDownField
                                dark={true}
                                placeholder={lang.analysis}
                                label={lang.analysis}
                                handleChange={event => {

                                 handleChange({key: 'analysis', event: event})
                                }} value={ data.analysis} required={true}
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
