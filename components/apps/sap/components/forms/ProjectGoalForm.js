import React, {useMemo} from "react";
import ProjectPT from "../../locales/ProjectPT";

import {DateField, SelectField, TextField} from "mfc-core";
import PropTypes from "prop-types";
import Form from "../../../../core/inputs/form/Form";
import submit from "../../utils/submit";
import FormRow from "../../../../core/inputs/form/FormRow";
import projectKeys from "../../keys/projectKeys";
import FormTemplate from "../../templates/FormTemplate";
import formOptions from "../../templates/formOptions";


export default function ProjectGoalForm(props) {

    const lang = ProjectPT
    const initialData = useMemo(() => {
        return {
            ...props.data,
            ...{
                project: props.project.id
            }
        }
    }, [props])

    return (
        <FormTemplate
            keys={projectKeys.goal}

            endpoint={'goal_project'}
            initialData={initialData}
        >
            {({setOpen, formHook, asDraft, asHistory}) => (
                <Form
                    hook={formHook}
                    options={formOptions({
                        asDraft: asDraft,
                        asHistory: asHistory,
                        setOpen: setOpen,
                        create: props.create
                    })}
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

                            <SelectField
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
            )}
        </FormTemplate>
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
