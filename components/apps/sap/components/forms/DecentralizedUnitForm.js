import React, {useState} from "react";
import PropTypes from "prop-types";
import Form from "../../../../core/inputs/form/Form";
import EntitiesPT from "../../locales/EntitiesPT";
import {FormRow, TextField} from "mfc-core";
import useDataWithDraft from "../../../../core/inputs/form/useDataWithDraft";
import Cookies from "universal-cookie/lib";
import Host from "../../utils/shared/Host";
import submit from "../../utils/requests/submit";

export default function DecentralizedUnitForm(props) {

    const lang = EntitiesPT
    const [draftID, setDraftID] = useState(props.draftID)
    const formHook = useDataWithDraft({
        initialData: props.data,
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
            initialData={props.data}
            create={props.create} title={props.create ? lang.newDecentralizedUnit : lang.decentralizedUnit}
            dependencies={
                [
                    {key: 'name', type: 'string'},
                    {key: 'competent_authority', type: 'string'},
                    {key: 'cpf', type: 'string'},
                    {key: 'identification', type: 'string'},
                    {key: 'uge', type: 'string'},
                    {key: 'ug', type: 'string'},
                    {key: 'cnpj', type: 'string'},
                    {key: 'unit_responsible ', type: 'string'},
                ]}
            returnButton={true} noAutoHeight={!props.asDefault}
            handleSubmit={(data, clearState) =>
                submit({
                    suffix: 'decentralized_unit',
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
                        placeholder={lang.name} label={lang.name}
                        handleChange={event => {
                            handleChange({
                                event: event.target.value,
                                key: 'name'
                            })

                        }} value={data.name}
                        required={true}
                        width={'calc(33.333% - 21.5px'}/>
                    <TextField
                        placeholder={lang.responsible} label={lang.responsible}
                        handleChange={event => {

                            handleChange({
                                event: event.target.value,
                                key: 'unit_responsible'
                            })
                            }} value={data.unit_responsible}
                        required={true}
                        width={'calc(33.333% - 21.5px'}/>
                    <TextField
                        placeholder={lang.competentAuthority} label={lang.competentAuthority}
                        handleChange={event => {
                            handleChange({
                                event: event.target.value,
                                key: 'competent_authority'
                            })

                        }} value={data.competent_authority}
                        required={true}
                        width={'calc(33.333% - 21.5px'}/>

                    <TextField
                        placeholder={lang.ugi} label={lang.ugi}
                        handleChange={event => {

                            handleChange({
                                event: event.target.value,
                                key: 'ugi'
                            })
                        }} value={data.ugi}
                        required={false}
                        width={'100%'}/>

                    <TextField
                        placeholder={lang.uge} label={lang.uge}
                        handleChange={event => {
                            handleChange({
                                event: event.target.value,
                                key: 'uge'
                            })

                        }} value={data.uge}
                        required={true}
                        width={'100%'}/>

                    <TextField
                        placeholder={lang.ug} label={lang.ug}
                        handleChange={event => {
                            handleChange({
                                event: event.target.value,
                                key: 'ug'
                            })

                        }} value={data.ug}
                        required={true}
                        width={'100%'}/>

                    <TextField
                        placeholder={lang.cnpj} label={lang.cnpj}
                        handleChange={event => {
                            handleChange({
                                event: event.target.value,
                                key: 'cnpj'
                            })

                        }} value={data.cnpj}
                        required={true}
                        width={'calc(33.333% - 21.5px'}/>
                    <TextField
                        placeholder={lang.cpf} label={lang.cpf}
                        handleChange={event => {
                            handleChange({
                                event: event.target.value,
                                key: 'cpf'
                            })

                        }} value={data.cpf}
                        required={true}
                        width={'calc(33.333% - 21.5px'}/>
                    <TextField
                        placeholder={lang.identification} label={lang.identification}
                        handleChange={event => {
                            handleChange({
                                event: event.target.value,
                                key: 'identification'
                            })
                        }} value={data.identification}
                        required={true}
                        width={'calc(33.333% - 21.5px'}/>

                </FormRow>
            )}
        </Form>
    )

}

DecentralizedUnitForm.propTypes = {
    handleClose: PropTypes.func,
    create: PropTypes.bool,
    asDefault: PropTypes.bool,
    action: PropTypes.object,
    draftID: PropTypes.number,
}
