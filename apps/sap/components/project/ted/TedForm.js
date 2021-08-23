import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types'
import {DateField, DropDownField, TextField} from "sis-aeb-inputs";
import {Alert} from "sis-aeb-misc";
import EntityLayout from "../../shared/misc/form/EntityLayout";
import TedPT from "../../../packages/locales/TedPT";
import TedRequests from "../../../utils/fetch/TedRequests";


export default function TedForm(props) {

    const [changed, setChanged] = useState(false)
    const lang = TedPT
    const [status, setStatus] = useState({
        type: undefined, message: undefined
    })
    useEffect(() => {
        if (props.create)
            props.handleChange({name: 'projects', value: [props.project]})
    }, [])
    return (
        <>
            <Alert
                type={status.type} render={status.type !== undefined} rootElementID={'root'}
                handleClose={() => setStatus({type: undefined, message: undefined})} message={status.message}
            />
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
                        {name: 'action', type: 'string'},

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
                        setStatus: setStatus,
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
                                width={'calc(33.333% - 21.35px)'}/>

                            <DropDownField
                                dark={true}
                                placeholder={lang.responsible}
                                label={lang.responsible}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'responsible', value: event})
                                }} value={props.data === null ? null : props.data.responsible} required={true}
                                width={'calc(33.333% - 21.5px)'} choices={lang.responsibleOptions}/>


                            <TextField
                                type={'number'}
                                placeholder={lang.year} label={lang.year}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'year', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.year}
                                required={true}
                                width={'calc(33.333% - 21.35px)'}/>

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

                            <DropDownField

                                placeholder={lang.remainingAssets}
                                label={lang.remainingAssets}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'remaining_assets', value: event})
                                }} value={props.data === null ? null : props.data.remaining_assets} required={true}
                                width={'calc(33.333% - 21.5px)'}
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
                                required={true} width={'calc(33.333% - 21.5px)'}/>
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
                                required={true} width={'calc(33.333% - 21.5px)'}/>


                            <TextField
                                type={'number'}
                                placeholder={lang.globalValue} maskStart={'R$'} currencyMask={true}
                                label={lang.globalValue}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'global_value', value: event.target.value})
                                }} locale={props.locale}
                                value={props.data === null ? null : props.data.global_value}
                                required={true} width={'calc(33.333% - 21.5px)'}/>

                            <TextField
                                placeholder={lang.decentralized}
                                label={lang.decentralized}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'decentralized', value: event.target.value})
                                }} locale={props.locale}
                                value={props.data === null ? null : props.data.decentralized}
                                required={true} width={'calc(33.333% - 21.5px)'}/>


                            <TextField

                                placeholder={lang.action} label={lang.action}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'action', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.action}
                                required={true}
                                width={'calc(33.333% - 21.35px)'}/>



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
                                    props.handleChange({name: 'programmatic_functional_classification', value: event.target.value})
                                }} locale={props.locale}
                                value={props.data === null ? null : props.data.programmatic_functional_classification}
                                required={true} variant={'area'}
                                width={'100%'}/>
                            <TextField
                                placeholder={lang.ownership} label={lang.ownership}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'ownership_destination_assets', value: event.target.value})
                                }} locale={props.locale}
                                value={props.data === null ? null : props.data.ownership_destination_assets}
                                required={true} variant={'area'}
                                width={'100%'}/>


                        </>
                    )
                }
                ]}/>
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