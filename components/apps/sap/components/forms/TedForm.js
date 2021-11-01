import React, {useState} from "react";
import PropTypes from 'prop-types'
import TedPT from "../../locales/TedPT";
import {useQuery} from "mfc-core";
import associativeKeys from "../../keys/associativeKeys";
import getQuery from "../../queries/getQuery";
import Form from "../../../../core/inputs/form/Form";
import useDataWithDraft from "../../../../core/inputs/form/useDataWithDraft";
import Cookies from "universal-cookie/lib";
import submit from "../../utils/requests/submit";
import Selector from "../../../../core/inputs/selector/Selector";
import UnitForm from "./UnitForm";
import DecentralizedUnitForm from "./DecentralizedUnitForm";
import ActionForm from "./ActionForm";
import Host from "../../utils/shared/Host";
import FormRow from "../../../../core/inputs/form/FormRow";
import TextField from "../../../../core/inputs/text/TextField";
import DateField from "../../../../core/inputs/date/DateField";
import DropDownField from "../../../../core/inputs/dropdown/DropDownField";
import {AssignmentRounded, HistoryRounded} from "@material-ui/icons";


export default function TedForm(props) {
    const lang = TedPT

    const actionHook = useQuery(getQuery('action'))
    const unitHook = useQuery(getQuery('unit'))
    const decentralizedUnitHook = useQuery(getQuery('decentralized_unit'))


    const [draftID, setDraftID] = useState(props.draftID)
    const formHook = useDataWithDraft({
        initialData: props.data,
        draftUrl: Host().replace('api', 'draft') + 'ted',
        draftHeaders: {'authorization': (new Cookies()).get('jwt')},
        interval: 5000000,
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
            title={props.asAddendum ? 'Novo termo aditivo' : (props.create ? 'Novo instrumento de celebração' : 'Instrumento de celebração')}
            dependencies={
                [
                    {key: 'number', type: 'string'},
                    {key: 'process', type: 'string'},
                    {key: 'year', type: 'number'},
                    {key: 'status', type: 'string'},
                    {key: 'start_date', type: 'date'},
                    {key: 'end_date', type: 'date'},
                    {key: 'responsible', type: 'string'},
                    {key: 'global_value', type: 'number'},
                    {key: 'object', type: 'string'},
                    {key: 'object_summary', type: 'string'},
                    {key: 'justification', type: 'string'},
                    {key: 'action', type: 'object'},
                    {key: 'summary_justification', type: 'string'},
                    {key: 'programmatic_functional_classification', type: 'string'},
                    {key: 'remaining_assets', type: 'bool'},

                ]
            } noHeader={!props.create && !props.asEntity}
            returnButton={props.create || props.asEntity}
            options={[
                {
                    label: 'Histórico de mudanças',
                    icon: <HistoryRounded/>,
                    onClick: () => null,
                    disabled: props.create
                },
                {
                    label: 'Rascunhos',
                    icon: <AssignmentRounded/>,
                    onClick: () => null
                }]}
            handleSubmit={(data, clearState) => {
                submit({
                    suffix: 'ted',
                    pk: data.id,
                    data: data,
                    create: props.create
                }).then(res => {
                    if (res.success && res.data !== null && props.create && !props.asEntity)
                        props.handleClose()

                    if (res.success && props.asEntity && props.create)
                        props.handleClose()
                })

            }}
            handleClose={() => props.handleClose()}>
            {(data, handleChange) => (
                <>
                    <FormRow title={'Básico'}>
                        <TextField
                            placeholder={lang.number} label={lang.number}
                            handleChange={event => {

                                handleChange({key: 'number', event: event.target.value})
                            }} value={data.number}
                            required={true}
                            width={'calc(50% - 16px)'}
                        />


                        <TextField
                            type={'number'}
                            placeholder={lang.year} label={lang.year}
                            handleChange={event => {
                                console.log('HANDLING CHANGE', event.target.value)
                                handleChange({key: 'year', event: event.target.value})
                            }}
                            value={data.year}
                            required={true}
                            width={'calc(50% - 16px)'}
                        />

                        <TextField

                            placeholder={lang.process} label={lang.process}
                            handleChange={event => {

                                handleChange({key: 'process', event: event.target.value})
                            }} value={data.process}
                            required={true}
                            width={'calc(33.333% - 21.5px)'}/>
                        <DropDownField
                            placeholder={lang.status}
                            label={lang.status}
                            handleChange={event => {

                                handleChange({key: 'status', event: event})
                            }} value={data.status} required={true}
                            width={'calc(33.333% - 21.5px)'} choices={lang.statusOptions}/>

                        <TextField
                            type={'number'}
                            placeholder={lang.globalValue} maskStart={'R$'} currencyMask={true}
                            label={lang.globalValue}
                            handleChange={event => {

                                handleChange({key: 'global_value', event: event.target.value})
                            }}
                            value={data.global_value}
                            required={true} width={'calc(33.333% - 21.5px)'}/>

                        <DropDownField
                            placeholder={lang.remainingAssets}
                            label={lang.remainingAssets}
                            handleChange={event => {

                                handleChange({key: 'remaining_assets', event: event})
                            }} value={data.remaining_assets}
                            required={true}
                            width={'calc(50% - 16px)'}
                            choices={lang.remainingAssetsOptions}/>
                        <TextField
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
                            placeholder={lang.startDate} label={lang.startDate}
                            handleChange={event => {

                                handleChange({key: 'start_date', event: event})
                            }}
                            value={
                                data.start_date
                            }
                            required={true} width={'calc(50% - 16px)'}/>
                        <DateField
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


                            hook={unitHook} keys={associativeKeys.responsible}
                            width={'calc(33.333% - 21.5px)'}
                            required={true}
                            value={data.responsible}
                            title={'Responsável'}
                            placeholder={'Responsável'}
                            handleChange={entity => handleChange({key: 'responsible', event: entity})}

                            createOption={true}
                        >
                            {handleClose => (
                                <UnitForm create={true} asDefault={true} handleClose={() => handleClose()}/>
                            )}
                        </Selector>
                        <Selector
                            hook={decentralizedUnitHook} keys={associativeKeys.decentralizedUnit}
                            width={'calc(33.333% - 21.5px)'}
                            required={true}
                            value={data.decentralized_unit}
                            title={'Unidade descentralizada'}
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
                            hook={actionHook} keys={associativeKeys.action}
                            width={'calc(33.333% - 21.5px)'}
                            required={true}
                            value={data.action}
                            title={'Ação'}
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
                            placeholder={lang.object} label={lang.object}
                            handleChange={event => {

                                handleChange({key: 'object', event: event.target.value})
                            }}
                            value={data.object}
                            required={true} variant={'area'}
                            width={'100%'}/>
                        <TextField
                            placeholder={lang.objectSummary} label={lang.objectSummary}
                            handleChange={event => {

                                handleChange({key: 'object_summary', event: event.target.value})
                            }}
                            value={data.object_summary}
                            required={true} variant={'area'}
                            width={'100%'}/>

                        <TextField
                            placeholder={lang.justification} label={lang.justification}
                            handleChange={event => {

                                handleChange({key: 'justification', event: event.target.value})
                            }}
                            value={data.justification}
                            required={true} variant={'area'}
                            width={'100%'}/>

                        <TextField
                            placeholder={lang.summaryJustification} label={lang.summaryJustification}
                            handleChange={event => {

                                handleChange({key: 'summary_justification', event: event.target.value})
                            }}
                            value={data.summary_justification}
                            required={true} variant={'area'}
                            width={'100%'}/>

                        <TextField
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
}
