import React, {useEffect, useState} from "react";
import ProjectPT from "../../locales/ProjectPT";

import {DateField, DropDownField, TextField} from "mfc-core";
import PropTypes from "prop-types";
import Form from "../../../../core/inputs/form/Form";
import useDataWithDraft from "../../../../core/inputs/form/useDataWithDraft";
import Cookies from "universal-cookie/lib";
import submit from "../../utils/requests/submit";
import Host from "../../utils/shared/Host";
import FormRow from "../../../../core/inputs/form/FormRow";


export default function ProjectGoalForm(props) {

    const lang = ProjectPT
    const [initialData, setInitialData] = useState(null)
    const [draftID, setDraftID] = useState(props.draftID)
    const formHook = useDataWithDraft({
        initialData: initialData,
        draftUrl: Host().replace('api', 'draft') + 'goal_project',
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
        setInitialData({
            ...props.data,
            ...{
                project: props.project.id
            }
        })
    }, [])

    return (
        <Form
            hook={formHook}
           title={props.create ? 'Novo marco' : 'Marco'}
            create={props.create} label={lang.objectiveTitle}
            returnButton={true}
            handleSubmit={(data, clearState) =>
                submit({
                    suffix: 'goal_project',
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
                        placeholder={lang.description} label={lang.description}
                        handleChange={event => {

                            handleChange({key: 'description', event: event.target.value})
                        }} value={data.description}
                        required={true} width={'100%'}/>

                    <DropDownField
                        dark={true}
                        placeholder={lang.status}
                        label={lang.status}
                        handleChange={event => {

                            handleChange({key: 'status', event: event})
                        }} value={data.status} required={true}
                        width={'calc(50% - 16px)'} choices={lang.statusOptions}/>

                    <DateField

                        placeholder={lang.deadline} label={lang.deadline}
                        handleChange={event => {
                            handleChange({key: 'deadline', event: event})
                        }}
                        value={
                            data.deadline
                        }
                        required={true} width={'calc(50% - 16px)'}/>
                </FormRow>
            )}
        </Form>
    )

}

ProjectGoalForm.propTypes = {
    id: PropTypes.number,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    handleClose: PropTypes.func,
    create: PropTypes.bool,
    project: PropTypes.object,
}
