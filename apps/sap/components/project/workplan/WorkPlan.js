import React, {useState} from "react";
import Tabs from "../../shared/misc/tabs/Tabs";
import PropTypes from 'prop-types'
import WorkPlanPT from "../../../packages/locales/WorkPlanPT";
import WorkPlanForm from "./WorkPlanForm";
import StatusList from "./StatusList";
import InfrastructureList from "./infrastructure/InfrastructureList";
import GoalList from "./goal/GoalList";
import HorizontalChart from "../../shared/chart/HorizontalChart";
import OperationList from "./goal/stage/OperationList";

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
                        value: lang.workPlan,
                        content: (
                            <Tabs
                                buttons={[
                                    {
                                        key: 0,
                                        value: props.workPlan.object,
                                        content: (
                                            <WorkPlanForm
                                                handleChange={props.setWorkPlan} id={props.workPlan.id}
                                                create={false}
                                                data={props.workPlan}/>
                                        )
                                    },

                                    {
                                        key: 1,
                                        value: lang.status,
                                        content: <StatusList workPlan={props.workPlan}/>
                                    }
                                ]} type={'vertical'}
                                setOpenTab={setInternalOpenTab}
                                openTab={internalOpenTab}
                            />
                        )
                    },

                    {
                        key: 1,
                        value: lang.infrastructure,
                        content: <InfrastructureList workPlan={props.workPlan}/>
                    },
                    {
                        key: 2,
                        value: lang.goals,
                        content: <GoalList
                            workPlan={props.workPlan}
                            setCurrentStructure={props.setGoal}
                        />
                    },

                    {
                        key: 3,
                        value: lang.operation,
                        content: <OperationList stage={null} setExecution={() => null} workPlan={props.workPlan}/>
                    },
                    {
                        key: 4,
                        value: lang.panel,
                        content: (
                            <HorizontalChart
                                styles={{width: '100%', height: '500px'}}
                                title={'Teste para Teste'} axisField={'y'}
                                axisLabel={'Eixo teste'}
                                valuesField={
                                    'x'
                                }
                                data={[
                                    {
                                        x: 1,y: 'cafe',
                                        z: 'cafe222'
                                    },{
                                        x: 13,y: 'ca123213fe',
                                        z: 'cafe222'
                                    },{
                                        x: 112,y: '2323',
                                        z: '2135'
                                    },
                                ]}
                                legendLabel={'Legendas'}
                                legendsField={'z'}
                                valueLabel={'ValorLabel'}
                            />
                        )
                    }
                ]}
                setOpenTab={setOpenTab}
                openTab={openTab}
            />
        </div>
    )
}
WorkPlan.propTypes = {
    workPlan: PropTypes.object,
    setWorkPlan: PropTypes.func,
    setGoal: PropTypes.func
}
