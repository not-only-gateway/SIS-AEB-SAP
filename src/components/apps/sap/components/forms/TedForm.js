import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types'
import TedPT from "../../locales/TedPT";
import TedRequests from "../../utils/requests/TedRequests";
import {DateField, DropDownField, Form, FormRow, Selector, TextField} from "sis-aeb-core";
import Host from "../../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import ActionForm from "./ActionForm";
import UnitForm from "./UnitForm";
import DecentralizedUnitForm from "./DecentralizedUnitForm";


export default function TedForm(props) {
    const lang = TedPT

    const [open, setOpen] = useState(false)
    const [initialData, setInitialData] = useState(props.data)

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
        <>
            <Form
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
                handleSubmit={(data) => {
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
                                getEntityKey={entity => {
                                    if (entity !== null && entity !== undefined)
                                        return entity.id
                                    else return -1
                                }} searchFieldName={'search_input'}
                                handleChange={entity => {
                                    handleChange({key: 'responsible', event: entity})
                                }} label={'Vincular responsável'}
                                selected={data === null || !data.responsible ? null : data.responsible}
                                disabled={false}
                                width={'calc(33.333% - 21.5px)'}
                                fields={[
                                    {key: 'name', type: 'string'},
                                    {key: 'acronym', type: 'string'},
                                ]} required={true}
                                labels={['nome', 'Acrônimo']}
                                fetchUrl={Host() + 'list/unit'}
                                fetchToken={(new Cookies()).get('jwt')}
                                createOption={true}
                                returnToList={!open}
                                setReturnToList={() => setOpen(true)}
                            >
                                <UnitForm create={true} returnToMain={() => setOpen(false)}/>
                            </Selector>
                            <Selector
                                getEntityKey={entity => {
                                    if (entity !== null && entity !== undefined)
                                        return entity.id
                                    else return -1
                                }} searchFieldName={'search_input'}
                                handleChange={entity => {
                                    handleChange({key: 'decentralized_unit', event: entity})
                                }} label={'Vincular unidade descentralizada'}
                                selected={data === null || !data.decentralized_unit ? null : data.decentralized_unit}
                                disabled={false}
                                width={'calc(33.333% - 21.5px)'}
                                fields={[
                                    {key: 'name', type: 'string'},
                                    {key: 'responsible', type: 'string'},
                                ]}
                                labels={['nome', 'responsável']}
                                fetchUrl={Host() + 'list/decentralized_unit'}
                                fetchToken={(new Cookies()).get('jwt')}
                                createOption={true}
                                returnToList={!open}
                                setReturnToList={() => setOpen(true)}
                            >
                                <DecentralizedUnitForm create={true} returnToMain={() => setOpen(false)}/>
                            </Selector>


                            <Selector
                                getEntityKey={entity => {
                                    if (entity !== null && entity !== undefined)
                                        return entity.id
                                    else return -1
                                }} searchFieldName={'search_input'}
                                handleChange={entity => {
                                    handleChange({key: 'action', event: entity})
                                }} label={'Vincular ação'}
                                setChanged={() => null}
                                selected={data === null || !data.action ? null : data.action}
                                required={true}
                                handleCreate={() => setOpen(true)}
                                width={'calc(33.333% - 21.5px)'}
                                fields={[
                                    {key: 'number', type: 'string'},
                                    {key: 'detailing', type: 'string'},
                                ]}
                                labels={['número', 'detalhamento']}
                                fetchUrl={Host() + 'list/action'}

                                fetchToken={(new Cookies()).get('jwt')}
                                createOption={true}
                                returnToList={!open}
                                setReturnToList={() => setOpen(true)}
                            >
                                <ActionForm create={true} returnToMain={() => setOpen(false)}/>
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
        </>
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
