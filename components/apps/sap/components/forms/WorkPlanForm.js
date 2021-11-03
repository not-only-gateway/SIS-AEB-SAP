import React, {useMemo, useState} from "react";
import PropTypes from 'prop-types'
import WorkPlanPT from "../../locales/WorkPlanPT";
import {useQuery} from "mfc-core";
import associativeKeys from "../../keys/associativeKeys";
import getQuery from "../../queries/getQuery";
import Selector from "../../../../core/inputs/selector/Selector";
import Form from "../../../../core/inputs/form/Form";
import useDataWithDraft from "../../../../core/inputs/form/useDataWithDraft";
import Cookies from "universal-cookie/lib";
import submit from "../../utils/requests/submit";
import projectKeys from "../../keys/projectKeys";
import tedKeys from "../../keys/tedKeys";
import UnitForm from "./UnitForm";
import BudgetPlanForm from "./BudgetPlanForm";
import InfrastructureForm from "./InfrastructureForm";
import TextField from "../../../../core/inputs/text/TextField";
import DropDownField from "../../../../core/inputs/dropdown/DropDownField";
import Host from "../../utils/shared/Host";
import FormRow from "../../../../core/inputs/form/FormRow";
import MultiSelectField from "../../../../core/inputs/multiselect/MultiSelectField";


