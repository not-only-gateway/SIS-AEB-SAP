import React, {useEffect, useState} from "react";
import {DropDownField,  TextField} from "mfc-core";
import PropTypes from "prop-types";
import StatusPT from "../../locales/StatusPT";
import Form from "../../../../core/inputs/form/Form";
import useDataWithDraft from "../../../../core/inputs/form/useDataWithDraft";
import Cookies from "universal-cookie/lib";
import submit from "../../utils/requests/submit";
import Host from "../../utils/shared/Host";
import FormRow from "../../../../core/inputs/form/FormRow";
import tedKeys from "../../keys/tedKeys";
import workPlanKeys from "../../keys/workPlanKeys";


export default function FinancialDisbursementForm(props) {

    const lang = StatusPT
    const [initialData, setInitialData] = useState(null)


    useEffect(() => {
        setInitialData({
            ...props.data,
            ...{
                work_plan: props.workPlan.id
            }
        })
    }, [])
    return (
        <FormOptions
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

                    <DropDownField
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
                        required={true} type={'number'} maskStart={'R$'} currencyMask={true}
                        width={'calc(33.333% - 21.5px)'}/>


                </FormRow>
            )}
        </Form>
            )}
        </FormOptions>
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
