import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import InfrastructurePT from "../../locales/InfrastructurePT";
import WorkPlanRequests from "../../utils/requests/WorkPlanRequests";
import Host from "../../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import ClassificationForm from "./ClassificationForm";
import {FormRow, Selector, TextField} from "sis-aeb-core";
import Form from "../../../../core/inputs/form/Form";
import useDataWithDraft from "../../../../core/inputs/form/useDataWithDraft";
import associativeKeys from "../../keys/associativeKeys";
import useQuery from "../../../../core/shared/hooks/useQuery";
import getQuery from "../../queries/getQuery";

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
                        {name: 'situation', type: 'string'},
                        {name: 'classification', type: 'object'}
                    ]
                }
                returnButton={true}
                handleSubmit={(data, clearState) =>
                    WorkPlanRequests.submitComponent({
                        pk: data.id,
                        data: data,
                        create: props.create
                    }).then(res => {
                        if (props.create && res) {
                            props.returnToMain()
                            clearState()
                        }
                    })}
                handleClose={() => props.returnToMain()}>
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
                        />
                    </FormRow>
                )}
            </Form>
    )

}

ComponentForm.propTypes = {
    data: PropTypes.object,
    handleChange: PropTypes.func,
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    infrastructure: PropTypes.object
}
