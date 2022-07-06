import React, {useEffect, useMemo, useState} from "react";
import PropTypes from "prop-types";
import OperationPT from "../../locales/OperationPT";

import Cookies from "universal-cookie/lib";
import submit from "../../utils/submit";
import Host from "../../utils/host";
import deleteEntry from "../../utils/delete";
import workPlanKeys from "../../keys/workPlanKeys";
import FormTemplate from "../../../../templates/FormTemplate";
import FORM_OPTIONS from "../../../../static/FORM_OPTIONS";
import {FileField, Form, FormRow, request, SelectField, TextField} from 'mfc-core'

export default function FollowUpForm(props) {
    const lang = OperationPT
    const [file, setFile] = useState(null)
    const initialData = useMemo(() => {
        return{
            ...props.data,
            ...{
                operation_phase: props.operation.id
            }
        }
    }, [props])


    useEffect(() => {
        if (!props.create && props.data.file !== undefined && props.data.file !== null) {
            request({
                method: 'get',
                url: Host().replace('/api', '/drive') + '/file',
                package: {
                    identifier: initialData.file
                },
                headers: {'authorization': (new Cookies()).get('jwt')}
            }).then(res => {
                request({
                    method: 'get',
                    url: Host(true) + 'file_name/' + submitProps.id,
                    showSuccessAlert: false,
                    headers: {'authorization': (new Cookies()).get('jwt')}
                }).then(r => {
                    if (r.data && r.data.data)
                        setFile({
                            key: r.data.data,
                            file: res.data
                        })
                })
            }).catch(e =>{})
        }
    }, [])
    return (
        <FormTemplate
            keys={workPlanKeys.followup}
            endpoint={'follow_up_goal'}
            initialData={initialData}
        >
            {({setOpen, formHook, asDraft, asHistory}) => (
                <Form
                    hook={formHook}
                    create={props.create}
                    title={props.create ? lang.newFollowUpGoal : lang.followUpGoal}
                    returnButton={true}
                    options={FORM_OPTIONS({
                        asDraft: asDraft,
                        asHistory: asHistory,
                        setOpen: setOpen,
                        create: props.create
                    })}
                    handleSubmit={(data, clearState) =>
                        submit({
                            suffix: 'follow_up_goal',
                            pk: data.id,
                            data: data,
                            create: props.create,
                            file: file
                        }).then(res => {
                            if (props.create && res.success) {
                                props.handleClose()
                                clearState()
                            }
                        })
                    }
                    handleClose={() => props.handleClose()}>
                    {(data, handleChange) => (
                        <FormRow>
                            <TextField
                                placeholder={lang.description} label={lang.description}
                                handleChange={event => {

                                    handleChange({key: 'description', event: event.target.value})
                                }} value={data.description}
                                required={true}
                                width={'100%'}
                            />

                            <SelectField
                                dark={true}
                                placeholder={lang.delivered}
                                label={lang.delivered}
                                handleChange={event => {

                                    handleChange({key: 'accomplished', event: event})
                                }} value={data.accomplished} required={true}
                                width={'calc(50% - 16px)'} choices={lang.options}
                            />
                            <FileField
                                handleChange={(e) => setFile(e[0])} accept={['.pdf']}
                                width={'calc(50% - 16px)'} required={false} label={'Adicionar PDF'}
                                disabled={false} multiple={false} value={file ? [file] : []}
                                handleFileRemoval={() => {
                                    deleteEntry({
                                        pk: data.file,
                                        url: Host().replace('/api', '/drive') + '/file'
                                    }).then(e => {
                                        if (e.success)
                                            setFile(null)
                                    })
                                }}
                            />

                        </FormRow>
                    )}
                </Form>
            )}
        </FormTemplate>
    )

}

FollowUpForm.propTypes = {
    id: PropTypes.number,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    handleClose: PropTypes.func,
    create: PropTypes.bool,
    operation: PropTypes.object,
}
