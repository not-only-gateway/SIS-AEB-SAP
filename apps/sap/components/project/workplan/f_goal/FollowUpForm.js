import React, {useEffect, useState} from "react";
import {DropDownField, TextField} from "sis-aeb-core";
import PropTypes from "prop-types";
import OperationPT from "../../../../packages/locales/OperationPT";
import Form from "../../../shared/core/form/Form";
import OperationRequests from "../../../../utils/requests/OperationRequests";
import FileField from "../../../shared/core/file/FileField";

export default function FollowUpForm(props) {
    const [changed, setChanged] = useState(false)
    const lang = OperationPT
    const [file, setFile] = useState(null)
    useEffect(() => {
        if(!props.create && props.data.file !== undefined && props.data.file !== null){
            OperationRequests.fetchFile({
                id: props.data.file
            }).then(e => {
                console.log(e)
                // setFile(e.headers['Content-Disposition'])
            })
        }
        props.handleChange({name: 'operation_phase', value: props.operation.id})

    }, [])
    return (
        <>
            <Form
                rootElementID={'root'} entity={props.data}
                create={props.create} label={props.create ? lang.newFollowUpGoal : lang.followUpGoal}
                dependencies={{
                    fields: [
                        {name: 'description', type: 'string'},
                        {name: 'accomplished', type: 'bool'},
                    ],
                    changed: changed
                }}
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
                        setChanged(false)
                    })

                }
                handleClose={() => props.returnToMain()}
                forms={[{
                    child: (
                        <>
                            <TextField
                                placeholder={lang.description} label={lang.description}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'description', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.description}
                                required={true}
                                width={'100%'}
                            />


                            <DropDownField
                                dark={true}
                                placeholder={lang.delivered}
                                label={lang.delivered}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'accomplished', value: event})
                                }} value={props.data === null ? null : props.data.accomplished} required={true}
                                width={'calc(50% - 16px)'} choices={lang.options}/>
                            <FileField label={'Importar PDF'} width={'calc(50% - 16px)'} required={false}
                                       multiple={false} accept={'.pdf'}
                                       file={file}
                                       handleChange={files => {
                                           setChanged(true)
                                           if (files !== null)
                                               setFile(files[0])
                                           else
                                               setFile(null)
                                       }}/>
                        </>
                    )
                }]}/>
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
