import React, {useEffect} from "react";
import {Form, FormRow, TextField} from "sis-aeb-core";
import PropTypes from "prop-types";

import WorkPlanRequests from "../../utils/requests/WorkPlanRequests";
import GoalPT from "../../locales/GoalPT";


export default function ActivityForm(props) {
    const lang = GoalPT

    useEffect(() => {
        if (props.create && props.goal !== null && props.goal !== undefined)
            handleChange({key: 'goal', event: props.goal.id})
    }, [])
    return (
        <>


            <Form
                initialData={props.data}
                create={props.create} title={props.create ? lang.newStage : lang.stage}
                dependencies={
                    [
                        {key: 'stage', type: 'string'},
                        {key: 'description', type: 'string'},
                        {key: 'representation', type: 'number'},
                        {key: 'goal', type: 'number'},
                    ]
                }
                returnButton={props.create}
                noHeader={!props.create}
                handleSubmit={(data, clearState) =>
                    WorkPlanRequests.submitStage({
                        pk: data.id,
                        data: data,
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
                                    handleChange({key: 'stage', event: event.target.value})
                                }} value={ data.stage}
                                required={true}
                                width={props.goal !== null && props.goal !== undefined ? 'calc(33.333% - 21.5px)' : 'calc(50% - 16px)'}/>

                            <TextField
                                placeholder={lang.description} label={lang.description}
                                handleChange={event => {

                                    handleChange({key: 'description', event: event.target.value})
                                }} value={ data.description}
                                required={true}
                                width={props.goal !== null && props.goal !== undefined ? 'calc(33.333% - 21.5px)' : 'calc(50% - 16px)'}/>

                            <TextField
                                placeholder={lang.representation} label={lang.representation}
                                handleChange={event => {

                                    handleChange({key: 'representation', event: event.target.value})
                                }} currencyMask={true}
                                value={ data.representation}
                                required={true} type={'number'}
                                width={props.goal !== null && props.goal !== undefined ? 'calc(33.333% - 21.5px)' : 'calc(50% - 16px)'}/>
                    </FormRow>
                )}
            </Form>
        </>
    )

}

ActivityForm.propTypes = {
    data: PropTypes.object,
    handleChange: PropTypes.func,
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    goal: PropTypes.object
}