export default function WorkPlanForm(props) {
    const lang = WorkPlanPT
    const unitHook = useQuery(getQuery('unit'))
    const budgetPlanHook = useQuery(getQuery('budget_plan'))
    const projectHook = useQuery(getQuery('project'))
    const tedHook = useQuery(getQuery('ted'))
    const infrastructureHook = useQuery(getQuery('infrastructure'))

    const initialData = useMemo(() => {
        if (props.create) {
            if (props.asApostille)
                return {
                    ...props.data,
                    apostille_work_plan: props.workPlan
                }
            else if (props.ted)
                return {
                    ...props.data,
                    ted: props.ted
                }
            else if (props.project)
                return {
                    ...props.data,
                    activity_project: props.project
                }
            else return props.data
        } else return props.data
    }, [props.data])

    const [draftID, setDraftID] = useState(props.draftID)
    const formHook = useDataWithDraft({
        initialData: initialData,
        draftUrl: Host().replace('api', 'draft') + 'work_plan',
        draftHeaders: {'authorization': (new Cookies()).get('jwt')},
        interval: 5000,
        parsePackage: pack => {
            return {
                ...pack,
                identifier: draftID
            }
        },
        draftMethod: draftID ? 'put' : 'post',
        onSuccess: (res) => {
            setDraftID(res.data.id)
        }
    })


    return (

        <Form
            hook={formHook}
            create={props.create}
            title={props.asApostille ? 'Novo apostilamento' : props.create?  'Novo plano de trabalho' : 'Plano de trabalho'}
            returnButton={props.create}
            handleSubmit={(data, clearState) => {
                submit({
                    suffix: props.asApostille ? 'apostille' : 'work_plan',
                    pk: data.id,
                    data: data,
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
                        {!props.ted ?
                            <Selector
                                hook={tedHook} keys={tedKeys.ted}
                                width={props.project ? 'calc(33.333% - 21.5px)' : 'calc(50% - 16px)'}
                                required={true} createOption={false}
                                value={data.ted}
                                title={'Instrumento de celebração'}
                                placeholder={'Instrumento de celebração'}
                                handleChange={entity => handleChange({key: 'ted', event: entity})}
                            />
                            :
                            null
                        }
                        {!props.project ?
                            <Selector
                                hook={projectHook} keys={projectKeys.project}
                                width={props.ted ? 'calc(33.333% - 21.5px)' : 'calc(50% - 16px)'}
                                required={true}
                                value={data.activity_project}
                                title={'Projeto / atividade'}
                                placeholder={'Projeto / atividade'}
                                handleChange={entity => handleChange({key: 'activity_project', event: entity})}
                            />
                            :
                            null
                        }
                        <Selector
                            hook={unitHook} keys={associativeKeys.responsible}
                            width={(!props.ted && props.project) || (!props.project && props.ted) ? 'calc(33.333% - 21.5px)' : 'calc(50% - 16px)'}
                            required={true}
                            value={data.responsible}
                            title={'Responsável'}
                            placeholder={'Responsável'}
                            handleChange={entity => handleChange({key: 'responsible', event: entity})}
                            createOption={true}
                        >
                            {handleClose => (
                                <UnitForm create={true} asDefault={true} handleClose={() => handleClose()}/>
                            )}
                        </Selector>
                        <Selector
                            hook={budgetPlanHook} keys={associativeKeys.budgetPlan}
                            width={(!props.ted && props.project) || (!props.project && props.ted) ? 'calc(33.333% - 21.5px)' : 'calc(50% - 16px)'}
                            required={true}
                            value={data.budget_plan}
                            title={'Plano orçamentário'}
                            placeholder={'Plano orçamentário'}
                            handleChange={entity => handleChange({key: 'budget_plan', event: entity})}
                            createOption={true}
                        >
                            {handleClose => (
                                <BudgetPlanForm create={true} asDefault={true} handleClose={() => handleClose()}/>
                            )}
                        </Selector>
                        <TextField

                            placeholder={lang.object} label={lang.object}
                            handleChange={event => {

                                handleChange({key: 'object', event: event.target.value})
                            }} value={data.object}
                            required={true} variant={'area'}
                            width={'100%'}/>
                        <DropDownField

                            placeholder={lang.subDecentralization}
                            label={lang.subDecentralization}
                            handleChange={event => {

                                handleChange({key: 'sub_decentralization', event: event})
                            }} value={data.sub_decentralization}
                            required={true}
                            width={'calc(50% - 16px)'}
                            choices={lang.baseOptions}/>

                        <DropDownField
                            placeholder={lang.indirectCosts}
                            label={lang.indirectCosts}
                            handleChange={event => {

                                handleChange({key: 'indirect_costs', event: event})
                            }} value={data.indirect_costs} required={true}
                            width={'calc(50% - 16px)'}
                            choices={lang.baseOptions}/>
                        <Selector
                            hook={infrastructureHook}
                            keys={associativeKeys.infrastructure}
                            width={'calc(50% - 16px)'}
                            required={true}
                            value={data.infrastructure}
                            title={'Infraestrutura'}
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
                            placeholder={lang.ways}
                            label={lang.ways}
                            handleChange={event => {

                                handleChange({key: 'ways_of_execution', event: event})
                            }} value={data.ways_of_execution}
                            required={false}
                            width={'calc(50% - 16px)'}
                            choices={lang.waysOptions}
                        />


                        <TextField

                            placeholder={lang.justification} label={lang.justification}
                            handleChange={event => {

                                handleChange({key: 'justification', event: event.target.value})
                            }} value={data.justification}
                            required={true} variant={'area'}
                            width={'100%'}/>


                        <TextField

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
                            placeholder={lang.func} label={lang.func}
                            handleChange={event => {

                                handleChange({key: 'func', event: event.target.value})
                            }} value={data.func}
                            required={true}
                            width={'calc(50% - 16px)'}/>
                        <TextField
                            placeholder={lang.email} label={lang.email}
                            handleChange={event => {

                                handleChange({key: 'email', event: event.target.value})
                            }} value={data.email}
                            required={true}
                            width={'calc(50% - 16px)'}/>
                        <TextField
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
    )

}

WorkPlanForm.propTypes = {
    asApostille: PropTypes.bool,
    workPlan: PropTypes.bool,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    handleClose: PropTypes.func,
    create: PropTypes.bool,
    ted: PropTypes.object,
    project: PropTypes.object,
}
