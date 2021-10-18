import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import InfrastructurePT from "../../locales/InfrastructurePT";
import Cookies from "universal-cookie/lib";
import {FormRow, Selector, TextField} from "sis-aeb-core";
import Form from "../../../../core/inputs/form/Form";
import useDataWithDraft from "../../../../core/inputs/form/useDataWithDraft";
import associativeKeys from "../../keys/associativeKeys";
import useQuery from "../../../../core/shared/hooks/useQuery";
import getQuery from "../../queries/getQuery";
import submit from "../../utils/requests/submit";
import ClassificationForm from "./ClassificationForm";

export default function ComponentForm(props) {
    const classificationHook = useQuery(getQuery('classification'))
    const lang = InfrastructurePT
    const [initialData, setInitialData] = useState(null)

    const formHook = useDataWithDraft({
        initialData: initialData,
        draftUrl: '',
        draftHeaders: {'authorization': (new Cookies()).get('jwt')},
        interval: 120000
    })

    useEffect(() => {
        setInitialData({
            ...props.data,
            ...{
                infrastructure: props.infrastructure.id
            }
        })
    }, [])

    return (
        <Form
            hook={formHook}
            initialData={initialData}
            create={props.create} title={props.create ? lang.newComponent : lang.component}
            dependencies={
                [
                    {key: 'situation', type: 'string'},
                    {key: 'classification', type: 'object'}
                ]
            }
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
                            <ClassificationForm create={true} asDefault={true} handleClose={() => handleClose()}/>
                        )}
                    </Selector>
                </FormRow>
            )}
        </Form>
    )

}

ComponentForm.propTypes = {
    data: PropTypes.object,
    handleChange: PropTypes.func,
    handleClose: PropTypes.func,
    create: PropTypes.bool,
    infrastructure: PropTypes.object
}
