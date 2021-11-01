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
import {fetchEntry} from "../utils/requests/fetch";
import Breadcrumbs from "../../../core/navigation/breadcrumbs/Breadcrumbs";
import {CategoryRounded} from "@material-ui/icons";
import OperationForm from "../components/forms/OperationForm";
import ActionItemList from "../components/lists/ActionItemList";
import Button from "../../../core/inputs/button/Button";


export default function OperationPhase(props) {
    const [operation, setOperation] = useState({})

    const fetchData = () => {
        fetchEntry({
            pk: props.query.id,
            suffix: 'operation_phase'
        }).then(res => {
            fetchEntry({
                pk: res.activity_stage.id,
                suffix: 'activity_stage'
            }).then(activity => {
                fetchEntry({
                    pk: activity.goal.id,
                    suffix: 'work_plan_goal'
                }).then(goal => {
                    setOperation({
                        ...res,
                        activity_stage: activity,
                        goal: goal,
                        work_plan: goal.work_plan
                    })
                })
            })
        })
    }
    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <Head>
                <title>{operation?.phase}</title>
                <link rel='icon' href={'/LOGO.png'} type='image/x-icon'/>
            </Head>

                <Breadcrumbs divider={'-'} justify={'start'}>
                    <Button variant={"minimal"}
                            onClick={() => props.redirect('/sap?page=index')}>
                        Processos
                    </Button>
                    <Button variant={"minimal"}
                            onClick={() => props.redirect('/sap?page=wp&id='+operation.work_plan?.id)}>
                        {operation.work_plan?.object} (Plano de trabalho)
                    </Button>
                    <Button variant={"minimal"}
                            onClick={() => props.redirect('/sap?page=wp&id='+operation.work_plan?.id)}>
                        {operation.goal?.goal_number} (Meta)
                    </Button>
                    <Button variant={"minimal"}
                            onClick={() => props.redirect('/sap?page=wp&id='+operation.work_plan?.id)}>
                        {operation.activity_stage?.stage} (Etapa)
                    </Button>
                    <Button highlight={true} variant={'minimal'}>
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

            <VerticalTabs
                classes={[
                    {
                        buttons: [
                            {
                                label: 'Dados',
                                children: (
                                    <div style={{padding: '16px 10%'}}>
                                        <OperationForm update={() => fetchData()} data={operation} create={false}/>
                                    </div>
                                )
                            }
                        ]
                    },
                    {
                        label: 'Informações adicionais',
                        buttons: [
                            {
                                label: 'Items de Ação',
                                children: (
                                    <div style={{padding: '0 10%'}}>
                                        <ActionItemList operation={operation}/>
                                    </div>
                                )
                            },
                            {
                                label: 'Marcos do acompanhamento',
                                children: (
                                    <div style={{padding: '0 10%'}}>
                                        <FollowUpList operation={operation}/>
                                    </div>
                                )
                            },
                            {
                                label: 'Execuções',
                                children: (
                                    <div style={{padding: '0 10%'}}>
                                        <ExecutionList operation={operation}/>
                                    </div>
                                )
                            },
                            {
                                label: 'Bens permanentes',
                                children: (
                                    <div style={{padding: '0 10%'}}>
                                        <PermanentGoodsList operation={operation}/>
                                    </div>
                                )
                            },
                            {
                                label: 'Aplicação dos recursos',
                                children: (
                                    <div style={{padding: '0 10%'}}>
                                        <ResourceApplicationList operation={operation}/>
                                    </div>
                                )
                            },
                            {
                                label: 'Notas de empenho',
                                children: (
                                    <div style={{padding: '0 10%'}}>
                                        <NoteList operation={operation}/>
                                    </div>
                                )
                            },
                        ]
                    }]}
            />

        </>
    )
}
OperationPhase.propTypes = {
    query: PropTypes.object,
    redirect: PropTypes.func
}