import React, {useMemo} from "react";
import PropTypes from "prop-types";
import InfrastructurePT from "../../locales/InfrastructurePT";
import {SelectField} from "mfc-core";
import Form from "../../../../core/inputs/form/Form";
import associativeKeys from "../../keys/associativeKeys";
import useQuery from "../../../../core/visualization/hooks/useQuery";
import getQuery from "../../utils/getQuery";
import submit from "../../utils/submit";
import ComponentForm from "./ComponentForm";
import FormRow from "../../../../core/inputs/form/FormRow";
import FormTemplate from "../../templates/FormTemplate";
import formOptions from "../../templates/formOptions";
import Selector from "../../../../core/inputs/selector/Selector";


export default function SOCForm(props) {
    const classificationHook = useQuery(
        getQuery('classification_infrastructure',
            undefined, [{
                key: 'infrastructure',
                type: 'object',
                value: props.infrastructure?.id
            }]))
    const lang = InfrastructurePT
    const initialData = useMemo(() => {
        return {
            ...props.data,
            ...{
                infrastructure: props.infrastructure.id
            }
        }
    }, [props])


    return (
        <FormTemplate
            keys={associativeKeys.components}
            endpoint={'component'}
            initialData={initialData}
        >
            {({setOpen, formHook, asDraft, asHistory}) => (
                <Form
                    hook={formHook}
                    create={props.create}
                    title={props.create ? 'Nova situação operacional de componentes' : 'Situação operacional de componentes'}
                    returnButton={true}
                    options={formOptions({
                        asDraft: asDraft,
                        asHistory: asHistory,
                        setOpen: setOpen,
                        create: props.create
                    })}
                    handleSubmit={(data, clearState) =>{
                        console.log(data)
                        submit({
                            suffix: 'component',
                            pk: data.id,
                            data: props.create ? {...data, component_classification: data.component_classification.component_classification.id} : data,
                            create: props.create
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
                                hook={classificationHook}
                                placeholder={'Componente'}
                                label={'Componente'}
                                handleChange={e => {

                                    handleChange({event: e, key: 'component_classification'})
                                }}
                                value={data.component_classification} width={'calc(50% - 16px)'} required={true}
                                keys={associativeKeys.classificationInfrastructure.filter(e => e.key !== 'infrastructure')}
                                createOption={true}
                            >
                                {handleClose => (
                                    <ComponentForm create={true} asDefault={true}
                                                   handleClose={() => handleClose()}/>
                                )}
                            </Selector>
                            <SelectField
                                choices={[
                                    {key: 'operacional', value: 'Operacional'},
                                    {key: 'em manutenção', value: 'Em manutenção'},
                                    {key: 'Inoperante', value: 'Inoperante'},
                                    {key: 'Degradado', value: 'Degradado'},
                                    {key: 'Obsoleto', value: 'Obsoleto'}
                                ]}
                                placeholder={lang.situation}
                                label={lang.situation}
                                handleChange={event => {

                                    handleChange({
                                        event: event,
                                        key: 'situation'
                                    })
                                }} value={data.situation}
                                required={true}
                                width={'calc(50% - 16px)'}/>
                        </FormRow>
                    )}
                </Form>
            )}
        </FormTemplate>
    )

}

SOCForm.propTypes = {
    data: PropTypes.object,
    handleChange: PropTypes.func,
    handleClose: PropTypes.func,
    create: PropTypes.bool,
    infrastructure: PropTypes.object,
}
