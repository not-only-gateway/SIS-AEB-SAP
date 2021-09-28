import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types'
import WorkPlanPT from "../../locales/WorkPlanPT";
import Host from "../../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import BudgetPlanForm from "./BudgetPlanForm";
import WorkPlanRequests from "../../utils/requests/WorkPlanRequests";
import UnitForm from "./UnitForm";
import InfrastructureForm from "./InfrastructureForm";
import {
    useQuery,
    Tabs,
    List,
    Modal,
    Selector,
    Form, FormRow,
    DateField,
    DropDownField,
    FileField,
    MultiSelectField,
    Navigation,
    Requester,
    TextField,
    ToolTip
} from "sis-aeb-core";


export default function WorkPlanForm(props) {
    const lang = WorkPlanPT
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (props.create) {
            if (!props.asApostille) {
                props.handleChange({name: 'ted', value: props.ted.id})
                props.handleChange({name: 'project', value: props.project.id})
            } else
                props.handleChange({name: 'work_plan', value: props.workPlan})
        }
    }, [])
    return (
        <div style={{width: '100%'}}>
            <Form
                initialData={props.data}
                create={props.create}
                title={lang.title}
                dependencies={[
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
                ]
                } noHeader={!props.create}
                returnButton={props.create}
                handleSubmit={() => {
                    if (!props.asApostille)
                        WorkPlanRequests.submitWorkPlan({
                            pk: props.id,
                            data: props.data,
                            create: props.create
                        }).then(res => {
                            if (res !== null && props.create)
                                props.redirect(res)
                        })
                    else
                        WorkPlanRequests.submitApostille({
                            pk: props.data.id,
                            data: props.data,
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
                                    props.handleChange({name: 'responsible', value: entity})
                                }} label={'Vincular responsável'}
                                selected={props.data === null || !props.data.responsible ? null : props.data.responsible}
                                disabled={false}
                                width={'calc(50% - 16px)'}
                                fields={[
                                    {name: 'name', type: 'string'},
                                    {name: 'acronym', type: 'string'},
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

                                    props.handleChange({name: 'apostille', value: event})
                                }} value={props.data === null ? null : props.data.apostille} required={false}
                                width={'calc(50% - 16px)'} choices={lang.apostilleOptions}/>

                            <TextField

                                placeholder={lang.object} label={lang.object}
                                handleChange={event => {

                                    props.handleChange({name: 'object', value: event.target.value})
                                }} value={props.data === null ? null : props.data.object}
                                required={true} variant={'area'}
                                width={'100%'}/>
                            <DropDownField

                                placeholder={lang.subDecentralization}
                                label={lang.subDecentralization}
                                handleChange={event => {

                                    props.handleChange({name: 'sub_decentralization', value: event})
                                }} value={props.data === null ? null : props.data.sub_decentralization}
                                required={true}
                                width={'calc(25% - 24px)'} choices={lang.baseOptions}/>

                            <DropDownField
                                placeholder={lang.indirectCosts}
                                label={lang.indirectCosts}
                                handleChange={event => {

                                    props.handleChange({name: 'indirect_costs', value: event})
                                }} value={props.data === null ? null : props.data.indirect_costs} required={true}
                                width={'calc(25% - 24px)'} choices={lang.baseOptions}/>
                            <Selector
                                getEntityKey={entity => {
                                    if (entity !== null && entity !== undefined)
                                        return entity.id
                                    else return -1
                                }}
                                searchFieldName={'search_input'}
                                handleChange={entity => {
                                    props.handleChange({name: 'infrastructure', value: entity})
                                }} label={'Vincular infraestrutura'}
                                selected={props.data === null ? null : props.data.infrastructure}
                                width={'calc(50% - 16px)'}
                                fields={[
                                    {name: 'name', type: 'string'},
                                    {name: 'type', type: 'string'}
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

                                    props.handleChange({name: 'justification', value: event.target.value})
                                }}                                 value={props.data === null ? null : props.data.justification}
                                required={true} variant={'area'}
                                width={'100%'}/>


                            <TextField

                                placeholder={lang.detailingIndirect} label={lang.detailingIndirect}
                                handleChange={event => {

                                    props.handleChange({
                                        name: 'detailing_of_indirect_costs',
                                        value: event.target.value
                                    })
                                }}                                 value={props.data === null ? null : props.data.detailing_of_indirect_costs}
                                required={true} variant={'area'}
                                width={'100%'}/>

                            <MultiSelectField
                                placeholder={lang.ways}
                                label={lang.ways}
                                handleChange={event => {

                                    props.handleChange({name: 'ways_of_execution', value: event})
                                }} value={props.data === null ? null : props.data.ways_of_execution}
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
                                    props.handleChange({name: 'budget_plan', value: entity})
                                }} label={'Vincular plano orçamentário'}
                                setChanged={() => null}
                                selected={props.data === null ? null : props.data.budget_plan}
                                disabled={false}
                                handleCreate={() => setOpen(true)}
                                width={'calc(50% - 16px)'}
                                fields={[
                                    {name: 'number', type: 'string'},
                                    {name: 'detailing', type: 'string'}
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

                                    props.handleChange({
                                        name: 'responsible_execution',
                                        value: event.target.value
                                    })
                                }}                                 value={props.data === null ? null : props.data.responsible_execution}
                                required={true}
                                width={'calc(50% - 16px)'}/>
                            <TextField
                                placeholder={lang.func} label={lang.func}
                                handleChange={event => {

                                    props.handleChange({name: 'func', value: event.target.value})
                                }} value={props.data === null ? null : props.data.func}
                                required={true}
                                width={'calc(50% - 16px)'}/>
                            <TextField
                                placeholder={lang.email} label={lang.email}
                                handleChange={event => {

                                    props.handleChange({name: 'email', value: event.target.value})
                                }} value={props.data === null ? null : props.data.email}
                                required={true}
                                width={'calc(50% - 16px)'}/>
                            <TextField
                                placeholder={lang.phone} label={lang.phone}
                                handleChange={event => {

                                    props.handleChange({name: 'phone', value: event.target.value})
                                }} value={props.data === null ? null : props.data.phone}
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
