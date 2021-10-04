import React, {useEffect, useState} from "react";
import {Form, FormRow, TextField} from "sis-aeb-core";
import PropTypes from "prop-types";
import WorkPlanRequests from "../../utils/requests/WorkPlanRequests";
import StatusPT from "../../locales/StatusPT";

export default function StatusForm(props){
    const lang = StatusPT

    const [initialData, setInitialData] = useState(props.data)
    useEffect(() => {
        if (props.create)
            setInitialData({
                ...props.data,
                ...{
                    work_plan: props.workPlan.id
                }
            })
    }, [])



    return (
        <>

            <Form
                initialData={initialData}
                create={props.create} title={props.create ? lang.newStatus : lang.status}
                dependencies={
                 [
                        {key: 'status', type: 'string'},
                        {key: 'difficulties', type: 'string'},
                    ]
                }
                returnButton={true}
                handleSubmit={(data, clearState) =>
                    WorkPlanRequests.submitStatus({
                        pk: data.id,
                        data: data,
                        create: props.create
                    }).then(res => {
                        if(props.create && res) {
                            props.returnToMain()
                            clearState()
                        }
                    })}
                handleClose={() => props.returnToMain()}>
                {(data, handleChange) => (
                    <FormRow>

                            <TextField

                                placeholder={lang.status} label={lang.status}
                                handleChange={event => {

                                    handleChange({key: 'status', event: event.target.value})
                                }} value={ data.status}
                                required={true}
                                width={'100%'} variant={'area'}/>

                            <TextField
                                placeholder={lang.difficulties} label={lang.difficulties}
                                handleChange={event => {

                                    handleChange({key: 'difficulties', event: event.target.value})
                                }} value={ data.difficulties}
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
