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
import OperationPT from "../../locales/OperationPT";
import OperationRequests from "../../utils/requests/OperationRequests";


export default function FollowUpForm(props) {
    const lang = OperationPT
    const [file, setFile] = useState(null)
    useEffect(() => {
        console.log(props.data)
        if (!props.create && props.data.file !== undefined && props.data.file !== null) {
            OperationRequests.fetchFile({
                id: props.data.file
            }).then(e => {
                console.log(e)
                if(e.data !== null)
                    setFile({
                        name: e.fileName,
                        file: e.data
                    })
            })
        }
        props.handleChange({name: 'operation_phase', value: props.operation.id})

    }, [])
    return (
        <>
            <Form
                initialData={props.data}
                create={props.create} title={props.create ? lang.newFollowUpGoal : lang.followUpGoal}
                dependencies={
                     [
                        {name: 'description', type: 'string'},
                        {name: 'accomplished', type: 'bool'},
                    ]
                }
                returnButton={true}
                handleSubmit={() =>
                    OperationRequests.submitFollowUpGoal({
                        pk: props.data.id,
                        data: props.data,
                        create: props.create,
                        file: file
                    }).then(res => {
                        if (props.create && res)
                            props.returnToMain()
                    })

                }
                handleClose={() => props.returnToMain()}>
                {(data, handleChange) => (
                    <FormRow>


                            <TextField
                                placeholder={lang.description} label={lang.description}
                                handleChange={event => {

                                    props.handleChange({name: 'description', value: event.target.value})
                                }}  value={props.data === null ? null : props.data.description}
                                required={true}
                                width={'100%'}
                            />


                            <DropDownField
                                dark={true}
                                placeholder={lang.delivered}
                                label={lang.delivered}
                                handleChange={event => {

                                    props.handleChange({name: 'accomplished', value: event})
                                }} value={props.data === null ? null : props.data.accomplished} required={true}
                                width={'calc(50% - 16px)'} choices={lang.options}
                            />

                            <FileField
                                handleChange={(e) => setFile(e[0])} accept={['.pdf']}
                                width={'calc(50% - 16px)'} required={false} label={'Adicionar PDF'}
                                disabled={false} multiple={false} files={file ? [file] : []}
                                handleFileRemoval={() => {
                                    OperationRequests.deleteFile({
                                        id: props.data.file
                                    }).then(e => {
                                        if(e)
                                            setFile(null)
                                    })
                                }}
                            />

                    </FormRow>
                )}
            </Form>
        </>
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
