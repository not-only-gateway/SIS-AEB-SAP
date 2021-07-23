import React, {useEffect, useState} from "react";
import ProjectPT from "../../packages/locales/ProjectPT";
import {Alert} from "sis-aeb-misc";
import EntityLayout from "../shared/misc/form/EntityLayout";
import submitProject from "../../utils/submit/SubmitProject";
import {DateField, TextField} from "sis-aeb-inputs";
import PropTypes from "prop-types";
import ProjectRequests from "../../utils/fetch/ProjectRequests";
import WorkPlanRequests from "../../utils/fetch/WorkPlanRequests";

export default function StatusForm(props){
    const [changed, setChanged] = useState(false)
    const lang = ProjectPT
    const [status, setStatus] = useState({
        type: undefined, message: undefined
    })
    useEffect(() => {
        props.handleChange({name: 'work_plan', value: props.workPlan.id})
    }, [])
    return (
        <>
            <Alert
                type={status.type} render={status.type !== undefined} rootElementID={'root'}
                handleClose={() => setStatus({type: undefined, message: undefined})} message={status.message}
            />
            <EntityLayout
                rootElementID={'root'} entity={props.data}
                create={props.create} label={lang.risksTitle}
                dependencies={{
                    fields: [
                        {name: 'status', type: 'string'},
                        {name: 'update_date', type: 'date'},
                        {name: 'difficulties', type: 'string'},
                    ],
                    changed: changed
                }}
                returnButton={true}
                handleSubmit={() =>
                    WorkPlanRequests.submitStatus({
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

                                placeholder={lang.status} label={lang.status}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'status', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.status}
                                required={true}
                                width={'calc(50% - 16px)'}/>

                            <DateField
                                dark={true}
                                placeholder={lang.updateDate} label={lang.updateDate}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'update_date', value: event.target.value})
                                }}
                                value={
                                    props.data === null ? null : props.data.update_date
                                }
                                required={true} width={'calc(50% - 16px)'}/>
                            <TextField
                                placeholder={lang.difficulties} label={lang.difficulties}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'difficulties', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.difficulties}
                                required={true}
                                width={'100%'}/>

                        </>
                    )
                }]}/>
        </>
    )

}

StatusForm.propTypes = {
    id: PropTypes.number,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    workPlan: PropTypes.object
}
