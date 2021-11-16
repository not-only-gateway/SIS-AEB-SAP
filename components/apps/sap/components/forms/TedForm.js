import React, {useMemo} from "react";
import PropTypes from 'prop-types'
import TedPT from "../../locales/TedPT";
import {useQuery} from "mfc-core";
import associativeKeys from "../../keys/associativeKeys";
import getQuery from "../../utils/getQuery";
import Form from "../../../../core/inputs/form/Form";
import submit from "../../utils/submit";
import Selector from "../../../../core/inputs/selector/Selector";
import UnitForm from "./UnitForm";
import DecentralizedUnitForm from "./DecentralizedUnitForm";
import ActionForm from "./ActionForm";
import FormRow from "../../../../core/inputs/form/FormRow";
import TextField from "../../../../core/inputs/text/TextField";
import DateField from "../../../../core/inputs/date/DateField";
import SelectField from "../../../../core/inputs/select/SelectField";
import FormTemplate from "../../templates/FormTemplate";
import tedKeys from "../../keys/tedKeys";
import formOptions from "../../templates/formOptions";


export default function TedForm(props) {
    const lang = TedPT

    const actionHook = useQuery(getQuery('action'))
    const unitHook = useQuery(getQuery('unit'))
    const decentralizedUnitHook = useQuery(getQuery('decentralized_unit'))

    const initialData = useMemo(() => {
        return {
            ...props.data,
            addendum_ted: props.ted?.id
        }
    }, [props])
    return (
        <FormTemplate
            keys={tedKeys.ted}
            endpoint={'ted'}
            initialData={initialData}
        >
            {({setOpen, formHook, asDraft, asHistory}) => (
                <Form
                    hook={formHook}
                    create={props.create}
                    title={(props.create ? 'Novo instrumento de celebração' : 'Instrumento de celebração') + (props.asAddendum ? ' (termo aditivo)' : '')}
                    returnButton={props.create || props.asEntity}
                    options={formOptions({
                        asDraft: asDraft,
                        asHistory: asHistory,
                        setOpen: setOpen,
                        create: props.create
                    })}
                    handleSubmit={(data, clearState) => {
                        submit({
                            suffix: 'ted',
                            pk: data.id,
                            data: data,
                            create: props.create
                        }).then(res => {

                            if (res.success && props.create) {
                                props.handleClose()
                                if(props.onCreationSuccess)
                                    props.onCreationSuccess(res.data)
                            }

                        })

                    }}
                    handleClose={() => props.handleClose()}>
                    {(data, handleChange) => (
                        <>
                            <FormRow>
                                <TextField
                                    helperText={props.ted && props.data?.number !== data.number ? 'Campo alterado' : undefined}

                                    placeholder={lang.number}
                                    label={lang.number}
                                    handleChange={event => {

                                        handleChange({key: 'number', event: event.target.value})
                                    }} value={data.number}
                                    required={true}
                                    width={'calc(50% - 16px)'}
                                />


                                <TextField
                                    helperText={props.ted && props.data?.year !== data.year ? 'Campo alterado' : undefined}

                                    type={'number'}
                                    placeholder={lang.year} label={lang.year}
                                    handleChange={event => {
                                        handleChange({key: 'year', event: event.target.value})
                                    }}
                                    value={data.year}
                                    required={true}
                                    width={'calc(50% - 16px)'}
                                />

                                <TextField
                                    helperText={props.ted && props.data?.process !== data.process ? 'Campo alterado' : undefined}

                                    placeholder={lang.process} label={lang.process}
                                    handleChange={event => {

                                        handleChange({key: 'process', event: event.target.value})
                                    }} value={data.process}
                                    required={true}
                                    width={'calc(33.333% - 21.5px)'}/>
                                <SelectField
                                    helperText={props.ted && props.data?.status !== data.status ? 'Campo alterado' : undefined}

                                    placeholder={lang.status}
                                    label={lang.status}
                                    handleChange={event => {

                                        handleChange({key: 'status', event: event})
                                    }} value={data.status} required={true}
                                    width={'calc(33.333% - 21.5px)'} choices={lang.statusOptions}/>

                                <TextField
                                    helperText={props.ted && props.data?.global_value !== data.global_value ? 'Campo alterado' : undefined}

                                    type={'number'}
                                    placeholder={lang.globalValue} maskStart={'R$'}
                                    floatFilter={true}
                                    label={lang.globalValue}
                                    handleChange={event => {

                                        handleChange({key: 'global_value', event: event.target.value})
                                    }}
                                    value={data.global_value}
                                    required={true} width={'calc(33.333% - 21.5px)'}/>

                                <SelectField
                                    helperText={props.ted && props.data?.remaining_assets !== data.remaining_assets ? 'Campo alterado' : undefined}

                                    placeholder={lang.remainingAssets}
                                    label={lang.remainingAssets}
                                    handleChange={event => {

                                        handleChange({key: 'remaining_assets', event: event})
                                    }} value={data.remaining_assets}
                                    required={true}
                                    width={'calc(50% - 16px)'}
                                    choices={lang.remainingAssetsOptions}/>
                                <TextField
                                    helperText={props.ted && props.data?.ownership_destination_assets !== data.ownership_destination_assets ? 'Campo alterado' : undefined}

                                    placeholder={lang.ownership} label={lang.ownership}
                                    handleChange={event => {

                                        handleChange({
                                            key: 'ownership_destination_assets',
                                            event: event.target.value
                                        })
                                    }}
                                    value={data.ownership_destination_assets}
                                    required={data.remaining_assets}
                                    disabled={!data.remaining_assets}
                                    variant={'area'}
                                    width={'calc(50% - 16px)'}/>

                                <DateField
                                    helperText={props.ted && props.data?.start_date !== data.start_date ? 'Campo alterado' : undefined}

                                    placeholder={lang.startDate} label={lang.startDate}
                                    handleChange={event => {

                                        handleChange({key: 'start_date', event: event})
                                    }}
                                    value={data.start_date}
                                    required={true} width={'calc(50% - 16px)'}/>
                                <DateField
                                    helperText={props.ted && props.data?.end_date !== data.end_date ? 'Campo alterado' : undefined}

                                    dark={true}
                                    placeholder={lang.endDate} label={lang.endDate}
                                    handleChange={event => {

                                        handleChange({key: 'end_date', event: event})
                                    }}
                                    value={
                                        data.end_date
                                    }
                                    required={true} width={'calc(50% - 16px)'}/>


                            </FormRow>

                            <FormRow>
                                <Selector
                                    helperText={props.ted && props.data?.responsible !== data.responsible ? 'Campo alterado' : undefined}

                                    hook={unitHook} keys={associativeKeys.responsible}
                                    width={'calc(33.333% - 21.5px)'}
                                    required={true}
                                    value={data.responsible}
                                    label={'Unidade da AEB responsável'}
                                    placeholder={'Unidade da AEB responsável'}
                                    handleChange={entity => handleChange({key: 'responsible', event: entity})}

                                    createOption={true}
                                >
                                    {handleClose => (
                                        <UnitForm create={true} asDefault={true} handleClose={() => handleClose()}/>
                                    )}
                                </Selector>
                                <Selector
                                    helperText={props.ted && props.data?.decentralized_unit !== data.decentralized_unit ? 'Campo alterado' : undefined}

                                    hook={decentralizedUnitHook} keys={associativeKeys.decentralizedUnit}
                                    width={'calc(33.333% - 21.5px)'}
                                    required={true}
                                    value={data.decentralized_unit}
                                    label={'Unidade descentralizada'}
                                    placeholder={'Unidade descentralizada'}
                                    handleChange={entity => handleChange({key: 'decentralized_unit', event: entity})}

                                    createOption={true}
                                >
                                    {handleClose => (
                                        <DecentralizedUnitForm create={true} asDefault={true}
                                                               handleClose={() => handleClose()}/>
                                    )}
                                </Selector>
                                <Selector
                                    helperText={props.ted && props.data?.action !== data.action ? 'Campo alterado' : undefined}

                                    hook={actionHook} keys={associativeKeys.action}
                                    width={'calc(33.333% - 21.5px)'}
                                    required={true}
                                    value={data.action}
                                    label={'Ação'}
                                    placeholder={'Ação'}
                                    handleChange={entity => handleChange({key: 'action', event: entity})}
                                    createOption={true}
                                >
                                    {handleClose => (
                                        <ActionForm create={true} asDefault={true} handleClose={() => handleClose()}/>
                                    )}
                                </Selector>
                            </FormRow>
                            <FormRow>
                                <TextField
                                    helperText={props.ted && props.data?.object !== data.object ? 'Campo alterado' : undefined}

                                    placeholder={lang.object} label={lang.object}
                                    handleChange={event => {

                                        handleChange({key: 'object', event: event.target.value})
                                    }}
                                    value={data.object}
                                    required={true} variant={'area'}
                                    width={'100%'}/>
                                <TextField
                                    helperText={props.ted && props.data?.object_summary !== data.object_summary ? 'Campo alterado' : undefined}

                                    placeholder={lang.objectSummary} label={lang.objectSummary}
                                    handleChange={event => {

                                        handleChange({key: 'object_summary', event: event.target.value})
                                    }}
                                    value={data.object_summary}
                                    required={true} variant={'area'}
                                    width={'100%'}/>

                                <TextField
                                    helperText={props.ted && props.data?.justification !== data.justification ? 'Campo alterado' : undefined}

                                    placeholder={lang.justification} label={lang.justification}
                                    handleChange={event => {

                                        handleChange({key: 'justification', event: event.target.value})
                                    }}
                                    value={data.justification}
                                    required={true} variant={'area'}
                                    width={'100%'}/>

                                <TextField
                                    helperText={props.ted && props.data?.summary_justification !== data.summary_justification ? 'Campo alterado' : undefined}

                                    placeholder={lang.summaryJustification} label={lang.summaryJustification}
                                    handleChange={event => {

                                        handleChange({key: 'summary_justification', event: event.target.value})
                                    }}
                                    value={data.summary_justification}
                                    required={true} variant={'area'}
                                    width={'100%'}/>

                                <TextField
                                    helperText={props.ted && props.data?.programmatic_functional_classification !== data.programmatic_functional_classification ? 'Campo alterado' : undefined}

                                    placeholder={lang.programmaticFunctional} label={lang.programmaticFunctional}
                                    handleChange={event => {

                                        handleChange({
                                            key: 'programmatic_functional_classification',
                                            event: event.target.value
                                        })
                                    }}
                                    value={data.programmatic_functional_classification}
                                    required={true} variant={'area'}
                                    width={'100%'}/>

                            </FormRow>
                        </>
                    )}
                </Form>
            )}
        </FormTemplate>
    )

}

TedForm.propTypes = {
    data: PropTypes.object,
    handleClose: PropTypes.func,
    create: PropTypes.bool,
    project: PropTypes.number,
    asEntity: PropTypes.bool,
    asAddendum: PropTypes.bool,
    ted: PropTypes.object,
    onCreationSuccess: PropTypes.func,
}


