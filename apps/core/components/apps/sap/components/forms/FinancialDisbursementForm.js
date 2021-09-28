import React, {useEffect, useState} from "react";
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
import PropTypes from "prop-types";
import WorkPlanRequests from "../../utils/requests/WorkPlanRequests";
import StatusPT from "../../locales/StatusPT";

export default function FinancialDisbursementForm(props) {

    const lang = StatusPT

    useEffect(() => {

        props.handleChange({name: 'work_plan', value: props.workPlan.id})
    }, [])
    return (
        <>

            <Form
                initialData={props.data}
                create={props.create} title={props.create ? lang.newFinancial : lang.financial}
                dependencies={
                    [
                        {name: 'year', type: 'number'},
                        {name: 'month', type: 'number'},
                        {name: 'value', type: 'number'},
                    ]
                }
                returnButton={true}
                handleSubmit={() =>
                    WorkPlanRequests.submitFinancial({
                        pk: props.data.id,
                        data: props.data,

                        create: props.create
                    }).then(res => {
                        if (props.create && res)
                            props.returnToMain()
                    })}
                handleClose={() => props.returnToMain()}>
                {(data, handleChange) => (
                    <FormRow>

                        <TextField
                            placeholder={lang.year} label={lang.year}
                            handleChange={event => {

                                props.handleChange({name: 'year', value: event.target.value})
                            }}  value={props.data === null ? null : props.data.year}
                            required={true} type={'number'}
                            width={'calc(33.333% - 21.5px)'}/>

                        <DropDownField
                            placeholder={lang.month}
                            label={lang.month}
                            handleChange={event => {

                                props.handleChange({name: 'month', value: event})
                            }} value={props.data === null ? null : props.data.month} required={false}
                            width={'calc(33.333% - 21.5px)'} choices={lang.monthOptions}/>
                        <TextField
                            placeholder={lang.value} label={lang.value}
                            handleChange={event => {

                                props.handleChange({name: 'value', value: event.target.value})
                            }}  value={props.data === null ? null : props.data.value}
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
