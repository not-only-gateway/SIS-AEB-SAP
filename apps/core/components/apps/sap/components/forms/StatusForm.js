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
import StatusPT from "../../locales/StatusPT";

export default function StatusForm(props){
    const lang = StatusPT

    useEffect(() => {
        props.handleChange({name: 'work_plan', value: props.workPlan.id})
    }, [])
    return (
        <>

            <Form
                initialData={props.data}
                create={props.create} title={props.create ? lang.newStatus : lang.status}
                dependencies={
                 [
                        {name: 'status', type: 'string'},
                        {name: 'difficulties', type: 'string'},
                    ]
                }
                returnButton={true}
                handleSubmit={() =>
                    WorkPlanRequests.submitStatus({
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

                                placeholder={lang.status} label={lang.status}
                                handleChange={event => {

                                    props.handleChange({name: 'status', value: event.target.value})
                                }} value={props.data === null ? null : props.data.status}
                                required={true}
                                width={'100%'} variant={'area'}/>

                            <TextField
                                placeholder={lang.difficulties} label={lang.difficulties}
                                handleChange={event => {

                                    props.handleChange({name: 'difficulties', value: event.target.value})
                                }} value={props.data === null ? null : props.data.difficulties}
                                required={true}
                                width={'100%'} variant={'area'}/>

                    </FormRow>
                )}
            </Form>
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
