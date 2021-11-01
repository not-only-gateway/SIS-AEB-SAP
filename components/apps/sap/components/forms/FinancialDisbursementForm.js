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


export default function FinancialDisbursementForm(props) {

    const lang = StatusPT
    const [initialData, setInitialData] = useState(null)
        const [draftID, setDraftID] = useState(props.draftID)
    const formHook = useDataWithDraft({
        initialData: initialData,
    draftUrl: Host().replace('api', 'draft') + 'financial_disbursement',
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
    


    useEffect(() => {
        setInitialData({
            ...props.data,
            ...{
                work_plan: props.workPlan.id
            }
        })
    }, [])
    return (
        <Form
            hook={formHook}
            initialData={initialData}
            create={props.create} title={props.create ? lang.newFinancial : lang.financial}
            dependencies={
                [
                    {key: 'year', type: 'number'},
                    {key: 'month', type: 'number'},
                    {key: 'value', type: 'number'},
                ]
            }
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
