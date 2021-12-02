import React, {useMemo, useState} from "react";
import PropTypes from 'prop-types'
import WorkPlanPT from "../../locales/WorkPlanPT";

import associativeKeys from "../../keys/associativeKeys";
import getQuery from "../../utils/getQuery";

import submit from "../../utils/submit";
import UnitForm from "./UnitForm";
import BudgetPlanForm from "./BudgetPlanForm";
import InfrastructureForm from "./InfrastructureForm";

import {
    useCopyToClipboard, useFile,

    Empty,
    request, Alert, ToolTip,

    Selector, Form, FormRow, DateField,
    SelectField, MultiSelectField,
    TextField, Button, Checkbox, CheckboxGroup,
    FileField,

    ThemeContext, MfcWrapper, Ripple,

    ScrollStepper, StepperWrapper,
    Tab, Tabs, VerticalTabs, Modal, Breadcrumbs,
    Carousel, DynamicRoutes, Switcher, RailActionButton,
    RailContext, NavigationRail, Dropdown, RailActionWrapper,

    List,  Feed, FeedCard, Filter,
    useInfiniteScroll, useQuery

} from 'mfc-core';

import workPlanKeys from "../../keys/workPlanKeys";
import FormTemplate from "../../templates/FormTemplate";
import formOptions from "../../templates/formOptions";


