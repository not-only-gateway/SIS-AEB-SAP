import React, {useEffect, useState} from "react";
import ProjectPT from "../../locales/ProjectPT";
import {DropDownField, FormRow, TextField} from "mfc-core";
import PropTypes from "prop-types";
import Form from "../../../../core/inputs/form/Form";
import useDataWithDraft from "../../../../core/inputs/form/useDataWithDraft";
import Cookies from "universal-cookie/lib";
import submit from "../../utils/requests/submit";
import Host from "../../utils/shared/Host";


export default function RiskForm(props) {
    const lang = ProjectPT
    const [initialData, setInitialData] = useState(props.data)
        const [draftID, setDraftID] = useState(props.draftID)
    const formHook = useDataWithDraft({
        initialData: initialData,
    draftUrl: Host().replace('api', 'draft') + 'risk',
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
    

    useEffect(() => {

        setInitialData({
            ...props.data,
            ...{
                project: props.project.id
            }
        })
    }, [])

    return (
        <Form
            hook={formHook}
            initialData={initialData} title={props.create ? 'Novo risco' : 'Risco'}
            create={props.create} label={lang.risksTitle}
            dependencies={[
                {key: 'description', type: 'string'},
                {key: 'analysis', type: 'string'},
            ]

            }
            returnButton={true}
            handleSubmit={(data, clearState) =>
                submit({
                    suffix: 'risk',
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

                        placeholder={lang.description} label={lang.description}
                        handleChange={event => {

                            handleChange({key: 'description', event: event.target.value})
                        }} value={data.description}
                        required={true}
                        width={'100%'}/>

                    <DropDownField
                        dark={true}
                        placeholder={lang.analysis}
                        label={lang.analysis}
                        handleChange={event => {

                            handleChange({key: 'analysis', event: event})
                        }} value={data.analysis} required={true}
                        width={'100%'} choices={lang.riskOptions}/>
                </FormRow>
            )}

        </Form>

    )

}

RiskForm.propTypes = {
    id: PropTypes.number,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    handleClose: PropTypes.func,
    create: PropTypes.bool,
    project: PropTypes.object,
}
