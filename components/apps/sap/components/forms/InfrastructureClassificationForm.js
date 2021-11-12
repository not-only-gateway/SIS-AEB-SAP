import React, {useMemo} from "react";
import {TextField} from "mfc-core";
import Form from "../../../../core/inputs/form/Form";
import PropTypes from "prop-types";
import EntitiesPT from "../../locales/EntitiesPT";
import associativeKeys from "../../keys/associativeKeys";
import useQuery from "../../../../core/visualization/hooks/useQuery";
import getQuery from "../../utils/getQuery";
import submit from "../../utils/submit";
import TypeForm from "./TypeForm";
import FormRow from "../../../../core/inputs/form/FormRow";
import FormTemplate from "../../templates/FormTemplate";
import formOptions from "../../templates/formOptions";
import Selector from "../../../../core/inputs/selector/Selector";
import ComponentClassificationForm from "./ComponentClassificationForm";


export default function InfrastructureClassificationForm(props) {

    const lang = EntitiesPT

    const typeHook = useQuery(getQuery('classification'))
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
                    create={props.create} title={props.create ? lang.newClassification : lang.classification}

                    returnButton={true}
                    handleSubmit={(data, clearState) =>
                        submit({
                            suffix: 'classification_infrastructure',
                            // pk: data.id,
                            data: data,
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
                            <Selector
                                hook={typeHook}
                                placeholder={'Componente'}
                                label={'Componente'}
                                handleChange={e => handleChange({event: e, key: 'classification'})}
                                value={data.classification} width={'100%'} required={true}
                                keys={associativeKeys.classification}
                                createOption={true}
                            >
                                {handleClose => (
                                    <ComponentClassificationForm create={true} asDefault={true} handleClose={() => handleClose()}/>
                                )}
                            </Selector>
                        </FormRow>
                    )}
                </Form>
            )}
        </FormTemplate>
    )

}

InfrastructureClassificationForm.propTypes = {
    handleClose: PropTypes.func,
    create: PropTypes.bool,
    asDefault: PropTypes.bool,
    infrastructure: PropTypes.object,

}
