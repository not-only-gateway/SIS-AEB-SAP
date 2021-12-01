import React, {useEffect, useState} from 'react'
import Head from "next/head";
import shared from '../styles/Shared.module.css'
import PropTypes from 'prop-types'

import FollowUpList from "../components/lists/FollowUpList";
import ExecutionList from "../components/lists/ExecutionList";
import ResourceApplicationList from "../components/lists/ResourceApplicationList";
import NoteList from "../components/lists/NoteList";
import {fetchEntry} from "../utils/fetchData";

import {CategoryRounded, HomeRounded} from "@material-ui/icons";
import OperationForm from "../components/forms/OperationForm";
import ActionItemList from "../components/lists/ActionItemList";


import {Breadcrumbs, Button, Tab, ToolTip, VerticalTabs} from 'mfc-core'

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
    const [open, setOpen] = useState(0)

    useEffect(() => {
        const t = props.query.tab
        setOpen(t !== undefined && !isNaN(parseInt(t)) ? parseInt(t) : 0)
    }, [props.query])

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
                        onClick={() => props.redirect('/sap?page=wp&tab=4&id=' + operation.work_plan?.id)}
                        className={shared.button}>
                    {operation.goal?.goal_number}
                    <ToolTip>
                        Meta
                    </ToolTip>
                </Button>
                <Button variant={"minimal"}
                        onClick={() => props.redirect('/sap?page=wp&tab=5&id=' + operation.work_plan?.id)}
                        className={shared.button}>
                    {operation.activity_stage?.stage}
                    <ToolTip>
                        Etapa / Atividades
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
                    open={open}
                    setOpen={index => {
                        const url = {pathname: props.pathname, query: {...props.query, tab: index}}
                        props.redirect(url, url, {shallow: true})
                    }}
                    className={shared.wrapper}
                    styles={{display: 'flex', justifyContent: 'stretch', alignContent: 'unset', padding: '8px'}}
                >
                    <Tab label={'Dados'} className={shared.tabWrapper} styles={{padding: '0 10%'}}>
                        <OperationForm update={() => fetchData()} data={operation} create={false}/>
                    </Tab>
                    <Tab label={'Items de Ação'} group={'Informações adicionais'} className={shared.tabWrapper} styles={{padding: '0 10%'}}>
                        <ActionItemList operation={operation}/>
                    </Tab>
                    <Tab label={'Marcos do acompanhamento'} group={'Informações adicionais'}
                         className={shared.tabWrapper} styles={{padding: '0 10%'}}>
                        <FollowUpList operation={operation}/>
                    </Tab>
                    <Tab label={'Execuções'} group={'Informações adicionais'} className={shared.tabWrapper} styles={{padding: '0 10%'}}>
                        <ExecutionList operation={operation}/>
                    </Tab>
                    <Tab label={'Aplicação dos recursos'} group={'Informações adicionais'}
                         className={shared.tabWrapper} styles={{padding: '0 10%'}}>
                        <ResourceApplicationList operation={operation}/>
                    </Tab>
                    <Tab label={'Notas de empenho'} group={'Informações adicionais'} className={shared.tabWrapper} styles={{padding: '0 10%'}}>
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