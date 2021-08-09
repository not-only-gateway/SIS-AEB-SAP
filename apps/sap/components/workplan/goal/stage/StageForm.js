import React, {useEffect, useState} from "react";

import {Alert} from "sis-aeb-misc";
import {TextField} from "sis-aeb-inputs";
import PropTypes from "prop-types";
import EntityLayout from "../../../shared/misc/form/EntityLayout";
import WorkPlanRequests from "../../../../utils/fetch/WorkPlanRequests";
import GoalPT from "../../../../packages/locales/GoalPT";


export default function StageForm(props) {
    const [changed, setChanged] = useState(false)
    const lang = GoalPT
    const [status, setStatus] = useState({
        type: undefined, message: undefined
    })
    useEffect(() => {
        if(props.create)
         props.handleChange({name: 'goal', value: props.goal.id})
    }, [])
    return (
        <>

                <Alert
                    type={status.type} render={status.type !== undefined} rootElementID={'root'}
                    handleClose={() => setStatus({type: undefined, message: undefined})}
                    message={status.message}
                />

            <EntityLayout
                rootElementID={'root'} entity={props.data}
                create={props.create} label={props.create ? lang.newStage : lang.stage}
                dependencies={{
                    fields: [
                        {name: 'stage', type: 'string'},
                        {name: 'description', type: 'string'},
                        {name: 'representation', type: 'number'}
                    ],
                    changed: changed
                }}
                returnButton={props.create}
                noHeader={!props.create}
                handleSubmit={() =>
                    WorkPlanRequests.submitStage({
                        pk: props.data.id,
                        data: props.data,
                        setStatus: setStatus,
                        create: props.create
                    }).then(res => {
                        if (res !== null && props.create)
                            props.redirect(res)

                        if (!props.create && res)
                            setChanged(false)
                    })}
                handleClose={() => props.returnToMain()}
                forms={[{
                    child: (
                        <>
                            <TextField

                                placeholder={lang.stage} label={lang.stage}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'stage', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.stage}
                                required={true}
                                width={'100%'}/>


                            <TextField
                                placeholder={lang.description} label={lang.description}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'description', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.description}
                                required={true}
                                width={'calc(50% - 16px)'}/>

                            <TextField
                                placeholder={lang.representation} label={lang.representation}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'representation', value: event.target.value})
                                }} locale={props.locale}
                                value={props.data === null ? null : props.data.representation}
                                required={true} type={'number'}
                                width={'calc(50% - 16px)'}/>


                        </>
                    )
                }]}/>
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