export default function WorkPlanForm(props) {
    const lang = WorkPlanPT
    const unitHook = useQuery(getQuery('unit'))
    const [selectedAction, setSelectedAction] = useState()
    const budgetHookFilter = useMemo(() => {
        switch (true) {
            case props.ted !== undefined: {

                return props.ted?.action
            }
            case !props.create && !props.ted: {

                return props.data?.ted?.action
            }
            case selectedAction !== undefined: {

                return selectedAction?.id
            }
            default: {
                return undefined
            }
        }
    }, [props.data, selectedAction])

    const budgetPlanHook = useQuery(getQuery('budget_plan', budgetHookFilter ? {action: budgetHookFilter} : undefined))

    const tedFilter = useMemo(() => {
        if (props.ted)
            return [{
                type: 'object',
                value: props.ted.id,
                key: 'ted'
            }]
        else
            return []
    }, [props])
    const projectHook = useQuery(getQuery('project_ted', undefined, tedFilter))
    const projectFilter = useMemo(() => {
        if (props.project)
            return [{
                type: 'object',
                value: props.project.id,
                key: 'activity_project'
            }]
        else
            return []
    }, [props])
    const tedHook = useQuery(getQuery('project_ted', undefined, projectFilter))
    const infrastructureHook = useQuery(getQuery('infrastructure'))

    const initialData = useMemo(() => {
        if (props.create) {
            let data = {...props.data}
            if (props.workPlan)
                data.apostille_work_plan = props.workPlan

            if (props.ted)
                data.ted = props.ted

            if (props.project)
                data.activity_project = props.project

            return data
        } else return props.data
    }, [props])
    const removeAction = () => {
        let l = [...associativeKeys.budgetPlan]
        l = l.filter(e => e.key !== 'action')

        return l
    }

    return (
        <FormTemplate
            keys={workPlanKeys.workPlan}
            endpoint={'work_plan'}
            initialData={initialData}
        >

            {({setOpen, formHook, asDraft, asHistory}) => (
                <Form
                    hook={formHook}
                    create={props.create}
                    options={formOptions({
                        asDraft: asDraft,
                        asHistory: asHistory,
                        setOpen: setOpen,
                        create: props.create
                    })}
                    title={props.workPlan ? 'Novo apostilamento' : props.create ? 'Novo plano de trabalho' : 'Plano de trabalho'}
                    returnButton={props.create}
                    handleSubmit={(data, clearState) => {
                        submit({
                            suffix: props.workPlan ? 'apostille' : 'work_plan',
                            pk: data.id,
                            data: {
                                ...data,
                                activity_project: props.project !== undefined && props.project !== null ? props.project.id : typeof data.activity_project === "object" ? data.activity_project.activity_project: data.activity_project,
                                ted: props.ted?.id
                            },
                            create: props.create
                        }).then(res => {
                            if (res.success && props.create)
                                props.handleClose()
                        })
                    }}
                    handleClose={() => props.handleClose()}>
                    {(data, handleChange) => (
                        <>
                            <FormRow>
                                {props.project && (props.ted === undefined || props.ted === null) && (props.workPlan === null || props.workPlan === undefined) ?
                                    <Selector

                                        hook={tedHook} keys={associativeKeys.projectTed.filter(e => e.key === 'ted')}
                                        disabled={!props.create}
                                        width={props.project ? 'calc(33.333% - 21.5px)' : 'calc(50% - 16px)'}
                                        required={true} createOption={false}
                                        value={data.ted}
                                        label={'Instrumento de celebração'}
                                        placeholder={'Instrumento de celebração'}
                                        handleChange={entity => {
                                            setSelectedAction(entity?.action)
                                            handleChange({key: 'ted', event: entity})
                                        }}
                                    />
                                    :
                                    null
                                }

                                {props.ted && (props.project === undefined || props.project === null) && (props.workPlan === null || props.workPlan === undefined) ?
                                    <Selector
                                        hook={projectHook}
                                        keys={associativeKeys.projectTed.filter(e => e.key === 'activity_project')}
                                        disabled={!props.create}
                                        width={props.ted ? 'calc(33.333% - 21.5px)' : 'calc(50% - 16px)'}
                                        required={true}
                                        value={data.activity_project}
                                        label={'Projeto / atividade'}
                                        placeholder={'Projeto / atividade'}
                                        handleChange={entity => handleChange({key: 'activity_project', event: entity})}
                                    />
                                    :
                                    null
                                }
                                <Selector
                                    helperText={props.workPlan && props.data?.responsible !== data.responsible ? 'Campo alterado' : undefined}

                                    hook={unitHook} keys={associativeKeys.responsible}
                                    width={((!props.ted && props.project) || (!props.project && props.ted)) && !props.workPlan ? 'calc(33.333% - 21.5px)' : 'calc(50% - 16px)'}
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
                                    helperText={props.workPlan && props.data?.budget_plan !== data.budget_plan ? 'Campo alterado' : 'Dependente da ação do instrumento de celebração selecionado'}

                                    hook={budgetPlanHook} keys={removeAction()}
                                    width={((!props.ted && props.project) || (!props.project && props.ted) && !props.workPlan) ? 'calc(33.333% - 21.5px)' : 'calc(50% - 16px)'}
                                    required={true} disabled={!data.ted || !data.ted.id}
                                    value={data.budget_plan}
                                    label={`Plano orçamentário ${selectedAction ? `(Ação ${selectedAction.number})` : ''}`}
                                    placeholder={'Plano orçamentário'}
                                    handleChange={entity => handleChange({key: 'budget_plan', event: entity})}
                                    createOption={true}
                                >
                                    {handleClose => (
                                        <BudgetPlanForm
                                            action={selectedAction}
                                            create={true}
                                            asDefault={true}
                                            handleClose={() => handleClose()}/>
                                    )}
                                </Selector>
                                <TextField
                                    helperText={props.workPlan && props.data?.object !== data.object ? 'Campo alterado' : undefined}
                                    placeholder={lang.object} label={lang.object}
                                    handleChange={event => {

                                        handleChange({key: 'object', event: event.target.value})
                                    }} value={data.object}
                                    required={true} variant={'area'}
                                    width={'100%'}/>
                                <SelectField
                                    helperText={props.workPlan && props.data?.sub_decentralization !== data.sub_decentralization ? 'Campo alterado' : undefined}

                                    placeholder={lang.subDecentralization}
                                    label={lang.subDecentralization}
                                    handleChange={event => {

                                        handleChange({key: 'sub_decentralization', event: event})
                                    }} value={data.sub_decentralization}
                                    required={true}
                                    width={'calc(50% - 16px)'}
                                    choices={lang.baseOptions}/>

                                <SelectField
                                    helperText={props.workPlan && props.data?.indirect_costs !== data.indirect_costs ? 'Campo alterado' : undefined}

                                    placeholder={lang.indirectCosts}
                                    label={lang.indirectCosts}
                                    handleChange={event => {

                                        handleChange({key: 'indirect_costs', event: event})
                                    }} value={data.indirect_costs} required={true}
                                    width={'calc(50% - 16px)'}
                                    choices={lang.baseOptions}/>
                                <Selector
                                    helperText={props.workPlan && props.data?.infrastructure !== data.infrastructure ? 'Campo alterado' : undefined}

                                    hook={infrastructureHook}
                                    keys={associativeKeys.infrastructure}
                                    width={'calc(50% - 16px)'}

                                    value={data.infrastructure}
                                    label={'Infraestrutura'}
                                    placeholder={'Infraestrutura'}
                                    handleChange={entity => handleChange({key: 'infrastructure', event: entity})}
                                    createOption={true}
                                >
                                    {handleClose => (
                                        <InfrastructureForm create={true} asDefault={true}
                                                            handleClose={() => handleClose()}/>
                                    )}
                                </Selector>

                                <MultiSelectField
                                    helperText={props.workPlan && props.data?.ways_of_execution !== data.ways_of_execution ? 'Campo alterado' : undefined}

                                    placeholder={lang.ways}
                                    label={lang.ways}
                                    handleChange={event => {

                                        handleChange({key: 'ways_of_execution', event: event})
                                    }} value={data.ways_of_execution}
                                    required={true}
                                    width={'calc(50% - 16px)'}
                                    choices={lang.waysOptions}
                                />


                                <TextField
                                    helperText={props.workPlan && props.data?.justification !== data.justification ? 'Campo alterado' : undefined}

                                    placeholder={lang.justification} label={lang.justification}
                                    handleChange={event => {

                                        handleChange({key: 'justification', event: event.target.value})
                                    }} value={data.justification}
                                    required={true} variant={'area'}
                                    width={'100%'}/>


                                <TextField
                                    helperText={props.workPlan && props.data?.detailing_of_indirect_costs !== data.detailing_of_indirect_costs ? 'Campo alterado' : undefined}

                                    placeholder={lang.detailingIndirect} label={lang.detailingIndirect}
                                    handleChange={event => {

                                        handleChange({
                                            key: 'detailing_of_indirect_costs',
                                            event: event.target.value
                                        })
                                    }} value={data.detailing_of_indirect_costs}
                                    required={true} variant={'area'}
                                    width={'100%'}/>


                            </FormRow>

                            <FormRow
                                title={'Responsável pela execução do Plano de Trabalho na Unidade Descentralizada'}>
                                <TextField
                                    helperText={props.workPlan && props.data?.responsible_execution !== data.responsible_execution ? 'Campo alterado' : undefined}

                                    placeholder={lang.responsibleExecution} label={lang.responsibleExecution}
                                    handleChange={event => {

                                        handleChange({
                                            key: 'responsible_execution',
                                            event: event.target.value
                                        })
                                    }} value={data.responsible_execution}
                                    required={true}
                                    width={'calc(50% - 16px)'}/>
                                <TextField
                                    helperText={props.workPlan && props.data?.func !== data.func ? 'Campo alterado' : undefined}

                                    placeholder={lang.func} label={lang.func}
                                    handleChange={event => {

                                        handleChange({key: 'func', event: event.target.value})
                                    }} value={data.func}
                                    required={true}
                                    width={'calc(50% - 16px)'}/>
                                <TextField
                                    helperText={props.workPlan && props.data?.email !== data.email ? 'Campo alterado' : undefined}

                                    placeholder={lang.email} label={lang.email}
                                    handleChange={event => {

                                        handleChange({key: 'email', event: event.target.value})
                                    }} value={data.email}
                                    required={true}
                                    width={'calc(50% - 16px)'}/>
                                <TextField
                                    helperText={props.workPlan && props.data?.phone !== data.phone ? 'Campo alterado' : undefined}

                                    placeholder={lang.phone} label={lang.phone}
                                    handleChange={event => {

                                        handleChange({key: 'phone', event: event.target.value})
                                    }} value={data.phone}
                                    required={true} mask={'(99) 9-9999-9999'}
                                    width={'calc(50% - 16px)'}/>

                            </FormRow>
                        </>
                    )}
                </Form>
            )}
        </FormTemplate>
    )

}

WorkPlanForm.propTypes = {
    workPlan: PropTypes.object,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    handleClose: PropTypes.func,
    create: PropTypes.bool,
    ted: PropTypes.object,
    project: PropTypes.object,
}