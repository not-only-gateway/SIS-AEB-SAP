import React, {useState} from "react";
import { Selector, TextField} from "mfc-core";
import Form from "../../../../core/inputs/form/Form";
import PropTypes from "prop-types";
import EntitiesPT from "../../locales/EntitiesPT";
import Cookies from "universal-cookie/lib";
import useDataWithDraft from "../../../../core/inputs/form/useDataWithDraft";
import associativeKeys from "../../keys/associativeKeys";
import useQuery from "../../../../core/visualization/hooks/useQuery";
import getQuery from "../../queries/getQuery";
import submit from "../../utils/requests/submit";
import TypeForm from "./TypeForm";
import Host from "../../utils/shared/Host";
import FormRow from "../../../../core/inputs/form/FormRow";


export default function ComponentClassificationForm(props) {

    const lang = EntitiesPT
        const [draftID, setDraftID] = useState(props.draftID)
    const formHook = useDataWithDraft({
        initialData: props.data,
    draftUrl: Host().replace('api', 'draft') + 'classification',
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
    
    const typeHook = useQuery(getQuery('type'))

    return (
        <Form
            hook={formHook}

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
                                key: 'classification'
                            })
                        }} value={data.classification}
                        required={true}
                        width={'calc(50% - 16px'}/>
                    <Selector
                        hook={typeHook}
                        placeholder={'Tipo'}
                        title={'Tipo'}
                        handleChange={e => handleChange({event: e, key: 'classification_type '})}
                        value={data.classification_type } width={'calc(50% - 16px)'} required={true}
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
    )

}

ComponentClassificationForm.propTypes = {
    handleClose: PropTypes.func,
    create: PropTypes.bool,
    asDefault: PropTypes.bool,
    action: PropTypes.object,
}
