import React, {useEffect, useMemo, useState} from "react";
import {TextField} from "mfc-core";
import Form from "../../../../core/inputs/form/Form";
import PropTypes from "prop-types";
import associativeKeys from "../../keys/associativeKeys";
import useQuery from "../../../../core/visualization/hooks/useQuery";
import getQuery from "../../utils/getQuery";
import submit from "../../utils/submit";
import TypeForm from "./TypeForm";
import FormRow from "../../../../core/inputs/form/FormRow";
import FormTemplate from "../../templates/FormTemplate";
import formOptions from "../../templates/formOptions";
import Selector from "../../../../core/inputs/selector/Selector";
import {fetchEntry} from "../../utils/fetchData";


export default function ComponentForm(props) {
    const typeHook = useQuery(getQuery('type'))

    return (
        <FormTemplate
            keys={associativeKeys.classification}
            endpoint={'classification'} noDraft={true}
            initialData={props.data}
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
                    create={props.create}
                    title={props.create ? 'Novo componente' : 'Componente'}

                    returnButton={true}
                    handleSubmit={(data, clearState) =>
                        submit({
                            suffix: 'classification',
                            pk: data.id,
                            data: data,
                            create: props.create
                        }).then(res => {
                            if (props.create && res.success) {
                                props.onCreationSuccess(res.data)
                                props.handleClose()
                                clearState()
                            }
                        })}
                    handleClose={() => props.handleClose()}>
                    {(data, handleChange) => (
                        <FormRow>
                            <TextField
                                placeholder={'Descrição do componente'} label={'Descrição do componente'}
                                handleChange={event => {

                                    handleChange({
                                        event: event.target.value,
                                        key: 'description'
                                    })
                                }} value={data.description}
                                required={true}
                                width={'calc(50% - 16px'}/>
                            <Selector
                                hook={typeHook}
                                placeholder={'Tipo'}
                                label={'Tipo'}
                                handleChange={e => handleChange({event: e, key: 'classification_type'})}
                                value={data.classification_type} width={'calc(50% - 16px)'} required={true}
                                keys={associativeKeys.type}
                                createOption={true}
                            >
                                {handleClose => (
                                    <TypeForm create={true} asDefault={true} handleClose={() => handleClose()}/>
                                )}
                            </Selector>

                        </FormRow>
                    )}
                </Form>
            )}
        </FormTemplate>
    )

}

ComponentForm.propTypes = {
    handleClose: PropTypes.func,
    create: PropTypes.bool,
    asDefault: PropTypes.bool,
    action: PropTypes.object,
    onCreationSuccess: PropTypes.func
}
