import React, {useContext, useEffect, useState} from 'react'
import Head from "next/head";
import PropTypes from 'prop-types'
import VerticalTabs from "../../../core/navigation/tabs/VerticalTabs";
import shared from "../styles/Shared.module.css";
import WorkPlanList from "../components/lists/WorkPlanList";
import OperationList from "../components/lists/OperationList";
import ExecutionList from "../components/lists/ExecutionList";
import ActivityStageList from "../components/lists/ActivityStageList";
import GoalList from "../components/lists/GoalList";
import WorkPlanForm from "../components/forms/WorkPlanForm";
import {fetchEntry} from "../utils/requests/fetch";
import ThemeContext from "../../../core/misc/theme/ThemeContext";
import Breadcrumbs from "../../../core/navigation/breadcrumbs/Breadcrumbs";
import styles from "../../management/styles/Shared.module.css";
import {CategoryRounded} from "@material-ui/icons";
import StatusList from "../components/lists/StatusList";

export default function WorkPlan(props) {
    const [workPlan, setWorkPlan] = useState({})
    const themes = useContext(ThemeContext)

    useEffect(() => {
        if (workPlan.id !== undefined)
            props.refresh()
        else
            fetchEntry({
                pk: props.query.id,
                suffix: 'work_plan'
            }).then(res => setWorkPlan(res))
    }, [props.query])

    return (
        <>
            <Head>
                <title>{workPlan?.object}</title>
                <link rel='icon' href={'/LOGO.png'} type='image/x-icon'/>
            </Head>
            <div style={{
                padding: '0 32px', background: themes.themes.background1
            }}>
                <Breadcrumbs divider={'-'} justify={'start'}>
                    <button className={styles.button}
                            onClick={() => props.redirect('/sap?page=index')}>
                        Processos
                    </button>

                    <button className={styles.button}
                            onClick={() => props.redirect('/sap?page=ted&id=' + workPlan?.ted?.id)}>
                        {workPlan?.ted?.number} (Instrumento de celebração)
                    </button>
                    <button className={styles.button}
                            onClick={() => props.redirect('/sap?page=project&id=' + workPlan?.project?.id)}>
                        {workPlan?.project?.name} (Projeto)
                    </button>
                    <button className={styles.button} disabled={true}>
                        {workPlan?.object}
                    </button>
                </Breadcrumbs>
            </div>
            <div className={shared.header}
                 style={{padding: '16px 48px', borderBottom: themes.themes.border0 + ' 1px solid'}}>
                {workPlan?.object}
                <div className={shared.typeLabel}>
                    <CategoryRounded style={{fontSize: '1.15rem'}}/> Plano de trabalho
                </div>
            </div>

            <VerticalTabs
                classes={[
                    {
                        buttons: [
                            {
                                label: 'Dados',
                                children: (
                                    <div style={{padding: '16px 10%'}}>
                                        <WorkPlanForm data={workPlan}/>
                                    </div>
                                )
                            }
                        ]
                    },
                    {
                        label: 'Informações adicionais',
                        buttons: [
                            {
                                label: 'Status',
                                children: (
                                    <div style={{padding: '16px 10%'}}>
                                        <StatusList workPlan={workPlan}/>
                                    </div>
                                )
                            },
                            {
                                label: 'Metas',
                                children: (
                                    <div style={{padding: '16px 10%'}}>
                                        <GoalList workPlan={workPlan}/>
                                    </div>
                                )
                            },
                            {
                                label: 'Apostilamentos',
                                children: (
                                    <div style={{padding: '16px 10%'}}>
                                        <WorkPlanList workPlan={workPlan} redirect={props.redirect}/>
                                    </div>
                                )
                            }
                        ]
                    },
                    {
                        label: 'Acesso rápido',
                        buttons: [
                            {
                                label: 'Etapas', children: (
                                    <div className={shared.contentWrapper}>
                                        <ActivityStageList workPlan={workPlan} redirect={props.redirect}/>
                                    </div>
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
                                        <ExecutionList workPlan={workPlan} redirect={props.redirect}/>
                                    </div>
                                )
                            }
                        ]
                    },
                ]}
            />
        </>
    )
}
WorkPlan.propTypes = {
    query: PropTypes.object,
    redirect: PropTypes.func
}