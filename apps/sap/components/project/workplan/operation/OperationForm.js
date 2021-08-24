import React, {useEffect, useState} from "react";
import {Alert} from "sis-aeb-misc";
import {DateField, TextField} from "sis-aeb-inputs";
import PropTypes from "prop-types";
import OperationPT from "../../../../packages/locales/OperationPT";
import EntityLayout from "../../../shared/misc/form/EntityLayout";
import OperationRequests from "../../../../utils/fetch/OperationRequests";

import Host from "../../../../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import Selector from "../../../shared/misc/selector/Selector";


export default function OperationForm(props) {
    const [changed, setChanged] = useState(false)
    const lang = OperationPT
    const [status, setStatus] = useState({
        type: undefined, message: undefined
    })
    useEffect(() => {
        if (props.create && props.stage !== null)
            props.handleChange({name: 'activity_stage', value: props.stage})
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
                        {name: 'activity_stage', type: 'number'},
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
                                width={props.stage !== null && props.stage !== undefined ? 'calc(25% - 14px)' : 'calc(33.333% - 21.5px)'}/>


                            <TextField
                                placeholder={lang.detailing} label={lang.detailing}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'detailing', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.detailing}
                                required={true}
                                width={props.stage !== null && props.stage !== undefined ? 'calc(75% - 18px)' : 'calc(33.333% - 21.5px)'}/>
                            {props.stage !== null && props.stage !== undefined ?
                                null
                                :
                                <Selector
                                    getEntityKey={entity => {
                                        if (entity !== null && entity !== undefined)
                                            return entity.id
                                        else return -1
                                    }} searchFieldName={'search_input'}
                                    handleChange={entity => {
                                        props.handleChange({name: 'activity_stage', value: entity})
                                    }} label={'Vincular atividade'}
                                    setChanged={() => null}
                                    selected={props.data === null || !props.data.activity_stage ? null : props.data.activity_stage}
                                    disabled={false}
                                    width={'calc(33.333% - 21.5px)'}
                                    fields={[
                                        {name: 'stage', type: 'string'},
                                        {name: 'description', type: 'string'},
                                    ]} required={true}
                                    labels={['etapa', 'descrição']}
                                    fetchUrl={Host() + 'list/work_plan_activity'}
                                    fetchParams={{
                                        work_plan: props.workPlan?.id
                                    }}
                                    fetchToken={(new Cookies()).get('jwt')}
                                />
                            }
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
                                    placeholder={lang.estimatedCost} label={lang.estimatedCost}  currencyMask={true}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'estimated_cost', value: event.target.value})
                                    }} locale={props.locale} maskStart={'R$'}
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