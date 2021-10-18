import React, {useEffect, useState} from "react";
import {FormRow, TextField} from "sis-aeb-core";
import PropTypes from "prop-types";
import StatusPT from "../../locales/StatusPT";
import Form from "../../../../core/inputs/form/Form";
import useDataWithDraft from "../../../../core/inputs/form/useDataWithDraft";
import Cookies from "universal-cookie/lib";
import submit from "../../utils/requests/submit";

export default function StatusForm(props) {
    const lang = StatusPT

    const [initialData, setInitialData] = useState(props.data)
    const formHook = useDataWithDraft({
        initialData: initialData,
        draftUrl: '',
        draftHeaders: {'authorization': (new Cookies()).get('jwt')},
        interval: 120000
    })

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
        <Form
            hook={formHook}
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
                submit({
                    suffix: 'status',
                    pk: data.id,
                    data: data,
                    create: props.create
                }).then(res => {
                    if (props.create && res.success) {
                        props.handleClose()
                        clearState()
                    }
                })}
            handleClose={() => props.handleClose()}>
            {(data, handleChange) => (
                <FormRow>

                    <TextField

                        placeholder={lang.status} label={lang.status}
                        handleChange={event => {

                            handleChange({key: 'status', event: event.target.value})
                        }} value={data.status}
                        required={true}
                        width={'100%'} variant={'area'}/>

                    <TextField
                        placeholder={lang.difficulties} label={lang.difficulties}
                        handleChange={event => {

                            handleChange({key: 'difficulties', event: event.target.value})
                        }} value={data.difficulties}
                        required={true}
                        width={'100%'} variant={'area'}/>

                </FormRow>
            )}
        </Form>
    )

}

StatusForm.propTypes = {
    id: PropTypes.number,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    handleClose: PropTypes.func,
    create: PropTypes.bool,
    workPlan: PropTypes.object
}
