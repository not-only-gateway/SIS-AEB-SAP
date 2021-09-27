import React, {useEffect, useState} from "react";
import Form from "../../../shared/core/form/Form";
import {DropDownField, TextField} from "sis-aeb-core";
import PropTypes from "prop-types";
import WorkPlanRequests from "../../../../utils/requests/WorkPlanRequests";
import StatusPT from "../../../../locales/StatusPT";

export default function FinancialDisbursementForm(props) {
    const [changed, setChanged] = useState(false)
    const lang = StatusPT

    useEffect(() => {

        props.handleChange({name: 'work_plan', value: props.workPlan.id})
    }, [])
    return (
        <>

            <Form
                rootElementID={'root'} entity={props.data}
                create={props.create} label={props.create ? lang.newFinancial : lang.financial}
                dependencies={{
                    fields: [
                        {name: 'year', type: 'number'},
                        {name: 'month', type: 'number'},
                        {name: 'value', type: 'number'},
                    ],
                    changed: changed
                }}
                returnButton={true}
                handleSubmit={() =>
                    WorkPlanRequests.submitFinancial({
                        pk: props.data.id,
                        data: props.data,

                        create: props.create
                    }).then(res => {
                        if(props.create && res)
                            props.returnToMain()
                        setChanged(!res)
                    })}
                handleClose={() => props.returnToMain()}
                forms={[{
                    child: (
                        <>
                            <TextField
                                placeholder={lang.year} label={lang.year}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'year', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.year}
                                required={true} type={'number'}
                                width={'calc(33.333% - 21.5px)'}/>

                            <DropDownField
                                placeholder={lang.month }
                                label={lang.month }
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'month', value: event})
                                }} value={props.data === null ? null : props.data.month } required={false}
                                width={'calc(33.333% - 21.5px)'} choices={lang.monthOptions}/>
                            <TextField
                                placeholder={lang.value} label={lang.value}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'value', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.value}
                                required={true} type={'number'} maskStart={'R$'} currencyMask={true}
                                width={'calc(33.333% - 21.5px)'}/>

                        </>
                    )
                }]}/>
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
