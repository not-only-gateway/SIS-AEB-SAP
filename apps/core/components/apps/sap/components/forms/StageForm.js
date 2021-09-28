import React, {useEffect, useState} from "react";
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

import WorkPlanRequests from "../../utils/requests/WorkPlanRequests";
import GoalPT from "../../locales/GoalPT";


export default function StageForm(props) {
    const lang = GoalPT

    useEffect(() => {
        if (props.create && props.goal !== null && props.goal !== undefined)
            props.handleChange({name: 'goal', value: props.goal.id})
    }, [])
    return (
        <>


            <Form
                initialData={props.data}
                create={props.create} title={props.create ? lang.newStage : lang.stage}
                dependencies={
                    [
                        {name: 'stage', type: 'string'},
                        {name: 'description', type: 'string'},
                        {name: 'representation', type: 'number'},
                        {name: 'goal', type: 'number'},
                    ]
                }
                returnButton={props.create}
                noHeader={!props.create}
                handleSubmit={() =>
                    WorkPlanRequests.submitStage({
                        pk: props.data.id,
                        data: props.data,
                        create: props.create
                    }).then(res => {
                        if (res !== null && props.create)
                            props.redirect(res)
                    })}
                handleClose={() => props.returnToMain()}>
                {(data, handleChange) => (
                    <FormRow>

                            <TextField
                                type={'number'}
                                placeholder={lang.stage} label={lang.stage}
                                handleChange={event => {

                                    props.handleChange({name: 'stage', value: event.target.value})
                                }} value={props.data === null ? null : props.data.stage}
                                required={true}
                                width={props.goal !== null && props.goal !== undefined ? 'calc(33.333% - 21.5px)' : 'calc(50% - 16px)'}/>


                            <TextField
                                placeholder={lang.description} label={lang.description}
                                handleChange={event => {

                                    props.handleChange({name: 'description', value: event.target.value})
                                }} value={props.data === null ? null : props.data.description}
                                required={true}
                                width={props.goal !== null && props.goal !== undefined ? 'calc(33.333% - 21.5px)' : 'calc(50% - 16px)'}/>

                            <TextField
                                placeholder={lang.representation} label={lang.representation}
                                handleChange={event => {

                                    props.handleChange({name: 'representation', value: event.target.value})
                                }} currencyMask={true}
                                value={props.data === null ? null : props.data.representation}
                                required={true} type={'number'}
                                width={props.goal !== null && props.goal !== undefined ? 'calc(33.333% - 21.5px)' : 'calc(50% - 16px)'}/>
                    </FormRow>
                )}
            </Form>
        </>
    )

}

StageForm.propTypes = {
    data: PropTypes.object,
    handleChange: PropTypes.func,
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    goal: PropTypes.object
}
