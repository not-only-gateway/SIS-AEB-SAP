import React, {useEffect, useState} from 'react'
import Head from "next/head";
import ProjectRequests from "../utils/requests/ProjectRequests";

import PropTypes from 'prop-types'
import WorkPlanRequests from "../utils/requests/WorkPlanRequests";
import VerticalTabs from "../../../core/navigation/tabs/VerticalTabs";
import TedForm from "../components/forms/TedForm";
import AddendumList from "../components/lists/AddendumList";
import shared from "../styles/Shared.module.css";
import WorkPlanList from "../components/lists/WorkPlanList";
import Tabs from "../../../core/navigation/tabs/Tabs";
import OperationList from "../components/lists/OperationList";
import ExecutionList from "../components/lists/ExecutionList";
import ActivityList from "../components/lists/ActivityList";
import GoalList from "../components/lists/GoalList";

export default function WorkPlan(props) {
    const [workPlan, setWorkPlan] = useState(undefined)

    useEffect(() => {
        WorkPlanRequests.fetchWorkPlan(props.id).then(res => {
            if (res !== null)
                setWorkPlan(res)
        })
    }, [])

    return (
        <>
            <Head>
                <title>{workPlan?.object}</title>
                <link rel='icon' href={'/LOGO.png'} type='image/x-icon'/>
            </Head>
            <Tabs buttons={[
                {
                    label: 'Plano de trabalho', children: (
                        <VerticalTabs
                            classes={[
                                {
                                    buttons: [
                                        {label: 'Dados', children: <TedForm/>}
                                    ]
                                },
                                {
                                    label: 'Informações adicionais',
                                    buttons: [
                                        {label: 'Metas', children: <GoalList workPlan={workPlan}/>},
                                        {label: 'Etapas', children: <ActivityList/>},
                                        {label: 'Apostilamentos', children: <WorkPlanList asApostille={true}/>}
                                    ]
                                }
                            ]}
                        />
                    )
                },
                {
                    label: 'Fases / operações', children: (
                        <div className={shared.contentWrapper}>
                            <OperationList workPlan={workPlan} redirect={props.redirect}/>
                        </div>
                    )
                },
                {
                    label: 'Execuções', children: (
                        <div className={shared.contentWrapper}>
                            <ExecutionList workPlan={workPlan}/>
                        </div>
                    )
                }
            ]}>
                <div className={shared.header} style={{paddingLeft: '16px'}}>
                    {workPlan?.object}
                </div>
            </Tabs>
        </>
    )
}
WorkPlan.propTypes = {
    routerQuery: PropTypes.object,
    redirect: PropTypes.func
}