import React, {useEffect, useState} from "react";
import {Alert} from "sis-aeb-misc";
import {DateField, TextField} from "sis-aeb-inputs";
import PropTypes from "prop-types";
import OperationPT from "../../../../packages/locales/OperationPT";
import EntityLayout from "../../../shared/misc/form/EntityLayout";
import OperationRequests from "../../../../utils/fetch/OperationRequests";

export default function OperationForm(props) {
    const [changed, setChanged] = useState(false)
    const lang = OperationPT
    const [status, setStatus] = useState({
        type: undefined, message: undefined
    })
    useEffect(() => {
        if(props.create)
            props.handleChange({name: 'activity_stage', value: props.stage.id})
    }, [])
    return (
        <>
            <Alert
                type={status.type} render={status.type !== undefined} rootElementID={'root'}
                handleClose={() => setStatus({type: undefined, message: undefined})} message={status.message}
            />
            <EntityLayout
                rootElementID={'root'} entity={props.data}
                create={props.create} label={props.create ? lang.newOperation : lang.operation}
                dependencies={{
                    fields: [
                        {name: 'phase', type: 'string'},
                        {name: 'detailing', type: 'string'},

                        {name: 'stage_representation', type: 'number'},
                        {name: 'indicator_planned', type: 'number'},
                        {name: 'initial_situation', type: 'number'},
                        {name: 'estimated_cost', type: 'number'},

                        {name: 'start_date', type: 'date'},
                        {name: 'end_date', type: 'date'},
                        {name: 'version', type: 'number'},
                    ],
                    changed: changed
                }}
                returnButton={true}
                handleSubmit={() =>
                    OperationRequests.submitOperation({
                        pk: props.data.id,
                        data: props.data,
                        setStatus: setStatus,
                        create: props.create
                    }).then(res => {
                        setChanged(false)
                    })

                }
                handleClose={() => props.returnToMain()}
                forms={[{
                    child: (
                        <>
                            <TextField

                                placeholder={lang.phase} label={lang.phase}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'phase', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.phase}
                                required={true}
                                width={'calc(50% - 16px)'}/>


                            <TextField
                                placeholder={lang.detailing} label={lang.detailing}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'detailing', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.detailing}
                                required={true}
                                width={'calc(50% - 16px)'}/>
                        </>
                    )
                },
                    {
                        child: (
                            <>
                                <TextField
                                    type={'number'}
                                    placeholder={lang.version} label={lang.version}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'version', value: event.target.value})
                                    }} locale={props.locale}
                                    value={props.data === null ? null : props.data.version}
                                    required={true}
                                    width={'calc(33.333% - 21.5px)'}/>
                                <TextField
                                    placeholder={lang.stageRepresentation} label={lang.stageRepresentation}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'stage_representation', value: event.target.value})
                                    }} locale={props.locale}
                                    value={props.data === null ? null : props.data.stage_representation}
                                    required={true} type={'number'}
                                    width={'calc(33.333% - 21.5px)'}/>

                                <TextField
                                    type={'number'}
                                    placeholder={lang.indicatorPlanned} label={lang.indicatorPlanned}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'indicator_planned', value: event.target.value})
                                    }} locale={props.locale}
                                    value={props.data === null ? null : props.data.indicator_planned}
                                    required={true}
                                    width={'calc(33.333% - 21.5px)'}/>
                                <TextField
                                    type={'number'}
                                    placeholder={lang.initialSituation} label={lang.initialSituation}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'initial_situation', value: event.target.value})
                                    }} locale={props.locale}
                                    value={props.data === null ? null : props.data.initial_situation}
                                    required={true}
                                    width={'calc(50% - 16px)'}/>
                                <TextField
                                    type={'number'}
                                    placeholder={lang.estimatedCost} label={lang.estimatedCost}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'estimated_cost', value: event.target.value})
                                    }} locale={props.locale}
                                    value={props.data === null ? null : props.data.estimated_cost}
                                    required={true}
                                    width={'calc(50% - 16px)'}/>
                            </>
                        )
                    },
                    {
                        child: (
                            <>
                                <DateField
                                    dark={true}
                                    placeholder={lang.startDate} label={lang.startDate}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'start_date', value: event.target.value})
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
                                        props.handleChange({name: 'end_date', value: event.target.value})
                                    }}
                                    value={
                                        props.data === null ? null : props.data.end_date
                                    }
                                    required={true} width={'calc(50% - 16px)'}/>
                            </>
                        )
                    }]}/>
        </>
    )

}

OperationForm.propTypes = {
    id: PropTypes.number,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    stage: PropTypes.object
}
