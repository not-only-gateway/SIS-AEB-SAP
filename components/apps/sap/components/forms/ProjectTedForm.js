import React, {useMemo} from "react";

import PropTypes from "prop-types";
import associativeKeys from "../../keys/associativeKeys";

import getQuery from "../../utils/getQuery";
import submit from "../../utils/submit";

import FormTemplate from "../../../../addons/FormTemplate";

import {Form, FormRow, Selector, useQuery} from 'mfc-core'

export default function ProjectTedForm(props) {

    const projectHook = useQuery(getQuery(
        'project_ted',
        undefined,
        [{
            key:props.ted? 'ted' : 'activity_project',
            type: 'object',
            value: props.ted ? props.ted.id : props.project.id,
            different_from: true
        }]))
    const initialData = useMemo(() => {
        if(props.ted)
            return {
                ...props.data,
                ted: props.ted?.id
            }
        else
            return {
                ...props.data,
                activity_project: props.ted?.id
            }
    }, [props])

    return (
        <FormTemplate keys={associativeKeys.projectTed}
             noDraft={true}
            initialData={initialData}
        >
            {({setOpen, formHook, asDraft, asHistory}) => (
                <Form
                    hook={formHook} submitLabel={'Vincular'}
                    create={props.create}
                    title={props.ted ? 'Vincular projeto / atividade' : 'Vincular instrumento de celebração'}

                    returnButton={true}
                    handleSubmit={(data, clearState) =>
                        submit({
                            suffix: 'project_ted',
                            data: {
                                ...data,
                                ted: props.ted.id
                            },
                            create: props.create,
                        }).then(res => {
                            if (props.create && res.success) {
                                props.handleClose()
                                clearState()
                            }
                        })}
                    handleClose={() => props.handleClose()}>
                    {(data, handleChange) => (
                        <FormRow>
                            {props.ted ? <Selector
                                hook={projectHook}
                                placeholder={'Projeto / atividade'}
                                label={'Projeto / atividade'}
                                handleChange={e => handleChange({event: e, key: 'activity_project'})}
                                value={data.activity_project} width={'100%'} required={true}
                                keys={associativeKeys.projectTed.filter(e => e.key !== 'ted')}
                            />
                                :
                                <Selector
                                    hook={projectHook}
                                    placeholder={'Instrumento de celebração'}
                                    label={'Instrumento de celebração'}
                                    handleChange={e => handleChange({event: e, key: 'ted'})}
                                    value={data.ted} width={'100%'} required={true}
                                    keys={associativeKeys.projectTed.filter(e => e.key !== 'activity_project')}
                                />
                            }
                        </FormRow>
                    )}
                </Form>
            )}
        </FormTemplate>
    )

}

ProjectTedForm.propTypes = {
    handleClose: PropTypes.func,
    ted: PropTypes.object,
    project: PropTypes.object
}
