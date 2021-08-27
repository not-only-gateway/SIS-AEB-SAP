import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types'
import {TextField} from "sis-aeb-inputs";
import EntityLayout from "../../shared/misc/form/EntityLayout";
import TedPT from "../../../packages/locales/TedPT";
import TedRequests from "../../../utils/requests/TedRequests";
import DateField from "../../shared/inputs/date/DateField";
import DropDownField from "../../shared/inputs/dropdown/DropDownField";
import Selector from "../../shared/misc/selector/Selector";
import Host from "../../../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import Modal from "../../shared/misc/modal/Modal";
import ActionForm from "../../entities/action/ActionForm";


export default function TedForm(props) {

    const [changed, setChanged] = useState(false)
    const lang = TedPT

    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (props.create)
            props.handleChange({name: 'projects', value: [props.project]})
    }, [])
    return (
        <>
            <EntityLayout
                rootElementID={'root'} entity={props.data}
                create={props.create} label={lang.title}
                dependencies={{
                    fields: [
                        {name: 'number', type: 'string'},
                        {name: 'process', type: 'string'},
                        {name: 'year', type: 'number'},
                        {name: 'status', type: 'string'},
                        {name: 'start_date', type: 'date'},
                        {name: 'end_date', type: 'date'},
                        {name: 'responsible', type: 'string'},
                        {name: 'global_value', type: 'number'},
                        {name: 'decentralized', type: 'string'},
                        {name: 'action', type: 'object'},
                        {name: 'decentralized_unit', type: 'object'},

                        {name: 'object', type: 'string'},
                        {name: 'object_summary', type: 'string'},
                        {name: 'justification', type: 'string'},
                        {name: 'summary_justification', type: 'string'},
                        {name: 'programmatic_functional_classification', type: 'string'},
                        {name: 'ownership_destination_assets', type: 'string'},
                        {name: 'remaining_assets', type: 'bool'},

                    ],
                    changed: changed
                }} noHeader={!props.create}
                returnButton={props.create}
                handleSubmit={() =>
                    TedRequests.submitTed({
                        pk: props.id,
                        data: props.data,
                        create: props.create
                    }).then(res => {
                        if (res !== null && props.create)
                            props.redirect(res)

                        if (!props.create && res)
                            setChanged(false)
                    })}
                handleClose={() => props.returnToMain()}
                forms={[{
                    child: (
                        <>
                            <TextField

                                placeholder={lang.number} label={lang.number}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'number', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.number}
                                required={true}
                                width={'calc(50% - 16px)'}/>


                            <TextField
                                type={'number'}
                                placeholder={lang.year} label={lang.year}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'year', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.year}
                                required={true}
                                width={'calc(50% - 16px)'}/>

                            <TextField

                                placeholder={lang.process} label={lang.process}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'process', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.process}
                                required={true}
                                width={'calc(50% - 16px)'}/>
                            <DropDownField
                                placeholder={lang.status}
                                label={lang.status}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'status', value: event})
                                }} value={props.data === null ? null : props.data.status} required={true}
                                width={'calc(50% - 16px)'} choices={lang.statusOptions}/>
                            <TextField
                                placeholder={lang.ownership} label={lang.ownership}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({
                                        name: 'ownership_destination_assets',
                                        value: event.target.value
                                    })
                                }} locale={props.locale}
                                value={props.data === null ? null : props.data.ownership_destination_assets}
                                required={true} variant={'area'}
                                width={'calc(50% - 16px)'}/>
                            <DropDownField
                                placeholder={lang.remainingAssets}
                                label={lang.remainingAssets}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'remaining_assets', value: event})
                                }} value={props.data === null ? null : props.data.remaining_assets} required={true}
                                width={'calc(50% - 16px)'}
                                choices={lang.remainingAssetsOptions}/>
                            <DateField
                                placeholder={lang.startDate} label={lang.startDate}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'start_date', value: event})
                                }}
                                value={
                                    props.data === null ? null : props.data.start_date
                                }
                                required={true} width={'calc(50% - 16px)'}/>
                            <DateField
                                dark={true}
                                placeholder={lang.endDate} label={lang.endDate}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'end_date', value: event})
                                }}
                                value={
                                    props.data === null ? null : props.data.end_date
                                }
                                required={true} width={'calc(50% - 16px)'}/>


                            <TextField
                                type={'number'}
                                placeholder={lang.globalValue} maskStart={'R$'} currencyMask={true}
                                label={lang.globalValue}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'global_value', value: event.target.value})
                                }} locale={props.locale}
                                value={props.data === null ? null : props.data.global_value}
                                required={true} width={'calc(50% - 16px)'}/>

                            <TextField
                                placeholder={lang.decentralized}
                                label={lang.decentralized}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'decentralized', value: event.target.value})
                                }} locale={props.locale}
                                value={props.data === null ? null : props.data.decentralized}
                                required={true} width={'calc(50% - 16px)'}/>
                        </>)
                },
                    {
                        child: (
                            <>
                                <Selector
                                    getEntityKey={entity => {
                                        if (entity !== null && entity !== undefined)
                                            return entity.id
                                        else return -1
                                    }} searchFieldName={'search_input'}
                                    handleChange={entity => {
                                        props.handleChange({name: 'responsible', value: entity})
                                    }} label={'Vincular responsável'}
                                    selected={props.data === null || !props.data.responsible ? null : props.data.responsible}
                                    disabled={false}
                                    width={'calc(33.333% - 21.5px)'}
                                    fields={[
                                        {name: 'name', type: 'string'},
                                        {name: 'acronym', type: 'string'},
                                    ]} required={true}
                                    labels={['nome', 'Acrônimo']}
                                    fetchUrl={Host() + 'list/unit'}
                                    fetchToken={(new Cookies()).get('jwt')}
                                />
                                <Selector
                                    getEntityKey={entity => {
                                        if (entity !== null && entity !== undefined)
                                            return entity.id
                                        else return -1
                                    }} searchFieldName={'search_input'}
                                    handleChange={entity => {
                                        props.handleChange({name: 'decentralized_unit', value: entity})
                                    }} label={'Vincular unidade descentralizada'}
                                    selected={props.data === null || !props.data.decentralized_unit ? null : props.data.decentralized_unit}
                                    disabled={false}
                                    width={'calc(33.333% - 21.5px)'}
                                    fields={[
                                        {name: 'name', type: 'string'},
                                        {name: 'responsible', type: 'string'},
                                    ]} required={true}
                                    labels={['nome', 'responsável']}
                                    fetchUrl={Host() + 'list/decentralized_unit'}
                                    fetchToken={(new Cookies()).get('jwt')}
                                />


                                <Selector
                                    getEntityKey={entity => {
                                        if (entity !== null && entity !== undefined)
                                            return entity.id
                                        else return -1
                                    }} searchFieldName={'search_input'}
                                    handleChange={entity => {
                                        props.handleChange({name: 'action', value: entity})
                                    }} label={'Vincular ação'}
                                    setChanged={() => null}
                                    selected={props.data === null || !props.data.action ? null : props.data.action}
                                    disabled={false}
                                    handleCreate={() => setOpen(true)}
                                    width={'calc(33.333% - 21.5px)'}
                                    fields={[
                                        {name: 'number', type: 'string'},
                                        {name: 'detailing', type: 'string'},
                                    ]} required={true}
                                    labels={['número', 'detalhamento']}
                                    fetchUrl={Host() + 'list/action'}
                                    createOption={true}
                                    fetchToken={(new Cookies()).get('jwt')}
                                />
                            </>
                        )
                    },
                    {

                        child: (
                            <>
                                <TextField
                                    placeholder={lang.object} label={lang.object}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'object', value: event.target.value})
                                    }} locale={props.locale}
                                    value={props.data === null ? null : props.data.object}
                                    required={true} variant={'area'}
                                    width={'100%'}/>
                                <TextField
                                    placeholder={lang.objectSummary} label={lang.objectSummary}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'object_summary', value: event.target.value})
                                    }} locale={props.locale}
                                    value={props.data === null ? null : props.data.object_summary}
                                    required={true} variant={'area'}
                                    width={'100%'}/>

                                <TextField
                                    placeholder={lang.justification} label={lang.justification}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'justification', value: event.target.value})
                                    }} locale={props.locale}
                                    value={props.data === null ? null : props.data.justification}
                                    required={true} variant={'area'}
                                    width={'100%'}/>

                                <TextField
                                    placeholder={lang.summaryJustification} label={lang.summaryJustification}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'summary_justification', value: event.target.value})
                                    }} locale={props.locale}
                                    value={props.data === null ? null : props.data.summary_justification}
                                    required={true} variant={'area'}
                                    width={'100%'}/>

                                <TextField
                                    placeholder={lang.programmaticFunctional} label={lang.programmaticFunctional}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({
                                            name: 'programmatic_functional_classification',
                                            value: event.target.value
                                        })
                                    }} locale={props.locale}
                                    value={props.data === null ? null : props.data.programmatic_functional_classification}
                                    required={true} variant={'area'}
                                    width={'100%'}/>

                            </>
                        )
                    }
                ]}/>
            <Modal open={open} handleClose={() => setOpen(false)}>
                <div style={{
                    height: '100vh',
                    width: '100vw',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <ActionForm
                        returnToMain={() => {
                            setOpen(false)
                        }}
                        create={true}
                    />
                </div>
            </Modal>
        </>
    )

}

TedForm.propTypes = {
    id: PropTypes.number,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    project: PropTypes.number
}
