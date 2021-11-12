import React, {useState} from "react";
import { TextField} from "mfc-core";
import Form from "../../../../core/inputs/form/Form";
import PropTypes from "prop-types";
import EntitiesPT from "../../locales/EntitiesPT";
import Cookies from "universal-cookie/lib";
import useDataWithDraft from "../../../../core/inputs/form/useDataWithDraft";
import associativeKeys from "../../keys/associativeKeys";
import useQuery from "../../../../core/visualization/hooks/useQuery";
import getQuery from "../../utils/getQuery";
import submit from "../../utils/submit";
import TypeForm from "./TypeForm";
import Host from "../../utils/host";
import FormRow from "../../../../core/inputs/form/FormRow";
import tedKeys from "../../keys/tedKeys";
import FormTemplate from "../../templates/FormTemplate";
import formOptions from "../../templates/formOptions";
import Selector from "../../../../core/inputs/selector/Selector";


export default function ComponentClassificationForm(props) {

    const lang = EntitiesPT

    const typeHook = useQuery(getQuery('type'))

    return (
        <FormTemplate
            keys={associativeKeys.classification}
            endpoint={'classification'}
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
            create={props.create} title={props.create ? lang.newClassification : lang.classification}

            returnButton={true}
            handleSubmit={(data, clearState) =>
                submit({
                    suffix: 'classification',
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
                        placeholder={lang.classification} label={lang.classification}
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

ComponentClassificationForm.propTypes = {
    handleClose: PropTypes.func,
    create: PropTypes.bool,
    asDefault: PropTypes.bool,
    action: PropTypes.object,
}
