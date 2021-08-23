import React, {useEffect, useState} from "react";
import {Alert} from "sis-aeb-misc";
import EntityLayout from "../../shared/misc/form/EntityLayout";
import {TextField} from "sis-aeb-inputs";
import PropTypes from "prop-types";
import WorkPlanRequests from "../../../utils/fetch/WorkPlanRequests";
import StatusPT from "../../../packages/locales/StatusPT";

export default function FinancialDisbursementForm(props) {
    const [changed, setChanged] = useState(false)
    const lang = StatusPT
    const [status, setStatus] = useState({
        type: undefined, message: undefined
    })
    useEffect(() => {

        props.handleChange({name: 'work_plan', value: props.workPlan.id})
    }, [])
    return (
        <>
            <Alert
                type={status.type} render={status.type !== undefined} rootElementID={'root'}
                handleClose={() => setStatus({type: undefined, message: undefined})} message={status.message}
            />
            <EntityLayout
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
                        setStatus: setStatus,
                        create: props.create
                    }).then(res => {
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

                            <TextField
                                placeholder={lang.month} label={lang.month}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'month', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.month}
                                required={true} type={'number'}
                                width={'calc(33.333% - 21.5px)'}/>
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