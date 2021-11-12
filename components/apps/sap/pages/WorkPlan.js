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
import {fetchEntry} from "../utils/fetchData";
import Breadcrumbs from "../../../core/navigation/breadcrumbs/Breadcrumbs";
import {CategoryRounded, HomeRounded} from "@material-ui/icons";
import StatusList from "../components/lists/StatusList";
import Button from "../../../core/inputs/button/Button";
import PermanentGoodsList from "../components/lists/PermanentGoodsList";
import Tab from "../../../core/navigation/tabs/Tab";
import TedForm from "../components/forms/TedForm";
import {ToolTip} from "mfc-core";

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
                <Button variant={"minimal-horizontal"}
                        onClick={() => props.redirect('/sap?page=index')}
                        styles={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                    <HomeRounded style={{fontSize: '1.1rem'}}/> Início
                </Button>

                <Button variant={'minimal'}
                        onClick={() => props.redirect('/sap?page=ted&id=' + workPlan?.ted?.id)} className={shared.button}>
                    {workPlan?.ted?.number}
                    <ToolTip>
                        Instrumento de celebração
                    </ToolTip>
                </Button>
                <Button variant={'minimal'}
                        onClick={() => props.redirect('/sap?page=project&id=' + workPlan.activity_project.id)} className={shared.button}>
                    {workPlan.activity_project?.name}
                    <ToolTip>
                        Projeto
                    </ToolTip>
                </Button>
                <Button highlight={true} variant={'minimal'} className={shared.button}>
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
                    className={shared.wrapper}
                    styles={{display: 'flex', justifyContent: 'stretch', alignContent: 'unset', padding: '8px'}}
                >
                    <Tab label={'Dados'} className={shared.tabWrapper}>
                        <WorkPlanForm data={workPlan}/>
                    </Tab>
                    <Tab label={'Status'} group={'Informações adicionais'} className={shared.tabWrapper}>
                        <StatusList workPlan={workPlan}/>
                    </Tab>
                    <Tab label={'Apostilamentos'} group={'Informações adicionais'} className={shared.tabWrapper}>
                        <WorkPlanList workPlan={workPlan} redirect={props.redirect}/>
                    </Tab>
                    <Tab label={'Bens permanentes'} group={'Informações adicionais'} className={shared.tabWrapper}>
                        <PermanentGoodsList workPlan={workPlan}/>
                    </Tab>

                    <Tab label={'Metas'} group={'Acesso rápido'} className={shared.tabWrapper}>
                        <GoalList workPlan={workPlan}/>
                    </Tab>
                    <Tab label={'Etapas / Atividades'} group={'Acesso rápido'} className={shared.tabWrapper}>
                        <ActivityStageList workPlan={workPlan} redirect={props.redirect}/>
                    </Tab>
                    <Tab label={'Fases / operações'} group={'Acesso rápido'} className={shared.tabWrapper}>
                        <OperationList workPlan={workPlan} redirect={props.redirect}/>
                    </Tab>
                    <Tab label={'Execuções'} group={'Acesso rápido'} className={shared.tabWrapper}>
                        <ExecutionList workPlan={workPlan} redirect={props.redirect}/>
                    </Tab>
                </VerticalTabs>
            </div>
        </div>
    )
}
WorkPlan.propTypes = {
    query: PropTypes.object,
    redirect: PropTypes.func
}