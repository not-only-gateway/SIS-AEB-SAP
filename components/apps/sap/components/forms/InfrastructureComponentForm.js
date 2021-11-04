import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";
import InfrastructurePT from "../../locales/InfrastructurePT";
import Cookies from "universal-cookie/lib";
import { Selector, TextField} from "mfc-core";
import Form from "../../../../core/inputs/form/Form";
import useDataWithDraft from "../../../../core/inputs/form/useDataWithDraft";
import associativeKeys from "../../keys/associativeKeys";
import useQuery from "../../../../core/visualization/hooks/useQuery";
import getQuery from "../../queries/getQuery";
import submit from "../../utils/requests/submit";
import ComponentClassificationForm from "./ComponentClassificationForm";
import Host from "../../utils/shared/Host";
import FormRow from "../../../../core/inputs/form/FormRow";
import tedKeys from "../../keys/tedKeys";


export default function InfrastructureComponentForm(props) {
    const classificationHook = useQuery(getQuery('classification'))
    const lang = InfrastructurePT
    const initialData = useMemo(() => {
        return{
            ...props.data,
            ...{
                infrastructure: props.infrastructure.id
            }
        }
    }, [props])

        const [draftID, setDraftID] = useState(props.draftID)
    const formHook = useDataWithDraft({
        initialData: initialData,
    draftUrl: Host().replace('api', 'draft') + 'component',
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
    


    return (
        <FormOptions
            keys={tedKeys.ted}
            endpoint={'ted'}
            initialData={props.data}
        >
            {({setOpen, formHook, asDraft, asHistory}) => (
        <Form
            hook={formHook}
            create={props.create}
            title={props.create ? lang.newComponent : lang.component}
            returnButton={true}
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

                    <TextField
                        placeholder={lang.situation}
                        label={lang.situation}
                        handleChange={event => {
                            handleChange({
                                event: event.target.value,
                                key: 'situation'
                            })
                        }} value={data.situation}
                        required={true}
                        width={'calc(50% - 16px)'}/>
                    <Selector
                        hook={classificationHook}
                        placeholder={'Classificação'}
                        title={'Classificação'}
                        handleChange={e => handleChange({event: e, key: 'classification'})}
                        value={data.classification} width={'calc(50% - 16px)'} required={true}
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
        </FormOptions>
    )

}

InfrastructureComponentForm.propTypes = {
    data: PropTypes.object,
    handleChange: PropTypes.func,
    handleClose: PropTypes.func,
    create: PropTypes.bool,
    infrastructure: PropTypes.object,
}
