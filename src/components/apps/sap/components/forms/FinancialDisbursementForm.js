import React, {useEffect, useState} from "react";
import {DropDownField, Form, FormRow, TextField} from "sis-aeb-core";
import PropTypes from "prop-types";
import WorkPlanRequests from "../../utils/requests/WorkPlanRequests";
import StatusPT from "../../locales/StatusPT";

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
        <>

            <Form
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
                    WorkPlanRequests.submitFinancial({
                        pk: data.id,
                        data: data,

                        create: props.create
                    }).then(res => {
                        if (props.create && res){
                            props.returnToMain()
                            clearState()
                        }
                    })}
                handleClose={() => props.returnToMain()}>
                {(data, handleChange) => (
                    <FormRow>

                        <TextField
                            placeholder={lang.year} label={lang.year}
                            handleChange={event => {

                                handleChange({key: 'year', event: event.target.value})
                            }}  value={ data.year}
                            required={true} type={'number'}
                            width={'calc(33.333% - 21.5px)'}/>

                        <DropDownField
                            placeholder={lang.month}
                            label={lang.month}
                            handleChange={event => {

                                handleChange({key: 'month', event: event})
                            }} value={ data.month} required={false}
                            width={'calc(33.333% - 21.5px)'} choices={lang.monthOptions}/>
                        <TextField
                            placeholder={lang.value} label={lang.value}
                            handleChange={event => {

                                handleChange({key: 'value', event: event.target.value})
                            }}  value={ data.value}
                            required={true} type={'number'} maskStart={'R$'} currencyMask={true}
                            width={'calc(33.333% - 21.5px)'}/>


                    </FormRow>
                )}
            </Form>
        </>
    )

}

FinancialDisbursementForm.propTypes = {
    id: PropTypes.number,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    workPlan: PropTypes.object
}
