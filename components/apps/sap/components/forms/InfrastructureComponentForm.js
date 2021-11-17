import React, {useMemo} from "react";
import PropTypes from "prop-types";
import InfrastructurePT from "../../locales/InfrastructurePT";
import {DropDownField, Selector} from "mfc-core";
import Form from "../../../../core/inputs/form/Form";
import associativeKeys from "../../keys/associativeKeys";
import useQuery from "../../../../core/visualization/hooks/useQuery";
import getQuery from "../../utils/getQuery";
import submit from "../../utils/submit";
import ComponentDescriptionForm from "./ComponentDescriptionForm";
import FormRow from "../../../../core/inputs/form/FormRow";
import FormTemplate from "../../templates/FormTemplate";
import formOptions from "../../templates/formOptions";


export default function InfrastructureComponentForm(props) {
    const classificationHook = useQuery(getQuery('classification'))
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
                    handleSubmit={(data, clearState) =>
                        submit({
                            suffix: 'component',
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

                            <Selector
                                hook={classificationHook}
                                placeholder={'Componente'}
                                label={'Componente'}
                                handleChange={e => handleChange({event: e, key: 'classification'})}
                                value={data.classification} width={'calc(50% - 16px)'} required={true}
                                keys={associativeKeys.classification}
                                createOption={true}
                            >
                                {handleClose => (
                                    <ComponentDescriptionForm create={true} asDefault={true}
                                                              handleClose={() => handleClose()}/>
                                )}
                            </Selector>
                            <DropDownField
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
                                    console.log(event)
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

InfrastructureComponentForm.propTypes = {
    data: PropTypes.object,
    handleChange: PropTypes.func,
    handleClose: PropTypes.func,
    create: PropTypes.bool,
    infrastructure: PropTypes.object,
}
