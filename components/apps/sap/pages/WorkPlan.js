import React, {useEffect, useState} from 'react'
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
import Breadcrumbs from "../../../core/navigation/breadcrumbs/Breadcrumbs";
import {CategoryRounded} from "@material-ui/icons";
import StatusList from "../components/lists/StatusList";
import Button from "../../../core/inputs/button/Button";
import PermanentGoodsList from "../components/lists/PermanentGoodsList";

export default function WorkPlan(props) {
    const [workPlan, setWorkPlan] = useState({})

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
        <div className={shared.pageWrapper}>
            <Head>
                <title>{workPlan?.object}</title>
                <link rel='icon' href={'/LOGO.png'} type='image/x-icon'/>
            </Head>


            <Breadcrumbs divider={'-'} justify={'start'}>
                <Button variant={'minimal'}
                        onClick={() => props.redirect('/sap?page=index')}>
                    Processos
                </Button>

                <Button variant={'minimal'}
                        onClick={() => props.redirect('/sap?page=ted&id=' + workPlan?.ted?.id)}>
                    {workPlan?.ted?.number} (Instrumento de celebração)
                </Button>
                <Button variant={'minimal'}
                        onClick={() => props.redirect('/sap?page=project&id=' + workPlan.activity_project.id)}>
                    {workPlan.activity_project?.name} (Projeto)
                </Button>
                <Button highlight={true} variant={'minimal'}>
                    {workPlan?.object}
                </Button>
            </Breadcrumbs>

            <div className={shared.header}
                 style={{padding: '16px 24px'}}>
                {workPlan?.object}
                <div className={shared.typeLabel}>
                    <CategoryRounded style={{fontSize: '1.15rem'}}/> Plano de trabalho
                </div>
            </div>

            <div className={shared.pageContent}>
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
                                    label: 'Apostilamentos',
                                    children: (
                                        <div style={{padding: '16px 10%'}}>
                                            <WorkPlanList workPlan={workPlan} redirect={props.redirect}/>
                                        </div>
                                    )
                                },
                                {
                                    label: 'Bens permanentes',
                                    children: (
                                        <div style={{padding: '16px 10%'}}>
                                            <PermanentGoodsList workPlan={workPlan}/>
                                        </div>
                                    )
                                },
                            ]
                        },
                        {
                            label: 'Acesso rápido',
                            buttons: [
                                {
                                    label: 'Metas',
                                    children: (
                                        <div style={{padding: '16px 10%'}}>
                                            <GoalList workPlan={workPlan}/>
                                        </div>
                                    )
                                },
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
            </div>
        </div>
    )
}
WorkPlan.propTypes = {
    query: PropTypes.object,
    redirect: PropTypes.func
}