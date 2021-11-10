import React, {useEffect, useState} from 'react'
import Head from "next/head";
import shared from '../styles/Shared.module.css'
import PropTypes from 'prop-types'
import VerticalTabs from "../../../core/navigation/tabs/VerticalTabs";
import FollowUpList from "../components/lists/FollowUpList";
import ExecutionList from "../components/lists/ExecutionList";
import PermanentGoodsList from "../components/lists/PermanentGoodsList";
import ResourceApplicationList from "../components/lists/ResourceApplicationList";
import NoteList from "../components/lists/NoteList";
import {fetchEntry} from "../utils/fetchData";
import Breadcrumbs from "../../../core/navigation/breadcrumbs/Breadcrumbs";
import {CategoryRounded, HomeRounded} from "@material-ui/icons";
import OperationForm from "../components/forms/OperationForm";
import ActionItemList from "../components/lists/ActionItemList";
import Button from "../../../core/inputs/button/Button";
import Tab from "../../../core/navigation/tabs/Tab";
import {ToolTip} from "mfc-core";


export default function OperationPhase(props) {
    const [operation, setOperation] = useState({})

    const fetchData = () => {
        fetchEntry({
            pk: props.query.id,
            suffix: 'operation_phase'
        }).then(res => {
            fetchEntry({
                pk: res.activity_stage?.id,
                suffix: 'activity_stage'
            }).then(activity => {
                fetchEntry({
                    pk: activity.goal?.id,
                    suffix: 'work_plan_goal'
                }).then(goal => {
                    fetchEntry({
                        pk: goal.work_plan.id,
                        suffix: 'work_plan'
                    }).then(wp => {
                        setOperation({
                            ...res,
                            activity_stage: activity,
                            goal: goal,
                            work_plan: wp
                        })
                    })
                })
            })
        })
    }
    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className={shared.pageWrapper}>
            <Head>
                <title>{operation?.phase}</title>
                <link rel='icon' href={'/LOGO.png'} type='image/x-icon'/>
            </Head>

            <Breadcrumbs justify={'start'}>
                <Button variant={"minimal-horizontal"}
                        onClick={() => props.redirect('/sap?page=index')}
                        styles={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                    <HomeRounded style={{fontSize: '1.1rem'}}/> Início
                </Button>
                <Button variant={"minimal"}
                        onClick={() => props.redirect('/sap?page=project&id=' + operation.work_plan?.activity_project.id)}
                        className={shared.button}>
                    {operation.work_plan?.activity_project.name}
                    <ToolTip>
                        Projeto / Atividade
                    </ToolTip>
                </Button>
                <Button variant={"minimal"}
                        onClick={() => props.redirect('/sap?page=ted&id=' + operation.work_plan?.ted.id)}
                        className={shared.button}>
                    {operation.work_plan?.ted.number}
                    <ToolTip>
                        Instrumento de celebração
                    </ToolTip>
                </Button>
                <Button variant={"minimal"}
                        onClick={() => props.redirect('/sap?page=wp&id=' + operation.work_plan?.id)}
                        className={shared.button}>
                    {operation.work_plan?.object}
                    <ToolTip>
                        Plano de trabalho
                    </ToolTip>

                </Button>

                <Button variant={"minimal"}
                        onClick={() => props.redirect('/sap?page=wp&id=' + operation.work_plan?.id)}
                        className={shared.button}>
                    {operation.goal?.goal_number}
                    <ToolTip>
                        Meta
                    </ToolTip>
                </Button>
                <Button variant={"minimal"}
                        onClick={() => props.redirect('/sap?page=wp&id=' + operation.work_plan?.id)}
                        className={shared.button}>
                    {operation.activity_stage?.stage}
                    <ToolTip>
                        Etapa
                    </ToolTip>
                </Button>
                <Button highlight={true} variant={'minimal'} className={shared.button}>
                    {operation.phase}
                </Button>
            </Breadcrumbs>

            <div className={shared.header}
                 style={{padding: '16px 24px'}}>
                {operation?.phase}
                <div className={shared.typeLabel}>
                    <CategoryRounded style={{fontSize: '1.15rem'}}/> Fase / operação
                </div>
            </div>
            <div className={shared.pageContent}>
                <VerticalTabs
                    className={shared.wrapper}
                    styles={{display: 'flex', justifyContent: 'stretch', alignContent: 'unset'}}
                >
                    <Tab label={'Dados'} className={shared.tabWrapper}>
                        <OperationForm update={() => fetchData()} data={operation} create={false}/>
                    </Tab>
                    <Tab label={'Items de Ação'} group={'Informações adicionais'} className={shared.tabWrapper}>
                        <ActionItemList operation={operation}/>
                    </Tab>
                    <Tab label={'Marcos do acompanhamento'} group={'Informações adicionais'}
                         className={shared.tabWrapper}>
                        <FollowUpList operation={operation}/>
                    </Tab>
                    <Tab label={'Execuções'} group={'Informações adicionais'} className={shared.tabWrapper}>
                        <ExecutionList operation={operation}/>
                    </Tab>
                    <Tab label={'Bens permanentes'} group={'Informações adicionais'} className={shared.tabWrapper}>
                        <PermanentGoodsList operation={operation}/>
                    </Tab>
                    <Tab label={'Aplicação dos recursos'} group={'Informações adicionais'}
                         className={shared.tabWrapper}>
                        <ResourceApplicationList operation={operation}/>
                    </Tab>
                    <Tab label={'Notas de empenho'} group={'Informações adicionais'} className={shared.tabWrapper}>
                        <NoteList operation={operation}/>
                    </Tab>
                </VerticalTabs>
            </div>
        </div>
    )
}
OperationPhase.propTypes = {
    query: PropTypes.object,
    redirect: PropTypes.func
}