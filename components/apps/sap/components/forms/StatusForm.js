import React, {useEffect, useState} from "react";
import {TextField} from "mfc-core";
import PropTypes from "prop-types";
import StatusPT from "../../locales/StatusPT";
import Form from "../../../../core/inputs/form/Form";
import useDataWithDraft from "../../../../core/inputs/form/useDataWithDraft";
import Cookies from "universal-cookie/lib";
import submit from "../../utils/requests/submit";
import Host from "../../utils/shared/Host";
import FormRow from "../../../../core/inputs/form/FormRow";
import tedKeys from "../../keys/tedKeys";


export default function StatusForm(props) {
    const lang = StatusPT

    const [initialData, setInitialData] = useState(props.data)
        const [draftID, setDraftID] = useState(props.draftID)
    const formHook = useDataWithDraft({
        initialData: initialData,
    draftUrl: Host().replace('api', 'draft') + 'status',
        draftHeaders: {'authorization': (new Cookies()).get('jwt')},
        interval: 5000,
        parsePackage: pack => {
            return {
                ...pack,
                identifier: draftID
            }
        },
        draftMethod: draftID ? 'put' : 'post',
        onSuccess: (res) => {
            setDraftID(res.data.id)
        }
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
        <FormOptions
            keys={tedKeys.ted}
            endpoint={'ted'}
            initialData={props.data}
        >
            {({setOpen, formHook, asDraft, asHistory}) => (
        <Form
            hook={formHook}
            create={props.create}
            title={props.create ? lang.newStatus : lang.status}
            returnButton={true}
            handleSubmit={(data, clearState) =>
                submit({
                    suffix: 'status',
                    pk: data.id,
                    data: {...data,
                        update_date: (new Date()).toDateString()
                    },
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
            )}
        </FormOptions>
    )

}

StatusForm.propTypes = {
    id: PropTypes.number,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    handleClose: PropTypes.func,
    create: PropTypes.bool,
    workPlan: PropTypes.object,
}
