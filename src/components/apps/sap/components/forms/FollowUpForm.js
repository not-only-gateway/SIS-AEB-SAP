import React, {useEffect, useState} from "react";
import {DropDownField, FileField, FormRow, TextField} from "sis-aeb-core";
import PropTypes from "prop-types";
import OperationPT from "../../locales/OperationPT";
import OperationRequests from "../../utils/requests/OperationRequests";
import Form from "../../../../core/inputs/form/Form";
import useDataWithDraft from "../../../../core/inputs/form/useDataWithDraft";
import Cookies from "universal-cookie/lib";

export default function FollowUpForm(props) {
    const lang = OperationPT
    const [file, setFile] = useState(null)
    const [initialData, setInitialData] = useState(props.data)
    const formHook = useDataWithDraft({
        initialData: initialData,
        draftUrl: '',
        draftHeaders: {'authorization': (new Cookies()).get('jwt')},
        interval: 120000
    })

    useEffect(() => {
        if (!props.create && props.data.file !== undefined && props.data.file !== null) {
            OperationRequests.fetchFile({
                id: data.file
            }).then(e => {
                console.log(e)
                if (e.data !== null)
                    setFile({
                        key: e.fileName,
                        file: e.data
                    })
            })
        }
        setInitialData({
            ...props.data,
            ...{
                operation_phase: props.operation.id
            }
        })

    }, [])
    return (
        <Form
            hook={formHook}
            initialData={initialData}
            create={props.create} title={props.create ? lang.newFollowUpGoal : lang.followUpGoal}
            dependencies={
                [
                    {key: 'description', type: 'string'},
                    {key: 'accomplished', type: 'bool'},
                ]
            }
            returnButton={true}
            handleSubmit={(data, clearState) =>
                OperationRequests.submitFollowUpGoal({
                    pk: data.id,
                    data: data,
                    create: props.create,
                    file: file
                }).then(res => {
                    if (props.create && res) {
                        props.returnToMain()
                        clearState()
                    }
                })

            }
            handleClose={() => props.returnToMain()}>
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
                        disabled={false} multiple={false} files={file ? [file] : []}
                        handleFileRemoval={() => {
                            OperationRequests.deleteFile({
                                id: data.file
                            }).then(e => {
                                if (e)
                                    setFile(null)
                            })
                        }}
                    />

                </FormRow>
            )}
        </Form>
    )

}

FollowUpForm.propTypes = {
    id: PropTypes.number,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    operation: PropTypes.object
}
