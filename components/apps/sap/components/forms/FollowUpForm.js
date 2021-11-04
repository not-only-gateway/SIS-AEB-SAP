import React, {useEffect, useState} from "react";
import {DropDownField, TextField} from "mfc-core";
import PropTypes from "prop-types";
import OperationPT from "../../locales/OperationPT";
import Form from "../../../../core/inputs/form/Form";
import Cookies from "universal-cookie/lib";
import submit from "../../utils/requests/submit";
import Requester from "../../../../core/feedback/requester/Requester";
import Host from "../../utils/shared/Host";
import deleteEntry from "../../utils/requests/delete";
import FormRow from "../../../../core/inputs/form/FormRow";
import FileField from "../../../../core/inputs/file/FileField";
import workPlanKeys from "../../keys/workPlanKeys";


export default function FollowUpForm(props) {
    const lang = OperationPT
    const [file, setFile] = useState(null)
    const [initialData, setInitialData] = useState(props.data)


    useEffect(() => {
        if (!props.create && props.data.file !== undefined && props.data.file !== null) {
            Requester({
                method: 'get',
                url: Host().replace('/api', '/drive') + '/file',
                package: {
                    identifier: initialData.file
                },
                headers: {'authorization': (new Cookies()).get('jwt')}
            }).then(res => {
                Requester({
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
            }).catch(e => console.log(e))
        }
        setInitialData({
            ...props.data,
            ...{
                operation_phase: props.operation.id
            }
        })

    }, [])
    return (
        <FormOptions
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

                            <DropDownField
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
        </FormOptions>
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
