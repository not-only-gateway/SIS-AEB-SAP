import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types'
import WorkPlanPT from "../../locales/WorkPlanPT";
import {DropDownField, FormRow, MultiSelectField, TextField, useQuery} from "sis-aeb-core";
import associativeKeys from "../../keys/associativeKeys";
import getQuery from "../../queries/getQuery";
import Selector from "../../../../core/inputs/selector/Selector";
import Form from "../../../../core/inputs/form/Form";
import useDataWithDraft from "../../../../core/inputs/form/useDataWithDraft";
import Cookies from "universal-cookie/lib";
import submit from "../../utils/requests/submit";

export default function WorkPlanForm(props) {
    const lang = WorkPlanPT
    const [initialData, setInitialData] = useState(props.data)
    const unitHook = useQuery(getQuery('unit'))
    const budgetPlanHook = useQuery(getQuery('budget_plan'))
    const infrastructureHook = useQuery(getQuery('infrastructure'))
    const formHook = useDataWithDraft({
        initialData: initialData,
        draftUrl: '',
        draftHeaders: {'authorization': (new Cookies()).get('jwt')},
        interval: 120000
    })

    useEffect(() => {
        if (props.create) {
            if (!props.asApostille && props.ted && props.project) {
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
    }, [props.data])


    return (
        <div style={{width: '100%'}}>
            <Form
                hook={formHook}
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
                handleSubmit={(data, clearState) => {
                    submit({
                        suffix: 'work_plan',
                        pk: data.id,
                        data: data,
                        create: props.create
                    }).then(res => {
                        if (res.success && props.create)
                            props.redirect(res.data)
                    })
                }}
                handleClose={() => props.returnToMain()}>
                {(data, handleChange) => (
                    <>
                        <FormRow>

                            <Selector
                                hook={unitHook} keys={associativeKeys.responsible}
                                width={'calc(50% - 16px)'}
                                required={true}
                                value={data.responsible}
                                title={'Responsável'}
                                placeholder={'Responsável'}
                                handleChange={entity => handleChange({key: 'responsible', event: entity})}
                            />

                            <DropDownField
                                dark={true}
                                placeholder={lang.apostille}
                                label={lang.apostille}
                                handleChange={event => {

                                    handleChange({key: 'apostille', event: event})
                                }} value={data.apostille} required={false}
                                width={'calc(50% - 16px)'} choices={lang.apostilleOptions}/>

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
                                width={'calc(33.333% - 21.5px)'} choices={lang.baseOptions}/>

                            <DropDownField
                                placeholder={lang.indirectCosts}
                                label={lang.indirectCosts}
                                handleChange={event => {

                                    handleChange({key: 'indirect_costs', event: event})
                                }} value={data.indirect_costs} required={true}
                                width={'calc(33.333% - 21.5px)'} choices={lang.baseOptions}/>
                            <Selector
                                hook={infrastructureHook} keys={associativeKeys.infrastructure}
                                width={'calc(33.333% - 21.5px)'}
                                required={true}
                                value={data.infrastructure}
                                title={'Infraestrutura'}
                                placeholder={'Infraestrutura'}
                                handleChange={entity => handleChange({key: 'infrastructure', event: entity})}
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

                            <Selector
                                hook={budgetPlanHook} keys={associativeKeys.budgetPlan}
                                width={'calc(50% - 16px)'}
                                required={true}
                                value={data.budget_plan}
                                title={'Plano orçamentário'}
                                placeholder={'Plano orçamentário'}
                                handleChange={entity => handleChange({key: 'budget_plan', event: entity})}
                            />

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
    data: PropTypes.object,
    handleChange: PropTypes.func,
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    ted: PropTypes.object,
    project: PropTypes.object,
}
