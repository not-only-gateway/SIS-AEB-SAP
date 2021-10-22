import React, {useMemo, useState} from "react";
import {DropDownField, FormRow, TextField} from "sis-aeb-core";
import PropTypes from "prop-types";
import InfrastructurePT from "../../locales/InfrastructurePT";
import Form from "../../../../core/inputs/form/Form";
import useDataWithDraft from "../../../../core/inputs/form/useDataWithDraft";
import Cookies from "universal-cookie/lib";
import submit from "../../utils/requests/submit";
import Host from "../../utils/shared/Host";


export default function InfrastructureForm(props) {
    const lang = InfrastructurePT
    const initialData = useMemo(() => {
        if (!props.create)
            return {
                ...props.data,
                ...{
                    latitude: props.data.address.split(", ")[0],
                    longitude: props.data.address.split(", ")[1]
                }
            }
        else return props.data
    }, [props])

        const [draftID, setDraftID] = useState(props.draftID)
    const formHook = useDataWithDraft({
        initialData: initialData,
    draftUrl: Host().replace('api', 'draft') + 'action',
        draftHeaders: {'authorization': (new Cookies()).get('jwt')},
        interval: 120000,
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
        <Form
            hook={formHook}
            create={props.create}
            title={props.create ? lang.newInfrastructure : lang.infrastructure}
            dependencies={
                [
                    {key: 'name', type: 'string'},
                    {key: 'type', type: 'string'},
                ]
            }
            returnButton={props.create} noAutoHeight={!props.asDefault}
            handleSubmit={(data, clearState) =>
                submit({
                    suffix: 'infrastructure',
                    pk: data.id,
                    data: {
                        ...data,
                        address: data.latitude + ', ' + data.longitude
                    },
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

                        placeholder={lang.name} label={lang.name}
                        handleChange={event => {
                            handleChange({
                                event: event.target.value,
                                key: 'name'
                            })
                        }} value={data.name}
                        required={true}
                        width={'calc(50% - 16px)'}/>


                    <DropDownField
                        placeholder={lang.type}
                        label={lang.type}
                        handleChange={event => {

                            handleChange({
                                event: event,
                                key: 'type'
                            })
                        }} value={data.type} required={true}
                        width={'calc(50% - 16px)'} choices={lang.typeOptions}/>

                    <TextField
                        placeholder={lang.latitude} label={lang.latitude} type={'number'}
                        handleChange={event => {
                            handleChange({
                                event: event.target.value,
                                key: 'latitude'
                            })
                        }}
                        value={data.latitude}
                        required={false}
                        width={'calc(50% - 16px)'}/>
                    <TextField
                        placeholder={lang.longitude} label={lang.longitude} type={'number'}
                        handleChange={event => {
                            handleChange({
                                event: event.target.value,
                                key: 'longitude'
                            })
                        }} value={data.longitude}
                        required={false}
                        width={'calc(50% - 16px)'}
                    />
                </FormRow>
            )}
        </Form>
    )

}

InfrastructureForm.propTypes = {
    data: PropTypes.object,

    handleClose: PropTypes.func,
    create: PropTypes.bool,
    asDefault: PropTypes.bool,
    draftID: PropTypes.number,
}
