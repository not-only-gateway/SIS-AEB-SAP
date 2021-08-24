import React, {useEffect, useState} from "react";
import {Alert} from "sis-aeb-misc";
import EntityLayout from "../../../shared/misc/form/EntityLayout";
import {TextField} from "sis-aeb-inputs";
import PropTypes from "prop-types";
import WorkPlanRequests from "../../../../utils/fetch/WorkPlanRequests";
import StatusPT from "../../../../packages/locales/StatusPT";

export default function StatusForm(props){
    const [changed, setChanged] = useState(false)
    const lang = StatusPT
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
                create={props.create} label={props.create ? lang.newStatus : lang.status}
                dependencies={{
                    fields: [
                        {name: 'status', type: 'string'},
                        {name: 'difficulties', type: 'string'},
                    ],
                    changed: changed
                }}
                returnButton={true}
                handleSubmit={() =>
                    WorkPlanRequests.submitStatus({
                        pk: props.data.id,
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
                                width={'100%'} variant={'area'}/>

                            <TextField
                                placeholder={lang.difficulties} label={lang.difficulties}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'difficulties', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.difficulties}
                                required={true}
                                width={'100%'} variant={'area'}/>

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
