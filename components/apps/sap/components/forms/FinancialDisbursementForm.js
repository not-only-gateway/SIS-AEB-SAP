import React, {useMemo} from "react";
import {SelectField, TextField} from "mfc-core";
import PropTypes from "prop-types";
import StatusPT from "../../locales/StatusPT";
import Form from "../../../../core/inputs/form/Form";
import submit from "../../utils/submit";
import FormRow from "../../../../core/inputs/form/FormRow";
import workPlanKeys from "../../keys/workPlanKeys";
import FormTemplate from "../../templates/FormTemplate";
import formOptions from "../../templates/formOptions";


export default function FinancialDisbursementForm(props) {

    const lang = StatusPT
    const initialData = useMemo(() => {
        return{
            ...props.data,
            ...{
                work_plan: props.workPlan.id
            }
        }
    }, [props])


    return (
        <FormTemplate
            keys={workPlanKeys.financialDisbursement}
            endpoint={'financial_disbursement'}
            initialData={initialData}
        >
            {({setOpen, formHook, asDraft, asHistory}) => (
        <Form
            hook={formHook}
            create={props.create}
            title={props.create ? lang.newFinancial : lang.financial}
            returnButton={true}
            options={formOptions({
                asDraft: asDraft,
                asHistory: asHistory,
                setOpen: setOpen,
                create: props.create
            })}
            handleSubmit={(data, clearState) =>
                submit({
                    suffix: 'financial_disbursement',
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

                    <TextField
                        placeholder={lang.year} label={lang.year}
                        handleChange={event => {

                            handleChange({key: 'year', event: event.target.value})
                        }} value={data.year}
                        required={true} type={'number'}
                        width={'calc(33.333% - 21.5px)'}/>

                    <SelectField
                        placeholder={lang.month}
                        label={lang.month}
                        handleChange={event => {

                            handleChange({key: 'month', event: event})
                        }} value={data.month} required={false}
                        width={'calc(33.333% - 21.5px)'} choices={lang.monthOptions}/>
                    <TextField
                        placeholder={lang.value} label={lang.value}
                        handleChange={event => {

                            handleChange({key: 'value', event: event.target.value})
                        }} value={data.value}

                        required={true} type={'number'} maskStart={'R$'} floatFilter={true}
                        width={'calc(33.333% - 21.5px)'}/>


                </FormRow>
            )}
        </Form>
            )}
        </FormTemplate>
    )

}

FinancialDisbursementForm.propTypes = {
    id: PropTypes.number,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    handleClose: PropTypes.func,
    create: PropTypes.bool,
    workPlan: PropTypes.object,
}
