import React from "react";
import {Form, FormRow, Selector, TextField, useQuery} from "mfc-core";
import PropTypes from "prop-types";

import submit from "../../utils/submit";
import FormTemplate from "../../../../addons/FormTemplate";
import {commissionedKeys, personKeys, unitKeys, vacancyKeys} from "../../keys/keys";
import formOptions from "../../../../addons/formOptions";
import getQuery from "../../queries/getQuery";

export default function VacancyForm(props) {
    const commHook = useQuery(getQuery('commissioned'))
    const unitHook = useQuery(getQuery('_unit'))
    const holderHook = useQuery(getQuery('collaborator'))
    const subsHook = useQuery(getQuery('collaborator'))
    let pKeys = [...personKeys]
    pKeys.splice(2, 1)
    pKeys.splice(2, 1)
    pKeys.splice(3, 1)

    return (
        <>
            <FormTemplate
                keys={vacancyKeys}
                endpoint={'vacancy'}
                service={'cgp'}
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
                        title={props.create ? 'Nova distribuição de comissionados' : 'Distribuição de comissionados'}
                        create={props.create}
                        returnButton={true} handleClose={() => props.handleClose()}
                        handleSubmit={(data, clearState) => {
                            submit({
                                suffix: 'vacancy',
                                pk: data.id,
                                data: data,
                                create: props.create
                            }).then(res => {
                                if (props.create && res.success) {
                                    props.handleClose()
                                    data.clearState()
                                }
                            })
                        }}

                        noAutoHeight={!props.asDefault}>
                        {(data, handleChange) => (
                            <>
                                <FormRow>
                                    <Selector
                                        hook={unitHook} keys={unitKeys}
                                        width={'calc(50% - 16px)'}
                                        value={data.unit}
                                        label={'Lotação'}
                                        disabled={true}
                                        placeholder={'Lotação'}
                                        handleChange={entity => handleChange({key: 'unit', event: entity})}
                                    />
                                    <Selector
                                        hook={commHook} keys={commissionedKeys}
                                        width={'calc(50% - 16px)'}
                                        value={data.commissioned}
                                        label={'Cargo comissionado'}
                                        disabled={true}
                                        placeholder={'Cargo comissionado'}
                                        handleChange={entity => handleChange({key: 'commissioned', event: entity})}
                                    />

                                </FormRow>
                                <FormRow>
                                    <Selector
                                        hook={holderHook} keys={pKeys}
                                        width={'calc(50% - 16px)'}
                                        value={data.holder}
                                        label={'Titular'}
                                        placeholder={'Titular'}
                                        handleChange={entity => handleChange({key: 'holder', event: entity})}
                                    />
                                    <Selector
                                        hook={subsHook} keys={pKeys}
                                        width={'calc(50% - 16px)'}
                                        value={data.substitute}
                                        helperText={data?.commissioned?.level.includes('102') ? 'Nível do cargo: ' + data?.commissioned?.level : null}
                                        disabled={data?.commissioned?.level.includes('102')}
                                        label={'Substituto'}
                                        placeholder={'Substituto'}
                                        handleChange={entity => handleChange({key: 'substitute', event: entity})}
                                    />
                                </FormRow>
                                <FormRow>
                                    <TextField
                                        placeholder={'Nome completo cargo'}

                                        label={'Nome completo cargo'}
                                        handleChange={event => {
                                            handleChange({
                                                event: event.target.value,
                                                key: 'formal_name'
                                            })

                                        }} value={data.formal_name}
                                        disabled={true}
                                        required={true} width={'100%'}/>
                                    <TextField
                                        placeholder={'Nome cargo'}

                                        label={'Nome cargo'}
                                        handleChange={event => {
                                            handleChange({
                                                event: event.target.value,
                                                key: 'name_m'
                                            })

                                        }} value={data.name_m}
                                        disabled={true}
                                        required={true} width={'100%'}/>
                                    <TextField
                                        placeholder={'Cargo'}

                                        label={'Cargo'}
                                        handleChange={event => {

                                            handleChange({
                                                event: event.target.value,
                                                key: 'role'
                                            })
                                        }} value={data.role}
                                        disabled={true}
                                        required={true} width={'100%'} variant={'area'}
                                    />
                                </FormRow>
                            </>
                        )}
                    </Form>
                )}
            </FormTemplate>
        </>
    )

}

VacancyForm.propTypes = {
    handleClose: PropTypes.func,
    create: PropTypes.bool,
    asDefault: PropTypes.bool,
}
