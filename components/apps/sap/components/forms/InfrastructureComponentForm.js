import React, {useMemo} from "react";

import PropTypes from "prop-types";
import associativeKeys from "../../keys/associativeKeys";

import getQuery from "../../utils/getQuery";
import submit from "../../utils/submit";

import FormTemplate from "../../../../addons/FormTemplate";

import {Form, FormRow, Selector, useQuery} from "mfc-core";
import ComponentForm from "./ComponentForm";


export default function InfrastructureComponentForm(props) {
    const typeHook = useQuery(
        getQuery('classification_infrastructure',
        undefined, [{
        key: 'infrastructure',
        type: 'object',
        value: props.infrastructure?.id,
        different_from: true
    }]))
    const initialData = useMemo(() => {
        return {
            ...props.data,
            infrastructure: props.infrastructure?.id
        }
    }, [props.infrastructure])
    return (
        <FormTemplate
            keys={associativeKeys.classification}
            endpoint={'classification'} noDraft={true}
            initialData={initialData}
        >
            {({setOpen, formHook, asDraft, asHistory}) => (
                <Form
                    hook={formHook}
                    create={props.create} title={props.create ? 'Novo componente' : 'Componente'}

                    returnButton={true}
                    handleSubmit={(data, clearState) => {
                        submit({
                            suffix: 'classification_infrastructure',
                            // pk: data.id,
                            data: {...data, component_classification: data.component_classification.component_classification.id},
                            create: props.create,
                        }).then(res => {
                            if (props.create && res.success) {
                                props.handleClose()
                                clearState()
                            }
                        })
                    }}
                    handleClose={() => props.handleClose()}>
                    {(data, handleChange) => (
                        <FormRow>
                            <Selector
                                hook={typeHook}
                                placeholder={'Componente'}
                                label={'Componente'}
                                handleChange={e => handleChange({event: e, key: 'component_classification'})}
                                value={data.component_classification} width={'100%'} required={true}
                                keys={associativeKeys.classificationInfrastructure}
                                createOption={true}
                            >
                                {handleClose => (
                                    <ComponentForm create={true} asDefault={true} handleClose={() => handleClose()}/>
                                )}
                            </Selector>
                        </FormRow>
                    )}
                </Form>
            )}
        </FormTemplate>
    )

}

InfrastructureComponentForm.propTypes = {
    handleClose: PropTypes.func,
    create: PropTypes.bool,
    asDefault: PropTypes.bool,
    infrastructure: PropTypes.object,

}
