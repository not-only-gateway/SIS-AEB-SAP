import React, {useState} from "react";
import {Tabs} from "sis-aeb-core";
import PropTypes from 'prop-types'
import WorkPlanPT from "../../locales/WorkPlanPT";
import WorkPlanForm from "../forms/WorkPlanForm";
import StatusList from "../lists/StatusList";
import GoalList from "../lists/GoalList";
import OperationList from "../lists/OperationList";
import FinancialDisbursementList from "../lists/FinancialDisbursementList";
import ApostilleList from "../lists/ApostilleList";
import ExecutionList from "../lists/ExecutionList";

export default function WorkPlan(props) {
    const lang = WorkPlanPT
    const [openTab, setOpenTab] = useState(0)
    const [internalOpenTab, setInternalOpenTab] = useState(0)

    return (
        <div>
            <Tabs
                buttons={[
                    {
                        key: 0,
                        value: lang.details,
                        content: (
                            <Tabs
                                buttons={[
                                    {
                                        key: 0,
                                        value: lang.workPlan,
                                        content: (
                                            <WorkPlanForm
                                                handleChange={props.setWorkPlan} id={props.workPlan.id}
                                                create={false} ted={props.ted}
                                                data={props.workPlan}/>
                                        )
                                    },

                                    {
                                        key: 1,
                                        value: lang.status,
                                        content: <StatusList workPlan={props.workPlan}/>
                                    },
                                    {
                                        key: 2,
                                        value: lang.financialDisbursement,
                                        content: <FinancialDisbursementList workPlan={props.workPlan}/>
                                    },
                                    {
                                        key: 3,
                                        value: lang.apostilles,
                                        content: (
                                            <div style={{width: '100%'}}>
                                                <ApostilleList workPlan={props.workPlan} ted={props.ted}/>
                                            </div>
                                        )
                                    }

                                ]} type={'vertical'}
                                setOpenTab={setInternalOpenTab}
                                openTab={internalOpenTab}
                            />
                        )
                    },
                    {
                        key: 1,
                        value: lang.goals,
                        content: <GoalList
                            workPlan={props.workPlan}
                            setCurrentStructure={props.setGoal}
                        />
                    },

                    {
                        key: 2,
                        value: lang.operation,
                        content: <OperationList  workPlan={props.workPlan}/>
                    },
                    {
                        key: 3,
                        value: lang.executions,
                        content: <ExecutionList workPlan={props.workPlan}/>
                    }
                ]}
                styles={{paddingLeft: '10%', paddingRight: '10%'}}
                setOpenTab={setOpenTab}
                openTab={openTab}
            />
        </div>
    )
}
WorkPlan.propTypes = {
    workPlan: PropTypes.object,
    setWorkPlan: PropTypes.func,
    setGoal: PropTypes.func,
    ted: PropTypes.object
}
