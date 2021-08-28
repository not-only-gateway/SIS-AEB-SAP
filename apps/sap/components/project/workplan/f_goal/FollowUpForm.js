import React, {useEffect, useState} from "react";
import {DropDownField, TextField} from "sis-aeb-inputs";
import PropTypes from "prop-types";
import OperationPT from "../../../../packages/locales/OperationPT";
import EntityLayout from "../../../shared/core/form/EntityLayout";
import OperationRequests from "../../../../utils/requests/OperationRequests";

export default function FollowUpForm(props) {
    const [changed, setChanged] = useState(false)
    const lang = OperationPT

    useEffect(() => {
        props.handleChange({name: 'operation_phase', value: props.operation.id})
    }, [])
    return (
        <>

            <EntityLayout
                rootElementID={'root'} entity={props.data}
                create={props.create} label={props.create ? lang.newFollowUpGoal : lang.followUpGoal}
                dependencies={{
                    fields: [
                        {name: 'description', type: 'string'},
                        {name: 'accomplished', type: 'bool'},
                    ],
                    changed: changed
                }}
                returnButton={true}
                handleSubmit={() =>
                    OperationRequests.submitFollowUpGoal({
                        pk: props.data.id,
                        data: props.data,
                        create: props.create
                    }).then(res => {
                        if(props.create && res)
                            props.returnToMain()
                        setChanged(false)
                    })

                }
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
                                width={'calc(50% - 16px)'}/>


                            <DropDownField
                                dark={true}
                                placeholder={lang.delivered}
                                label={lang.delivered}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'accomplished', value: event})
                                }} value={props.data === null ? null : props.data.accomplished} required={true}
                                width={'calc(50% - 16px)'} choices={lang.options}/>
                        </>
                    )
                }]}/>
        </>
    )

}

FollowUpForm.propTypes = {
    id: PropTypes.number,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    operation: PropTypes.object
}
