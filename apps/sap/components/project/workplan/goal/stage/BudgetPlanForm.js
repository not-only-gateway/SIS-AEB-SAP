import React, {useEffect, useState} from "react";

import {DateField, DropDownField, TextField} from "sis-aeb-inputs";
import PropTypes from "prop-types";
import OperationRequests from "../../../../../utils/fetch/OperationRequests";
import EntityLayout from "../../../../shared/misc/form/EntityLayout";
import PermanentGoodsPT from "../../../../../packages/locales/PermanentGoodsPT";
import Alert from "../../../../shared/misc/alert/Alert";
import ProjectRequests from "../../../../../utils/fetch/ProjectRequests";
import ProjectPT from "../../../../../packages/locales/ProjectPT";
import handleObjectChange from "../../../../../utils/shared/HandleObjectChange";

export default function BudgetPlanForm(props) {
    const [changed, setChanged] = useState(false)
    const lang = ProjectPT
    const [status, setStatus] = useState({
        type: undefined, message: undefined
    })
    const [data, setData] = useState(null)
    return (
        <div style={{width: '55vw', height: '400px', background: 'white', borderRadius: '8px'}}>
            <Alert
                type={status.type} render={status.type !== undefined}
                handleClose={() => setStatus({type: undefined, message: undefined})}
                message={status.message}
            />
            <EntityLayout
                entity={data}
                create={props.create} label={props.create ? lang.newBudgetPlan : lang.budgetPlan}
                dependencies={{
                    fields: [
                        {name: 'budget_plan', type: 'string'},
                        {name: 'action', type: 'string'},
                    ],
                    changed: changed
                }}
                returnButton={true}
                handleSubmit={() =>
                    ProjectRequests.submitBudgetPlan({
                        pk: data.id,
                        data: data,
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
                                placeholder={lang.action} label={lang.action}
                                handleChange={event => {
                                    setChanged(true)
                                    handleObjectChange({
                                        event: ({name: 'action', value: event.target.value}),
                                        setData: setData
                                    })

                                }} value={data === null ? null : data.action}
                                required={true} width={'100%'} variant={'area'}/>

                            <TextField
                                placeholder={lang.budgetPlan} label={lang.budgetPlan}
                                handleChange={event => {
                                    setChanged(true)
                                    handleObjectChange({
                                        event: ({name: 'budget_plan', value: event.target.value}),
                                        setData: setData
                                    })
                                }} value={data === null ? null : data.budget_plan}
                                required={true} width={'100%'}
                            />
                        </>
                    )
                }]}/>
        </div>
    )

}

BudgetPlanForm.propTypes = {
    returnToMain: PropTypes.func,
    create: PropTypes.bool
}
