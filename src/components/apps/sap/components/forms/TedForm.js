import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types'
import TedPT from "../../locales/TedPT";
import TedRequests from "../../utils/requests/TedRequests";
import {DateField, DropDownField, FormRow, Selector, TextField, useQuery} from "sis-aeb-core";
import associativeKeys from "../../keys/associativeKeys";
import getQuery from "../../queries/getQuery";
import Form from "../../../../core/inputs/form/Form";
import useDataWithDraft from "../../../../core/inputs/form/useDataWithDraft";
import Cookies from "universal-cookie/lib";

export default function TedForm(props) {
    const lang = TedPT

    const actionHook = useQuery(getQuery('action'))
    const unitHook = useQuery(getQuery('unit'))
    const decentralizedUnitHook = useQuery(getQuery('decentralized_unit'))

    const [initialData, setInitialData] = useState(props.data)
    const formHook = useDataWithDraft({
        initialData: initialData,
        draftUrl: '',
        draftHeaders: {'authorization': (new Cookies()).get('jwt')},
        interval: 120000
    })

    useEffect(() => {
        if (props.create) {
            if (!props.asAddendum)
                setInitialData({
                    ...props.data,
                    ...{
                        projects: [props.project]
                    }
                })
            else
                setInitialData({
                    ...props.data,
                    ...{
                        ted: props.ted.id
                    }
                })

        }
    }, [])
    return (
        <Form
            hook={formHook}
            initialData={initialData}
            create={props.create}
            title={props.asAddendum ? (props.create ? lang.newAddendum : lang.addendum) : (props.create ? lang.newTed : lang.ted)}
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
                    // data === null || !data.remaining_assets ? null : {
                    //     key: 'ownership_destination_assets',
                    //     type: 'string'
                    // },
                    // !props.asAddendum ? null : {
                    //     key: 'ted',
                    //     type: 'object'
                    // },
                ]
            } noHeader={!props.create && !props.asEntity}
            returnButton={props.create || props.asEntity}
            handleSubmit={(data, clearState) => {
                if (!props.asAddendum)
                    TedRequests.submitTed({
                        pk: data.id,
                        data: data,
                        create: props.create
                    }).then(res => {
                        if (res !== null && props.create && !props.asEntity)
                            props.redirect(res)

                        if (props.asEntity && props.create)
                            props.returnToMain()
                    })
                else
                    TedRequests.submitAddendum({
                        pk: data.id,
                        data: data,
                        create: props.create
                    }).then(res => {
                        if (props.asEntity)
                            props.returnToMain()
                    })
            }}
            handleClose={() => props.returnToMain()}>
            {(data, handleChange) => (
                <>
                    <FormRow>

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

                                handleChange({key: 'year', event: event.target.value})
                            }} value={data.year}
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
                        />
                        <Selector
                            hook={decentralizedUnitHook} keys={associativeKeys.decentralizedUnit}
                            width={'calc(33.333% - 21.5px)'}
                            required={true}
                            value={data.decentralized_unit}
                            title={'Unidade descentralizada'}
                            placeholder={'Unidade descentralizada'}
                            handleChange={entity => handleChange({key: 'decentralized_unit', event: entity})}
                        />
                        <Selector
                            hook={actionHook} keys={associativeKeys.action}
                            width={'calc(33.333% - 21.5px)'}
                            required={true}
                            value={data.action}
                            title={'Ação'}
                            placeholder={'Ação'}
                            handleChange={entity => handleChange({key: 'action', event: entity})}
                        />

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
    id: PropTypes.number,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    project: PropTypes.number,
    asEntity: PropTypes.bool,
    asAddendum: PropTypes.bool,
    ted: PropTypes.object
}
