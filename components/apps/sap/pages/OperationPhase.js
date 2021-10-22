import React, {useContext, useEffect, useState} from 'react'
import Head from "next/head";
import shared from '../styles/Shared.module.css'
import PropTypes from 'prop-types'
import VerticalTabs from "../../../core/navigation/tabs/VerticalTabs";
import ThemeContext from "../../../core/theme/ThemeContext";
import ActionList from "../components/lists/ActionList";
import FollowUpList from "../components/lists/FollowUpList";
import ExecutionList from "../components/lists/ExecutionList";
import PermanentGoodsList from "../components/lists/PermanentGoodsList";
import ResourceApplicationList from "../components/lists/ResourceApplicationList";
import NoteList from "../components/lists/NoteList";
import {fetchEntry} from "../utils/requests/fetch";
import Breadcrumbs from "../../../core/navigation/breadcrumbs/Breadcrumbs";
import styles from "../../management/styles/Shared.module.css";
import {CategoryRounded} from "@material-ui/icons";
import OperationForm from "../components/forms/OperationForm";
import ActionItemList from "../components/lists/ActionItemList";


export default function OperationPhase(props) {
    const [operation, setOperation] = useState({})

    const themes = useContext(ThemeContext)
    const fetchData =() => {
        fetchEntry({
            pk: props.query.id,
            suffix: 'operation_phase'
        }).then(res => setOperation(res))
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
            <div style={{
                padding: '0 32px', background: themes.themes.background1
            }}>
                <Breadcrumbs divider={'-'} justify={'start'}>
                    <button className={styles.button}
                            onClick={() => props.redirect('/sap?page=index')}>
                        Processos
                    </button>

                    <button className={styles.button} disabled={true}>
                        {operation?.phase}
                    </button>
                </Breadcrumbs>
            </div>
            <div className={shared.header}
                 style={{padding: '16px 48px', borderBottom: themes.themes.border0 + ' 1px solid'}}>
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