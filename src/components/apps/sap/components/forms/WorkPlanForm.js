import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types'
import WorkPlanPT from "../../locales/WorkPlanPT";
import Host from "../../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import BudgetPlanForm from "./BudgetPlanForm";
import WorkPlanRequests from "../../utils/requests/WorkPlanRequests";
import UnitForm from "./UnitForm";
import InfrastructureForm from "./InfrastructureForm";
import {DropDownField, Form, FormRow, MultiSelectField, Selector, TextField} from "sis-aeb-core";


export default function WorkPlanForm(props) {
    const lang = WorkPlanPT
    const [open, setOpen] = useState(false)
    const [initialData, setInitialData] = useState(props.data)
    useEffect(() => {
        if (props.create) {
            if (!props.asApostille) {
                setInitialData({
                    ...props.data,
                    ...{
                        ted: props.ted.id,
                        project: props.project.id
                    }
                })
            } else
                setInitialData({
                    ...props.data,
                    ...{
                        work_plan: props.workPlan
                    }
                })
        }
    }, [])
    return (
        <div style={{width: '100%'}}>
            <Form
                initialData={initialData}
                create={props.create}
                title={lang.title}
                dependencies={[
                    {key: 'responsible', type: 'string'},
                    {key: 'object', type: 'string'},

                    // NEW FIELDS
                    {key: 'sub_decentralization', type: 'bool'},
                    {key: 'justification', type: 'string'},
                    {key: 'ways_of_execution', type: 'string'},
                    {key: 'indirect_costs', type: 'bool'},
                    {key: 'detailing_of_indirect_costs', type: 'string'},
                    {key: 'budget_plan', type: 'string'},

                    // NEW CATEGORY
                    {key: 'responsible_execution', type: 'string'},
                    {key: 'func', type: 'string'},
                    {key: 'email', type: 'string'},
                    {key: 'phone', type: 'string'},
                ]
                } noHeader={!props.create}
                returnButton={props.create}
                handleSubmit={(data) => {
                    if (!props.asApostille)
                        WorkPlanRequests.submitWorkPlan({
                            pk: data.id,
                            data: data,
                            create: props.create
                        }).then(res => {
                            if (res !== null && props.create)
                                props.redirect(res)
                        })
                    else
                        WorkPlanRequests.submitApostille({
                            pk: data.id,
                            data: data,
                            create: props.create
                        }).then(res => {
                            if (res !== null)
                                props.returnToMain()
                        })
                }
                }
                handleClose={() => props.returnToMain()}>
                {(data, handleChange) => (
                    <>
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
                                width={'calc(50% - 16px)'}
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

                            <DropDownField
                                dark={true}
                                placeholder={lang.apostille}
                                label={lang.apostille}
                                handleChange={event => {

                                    handleChange({key: 'apostille', event: event})
                                }} value={ data.apostille} required={false}
                                width={'calc(50% - 16px)'} choices={lang.apostilleOptions}/>

                            <TextField

                                placeholder={lang.object} label={lang.object}
                                handleChange={event => {

                                    handleChange({key: 'object', event: event.target.value})
                                }} value={ data.object}
                                required={true} variant={'area'}
                                width={'100%'}/>
                            <DropDownField

                                placeholder={lang.subDecentralization}
                                label={lang.subDecentralization}
                                handleChange={event => {

                                    handleChange({key: 'sub_decentralization', event: event})
                                }} value={ data.sub_decentralization}
                                required={true}
                                width={'calc(25% - 24px)'} choices={lang.baseOptions}/>

                            <DropDownField
                                placeholder={lang.indirectCosts}
                                label={lang.indirectCosts}
                                handleChange={event => {

                                    handleChange({key: 'indirect_costs', event: event})
                                }} value={ data.indirect_costs} required={true}
                                width={'calc(25% - 24px)'} choices={lang.baseOptions}/>
                            <Selector
                                getEntityKey={entity => {
                                    if (entity !== null && entity !== undefined)
                                        return entity.id
                                    else return -1
                                }}
                                searchFieldName={'search_input'}
                                handleChange={entity => {
                                    handleChange({key: 'infrastructure', event: entity})
                                }} label={'Vincular infraestrutura'}
                                selected={ data.infrastructure}
                                width={'calc(50% - 16px)'}
                                fields={[
                                    {key: 'name', type: 'string'},
                                    {key: 'type', type: 'string'}
                                ]} required={false}
                                labels={['Nome', 'tipo']}
                                fetchUrl={Host() + 'list/infrastructure'}
                                fetchToken={(new Cookies()).get('jwt')}
                                createOption={true}
                                returnToList={!open}
                                setReturnToList={() => setOpen(true)}
                            >
                                <InfrastructureForm create={true} returnToMain={() => setOpen(false)}/>
                            </Selector>

                            <TextField

                                placeholder={lang.justification} label={lang.justification}
                                handleChange={event => {

                                    handleChange({key: 'justification', event: event.target.value})
                                }}                                 value={ data.justification}
                                required={true} variant={'area'}
                                width={'100%'}/>


                            <TextField

                                placeholder={lang.detailingIndirect} label={lang.detailingIndirect}
                                handleChange={event => {

                                    handleChange({
                                        key: 'detailing_of_indirect_costs',
                                        event: event.target.value
                                    })
                                }}                                 value={ data.detailing_of_indirect_costs}
                                required={true} variant={'area'}
                                width={'100%'}/>

                            <MultiSelectField
                                placeholder={lang.ways}
                                label={lang.ways}
                                handleChange={event => {

                                    handleChange({key: 'ways_of_execution', event: event})
                                }} value={ data.ways_of_execution}
                                required={false}
                                width={'calc(50% - 16px)'}
                                choices={lang.waysOptions}
                            />
                            <Selector
                                getEntityKey={entity => {
                                    if (entity !== null && entity !== undefined)
                                        return entity.id
                                    else return -1
                                }} searchFieldName={'search_input'}
                                handleChange={entity => {
                                    handleChange({key: 'budget_plan', event: entity})
                                }} label={'Vincular plano orçamentário'}
                                setChanged={() => null}
                                selected={ data.budget_plan}
                                disabled={false}
                                handleCreate={() => setOpen(true)}
                                width={'calc(50% - 16px)'}
                                fields={[
                                    {key: 'number', type: 'string'},
                                    {key: 'detailing', type: 'string'}
                                ]} required={true}
                                fetchParams={{
                                    action: props.ted.action !== undefined && props.ted.action !== null ? props.ted.action.id : null
                                }}
                                labels={['número', 'detalhamento']}
                                fetchUrl={Host() + 'list/budget_plan'}

                                fetchToken={(new Cookies()).get('jwt')}
                                createOption={true}
                                returnToList={!open}
                                setReturnToList={() => setOpen(true)}
                            >
                                <BudgetPlanForm create={true} returnToMain={() => setOpen(false)}/>
                            </Selector>

                        </FormRow>

                        <FormRow
                            title={'Responsável pela execução do Plano de Trabalho na Unidade Descentralizada'}>
                            <TextField
                                placeholder={lang.responsibleExecution} label={lang.responsibleExecution}
                                handleChange={event => {

                                    handleChange({
                                        key: 'responsible_execution',
                                        event: event.target.value
                                    })
                                }}                                 value={ data.responsible_execution}
                                required={true}
                                width={'calc(50% - 16px)'}/>
                            <TextField
                                placeholder={lang.func} label={lang.func}
                                handleChange={event => {

                                    handleChange({key: 'func', event: event.target.value})
                                }} value={ data.func}
                                required={true}
                                width={'calc(50% - 16px)'}/>
                            <TextField
                                placeholder={lang.email} label={lang.email}
                                handleChange={event => {

                                    handleChange({key: 'email', event: event.target.value})
                                }} value={ data.email}
                                required={true}
                                width={'calc(50% - 16px)'}/>
                            <TextField
                                placeholder={lang.phone} label={lang.phone}
                                handleChange={event => {

                                    handleChange({key: 'phone', event: event.target.value})
                                }} value={ data.phone}
                                required={true} phoneMask={true}
                                width={'calc(50% - 16px)'}/>

                        </FormRow>
                    </>
                )}
            </Form>
        </div>
    )

}

WorkPlanForm.propTypes = {
    asApostille: PropTypes.bool,
    workPlan: PropTypes.bool,

    id: PropTypes.number,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    ted: PropTypes.object,
    project: PropTypes.object,
}
