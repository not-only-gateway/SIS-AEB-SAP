import React, {useEffect, useState} from "react";
import {DateField, Form, FormRow, Selector, TextField} from "sis-aeb-core";
import PropTypes from "prop-types";
import OperationPT from "../../locales/OperationPT";
import OperationRequests from "../../utils/requests/OperationRequests";

import Host from "../../utils/shared/Host";
import Cookies from "universal-cookie/lib";


export default function OperationForm(props) {

    const lang = OperationPT
    const [initialData, setInitialData] = useState(null)
    useEffect(() => {
        setInitialData({
            ...props.data,
            ...{
                activity_stage: props.stage
            }
        })
    }, [])

    return (
        <>

            <Form
                initialData={initialData}
                create={props.create} title={props.create ? lang.newOperation : lang.operation}
                dependencies={
                    [
                        {key: 'phase', type: 'string'},
                        {key: 'detailing', type: 'string'},

                        {key: 'stage_representation', type: 'number'},
                        {key: 'indicator_planned', type: 'number'},
                        {key: 'initial_situation', type: 'number'},
                        {key: 'estimated_cost', type: 'number'},

                        {key: 'start_date', type: 'date'},
                        {key: 'end_date', type: 'date'},
                        {key: 'version', type: 'number'},
                        {key: 'activity_stage', type: 'number'},
                    ]
                }
                returnButton={true}
                handleSubmit={(data, clearState) =>
                    OperationRequests.submitOperation({
                        pk: data.id,
                        data: data,
                        create: props.create
                    }).then(res => {
                        if (props.create && res){
                            props.returnToMain()
                            clearState()
                        }
                    })

                }
                handleClose={() => props.returnToMain()}>
                {(data, handleChange) => (
                    <>
                        <FormRow>

                            <TextField

                                placeholder={lang.phase} label={lang.phase}
                                handleChange={event => {

                                    handleChange({key: 'phase', event: event.target.value})
                                }}  value={ data.phase}
                                required={true}
                                width={props.stage !== null && props.stage !== undefined ? 'calc(25% - 14px)' : 'calc(33.333% - 21.5px)'}/>


                            <TextField
                                placeholder={lang.detailing} label={lang.detailing}
                                handleChange={event => {

                                    handleChange({key: 'detailing', event: event.target.value})
                                }}  value={ data.detailing}
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
                                        handleChange({key: 'activity_stage', event: entity})
                                    }} label={'Vincular atividade'}
                                    setChanged={() => null}
                                    selected={props.data === null || !data.activity_stage ? null : data.activity_stage}
                                    disabled={false}
                                    width={'calc(33.333% - 21.5px)'}
                                    fields={[
                                        {key: 'stage', type: 'string'},
                                        {key: 'description', type: 'string'},
                                    ]} required={true}
                                    labels={['etapa', 'descrição']}
                                    fetchUrl={Host() + 'list/work_plan_activity'}
                                    fetchParams={{
                                        work_plan: props.workPlan?.id
                                    }}
                                    fetchToken={(new Cookies()).get('jwt')}
                                />
                            }
                        </FormRow>

                        <FormRow>
                            <TextField
                                type={'number'}
                                placeholder={lang.version} label={lang.version}
                                handleChange={event => {

                                    handleChange({key: 'version', event: event.target.value})
                                }}
                                value={ data.version}
                                required={true}
                                width={'calc(33.333% - 21.5px)'}/>
                            <TextField
                                placeholder={lang.stageRepresentation} label={lang.stageRepresentation}
                                handleChange={event => {

                                    handleChange({key: 'stage_representation', event: event.target.value})
                                }}  currencyMask={true}
                                value={ data.stage_representation}
                                required={true} type={'number'}
                                width={'calc(33.333% - 21.5px)'}/>

                            <TextField
                                type={'number'}
                                placeholder={lang.indicatorPlanned} label={lang.indicatorPlanned}
                                handleChange={event => {

                                    handleChange({key: 'indicator_planned', event: event.target.value})
                                }}
                                value={ data.indicator_planned}
                                required={true}
                                width={'calc(33.333% - 21.5px)'}/>
                            <TextField
                                type={'number'}
                                placeholder={lang.initialSituation} label={lang.initialSituation}
                                handleChange={event => {

                                    handleChange({key: 'initial_situation', event: event.target.value})
                                }}
                                value={ data.initial_situation}
                                required={true}
                                width={'calc(50% - 16px)'}/>
                            <TextField
                                type={'number'}
                                placeholder={lang.estimatedCost} label={lang.estimatedCost} currencyMask={true}
                                handleChange={event => {

                                    handleChange({key: 'estimated_cost', event: event.target.value})
                                }}  maskStart={'R$'}
                                value={ data.estimated_cost}
                                required={true}
                                width={'calc(50% - 16px)'}/>
                        </FormRow>

                        <FormRow>
                            <DateField
                                dark={true}
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
                    </>
                )}
            </Form>
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
