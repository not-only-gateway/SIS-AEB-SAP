import React, {useMemo} from "react";
import ProjectPT from "../../locales/ProjectPT";

import PropTypes from "prop-types";

import submit from "../../utils/submit";

import projectKeys from "../../keys/projectKeys";
import FormTemplate from "../../../../templates/FormTemplate";
import FORM_OPTIONS from "../../../../static/FORM_OPTIONS";
import {Form, FormRow, SelectField, TextField} from 'mfc-core'

export default function RiskForm(props) {
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
            keys={projectKeys.risks}
            endpoint={'risk'}
            initialData={initialData}
        >
            {({setOpen, formHook, asDraft, asHistory}) => (
                <Form
                    hook={formHook}
                    title={props.create ? 'Novo risco' : 'Risco'}
                    create={props.create} label={lang.risksTitle}
                    returnButton={true}
                    options={FORM_OPTIONS({
                        asDraft: asDraft,
                        asHistory: asHistory,
                        setOpen: setOpen,
                        create: props.create
                    })}
                    handleSubmit={(data, clearState) =>
                        submit({
                            suffix: 'risk',
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
                        <FormRow title={'Identificação do Risco'}>

                            <TextField

                                placeholder={lang.description} label={lang.description}
                                handleChange={event => {

                                    handleChange({key: 'description', event: event.target.value})
                                }} value={data.description}
                                required={true}
                                width={'100%'}/>

                            <SelectField
                                dark={true}
                                placeholder={lang.analysis}
                                label={lang.analysis}
                                handleChange={event => {

                                    handleChange({key: 'analysis', event: event})
                                }} value={data.analysis} required={true}
                                width={'100%'} choices={lang.riskOptions}/>
                        </FormRow>
                    )}

                </Form>
            )}
        </FormTemplate>
    )

}

RiskForm.propTypes = {
    id: PropTypes.number,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    handleClose: PropTypes.func,
    create: PropTypes.bool,
    project: PropTypes.object,
}
