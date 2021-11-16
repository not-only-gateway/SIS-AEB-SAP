import React, {useMemo} from "react";
import PropTypes from "prop-types";
import ResourcePT from "../../locales/ResourcePT";
import NatureExpenseForm from "./NatureExpenseForm";
import {DropDownField, Selector, TextField, useQuery} from "mfc-core";
import Form from "../../../../core/inputs/form/Form";
import submit from "../../utils/submit";
import associativeKeys from "../../keys/associativeKeys";
import getQuery from "../../utils/getQuery";
import FormRow from "../../../../core/inputs/form/FormRow";
import workPlanKeys from "../../keys/workPlanKeys";
import FormTemplate from "../../templates/FormTemplate";
import formOptions from "../../templates/formOptions";


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
                        value={data.nature_of_expense}
                        label={'Natureza de despesas'}
                        placeholder={'Natureza de despesas'}
                        handleChange={entity => handleChange({key: 'nature_of_expense', event: entity})}
                        createOption={true}
                    >
                        {handleClose => (
                            <NatureExpenseForm asDefault={true} create={true} handleClose={handleClose}/>
                        )}
                    </Selector>
                    <DropDownField
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
