import React, {useMemo} from "react";
import PropTypes from "prop-types";
import ResourcePT from "../../locales/ResourcePT";
import NatureExpenseForm from "./NatureExpenseForm";


import submit from "../../utils/submit";
import associativeKeys from "../../keys/associativeKeys";
import getQuery from "../../utils/getQuery";

import workPlanKeys from "../../keys/workPlanKeys";
import FormTemplate from "../../../../addons/FormTemplate";
import formOptions from "../../../../addons/formOptions";
import {Form, FormRow, SelectField, Selector, TextField, useQuery} from 'mfc-core'

export default function ResourceApplicationForm(props) {

    const lang = ResourcePT

    const natureHook = useQuery(getQuery('nature_of_expense'))
    const initialData = useMemo(() => {
        return {
            ...props.data,
            ...{
                operation_phase: props.operation?.id
            }
        }
    }, [props])

    return (
        <FormTemplate
            keys={workPlanKeys.resource}
            endpoint={'resource_application'}
            initialData={initialData}
        >
            {({setOpen, formHook, asDraft, asHistory}) => (
        <Form
            hook={formHook}
            create={props.create} title={props.create ? lang.newResource : lang.resource}
            returnButton={true}
            options={formOptions({
                asDraft: asDraft,
                asHistory: asHistory,
                setOpen: setOpen,
                create: props.create
            })}
            handleSubmit={(data, clearState) =>
                submit({
                    suffix: 'resource_application',
                    pk: data.id,
                    data: data,

                    create: props.create
                }).then(res => {
                    if (props.create && res.success) {
                        props.handleClose()
                        clearState()
                    }
                })}
            handleClose={() => props.handleClose()}>
            {(data, handleChange) => (
                <FormRow>
                    <Selector
                        hook={natureHook} keys={associativeKeys.natureOfExpense}
                        width={'calc(33.333% - 21.5px)'}
                        required={true}
                        value={data.nature_of_expense_field}
                        label={'Natureza de despesas'}
                        placeholder={'Natureza de despesas'}
                        handleChange={entity => handleChange({key: 'nature_of_expense_field', event: entity})}
                        createOption={true}
                    >
                        {handleClose => (
                            <NatureExpenseForm asDefault={true} create={true} handleClose={handleClose}/>
                        )}
                    </Selector>
                    <SelectField
                        dark={true}
                        placeholder={lang.indirectCosts}
                        label={lang.indirectCosts}
                        handleChange={event => {

                            handleChange({key: 'indirect_cost', event: event})
                        }} value={data.indirect_cost} required={false}
                        width={'calc(33.333% - 21.5px)'} choices={lang.baseOptions}/>

                    <TextField
                        placeholder={lang.value} label={lang.value}
                        handleChange={event => {

                            handleChange({key: 'value', event: event.target.value})
                        }} value={data.value}
                        required={true} type={'number'} maskStart={'R$'}
                        floatFilter={true}
                        width={'calc(33.333% - 21.5px)'}/>
                </FormRow>
            )}
        </Form>
            )}
        </FormTemplate>
    )

}

ResourceApplicationForm.propTypes = {
    id: PropTypes.number,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    handleClose: PropTypes.func,
    create: PropTypes.bool,
    operation: PropTypes.object,
}
