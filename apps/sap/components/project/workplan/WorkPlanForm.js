import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types'
import {DropDownField, TextField} from "sis-aeb-inputs";
import {Alert} from "sis-aeb-misc";
import EntityLayout from "../../shared/misc/form/EntityLayout";
import WorkPlanPT from "../../../packages/locales/WorkPlanPT";
import submitWorkPlan from "../../../utils/submit/SubmitWorkPlan";


export default function WorkPlanForm(props) {

    const [changed, setChanged] = useState(false)
    const lang = WorkPlanPT
    const [status, setStatus] = useState({
        type: undefined, message: undefined
    })
    useEffect(() => {
        if (props.create) {
            props.handleChange({name: 'ted', value: props.ted.id})
            props.handleChange({name: 'project', value: props.project.id})
        }
    }, [])
    return (
        <div style={{width: '100%'}}>
            <Alert
                type={status.type} render={status.type !== undefined} rootElementID={'root'}
                handleClose={() => setStatus({type: undefined, message: undefined})} message={status.message}
            />
            <EntityLayout
                rootElementID={'root'} entity={props.data}
                create={props.create} label={lang.title}
                dependencies={{
                    fields: [
                        {name: 'responsible', type: 'string'},
                        {name: 'object', type: 'string'},

                        // NEW FIELDS
                        {name: 'sub_decentralization', type: 'bool'},
                        {name: 'justification', type: 'string'},
                        {name: 'ways_of_execution', type: 'string'},
                        {name: 'indirect_costs', type: 'bool'},
                        {name: 'detailing_of_indirect_costs', type: 'string'},
                        {name: 'budget_plan', type: 'string'},

                        // NEW CATEGORY
                        {name: 'responsible_execution', type: 'string'},
                        {name: 'func', type: 'string'},
                        {name: 'email', type: 'string'},
                        {name: 'phone', type: 'string'},
                    ],
                    changed: changed
                }} noHeader={!props.create}
                returnButton={props.create}
                handleSubmit={() =>
                    submitWorkPlan({
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
                            <DropDownField
                                dark={true}
                                placeholder={lang.responsible}
                                label={lang.responsible}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'responsible', value: event})
                                }} value={props.data === null ? null : props.data.responsible} required={true}
                                width={'calc(50% - 16px)'} choices={lang.responsibleOptions}/>

                            <DropDownField
                                dark={true}
                                placeholder={lang.apostille}
                                label={lang.apostille}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'apostille', value: event})
                                }} value={props.data === null ? null : props.data.apostille} required={false}
                                width={'calc(50% - 16px)'} choices={lang.apostilleOptions}/>

                            <TextField

                                placeholder={lang.object} label={lang.object}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'object', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.object}
                                required={true} variant={'area'}
                                width={'100%'}/>
                            <DropDownField
                                dark={true}
                                placeholder={lang.subDecentralization}
                                label={lang.subDecentralization}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'sub_decentralization', value: event})
                                }} value={props.data === null ? null : props.data.sub_decentralization} required={false}
                                width={'calc(50% - 16px)'} choices={lang.baseOptions}/>
                            <DropDownField
                                dark={true}
                                placeholder={lang.indirectCosts }
                                label={lang.indirectCosts }
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'indirect_costs', value: event})
                                }} value={props.data === null ? null : props.data.indirect_costs } required={false}
                                width={'calc(50% - 16px)'} choices={lang.baseOptions}/>


                            <TextField

                                placeholder={lang.justification } label={lang.justification }
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'justification', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.justification}
                                required={true} variant={'area'}
                                width={'100%'}/>
                            <TextField

                                placeholder={lang.ways} label={lang.ways}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'ways_of_execution', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.ways_of_execution }
                                required={true} variant={'area'}
                                width={'100%'}/>
                            <TextField

                                placeholder={lang.detailingIndirect} label={lang.detailingIndirect}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'detailing_of_indirect_costs', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.detailing_of_indirect_costs }
                                required={true} variant={'area'}
                                width={'100%'}/>
                            <TextField

                                placeholder={lang.budgetPlan} label={lang.budgetPlan}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'budget_plan', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.budget_plan}
                                required={true} variant={'area'}
                                width={'100%'}/>
                        </>

                    )
                },
                    {
                        title: 'Responsável pela execução do Plano de Trabalho na Unidade Descentralizada',
                        child: (
                            <>
                                <TextField
                                    placeholder={lang.responsibleExecution} label={lang.responsibleExecution}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'responsible_execution', value: event.target.value})
                                    }} locale={props.locale} value={props.data === null ? null : props.data.responsible_execution }
                                    required={true}
                                    width={'calc(50% - 16px)'}/>
                                <TextField
                                    placeholder={lang.func} label={lang.func}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'func', value: event.target.value})
                                    }} locale={props.locale} value={props.data === null ? null : props.data.func }
                                    required={true}
                                    width={'calc(50% - 16px)'}/>
                                <TextField
                                    placeholder={lang.email} label={lang.email}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'email', value: event.target.value})
                                    }} locale={props.locale} value={props.data === null ? null : props.data.email }
                                    required={true}
                                    width={'calc(50% - 16px)'}/>
                                <TextField
                                    placeholder={lang.phone} label={lang.phone}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'phone', value: event.target.value})
                                    }} locale={props.locale} value={props.data === null ? null : props.data.phone }
                                    required={true} phoneMask={true}
                                    width={'calc(50% - 16px)'}/>

                            </>

                        )
                    }
                ]}/>
        </div>
    )

}

WorkPlanForm.propTypes = {
    id: PropTypes.number,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    ted: PropTypes.object,
    project: PropTypes.object
}
