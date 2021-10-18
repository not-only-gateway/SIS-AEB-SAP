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


export default function OperationPhase(props) {
    const [operation, setOperation] = useState({})
    const theme = useContext(ThemeContext)

    useEffect(() => {
        fetchEntry({
            pk: props.query.id,
            suffix: 'operation_phase'
        }).then(res => setOperation(res))
    }, [])

    return (
        <>
            <Head>
                <title>{operation?.phase}</title>
                <link rel='icon' href={'/LOGO.png'} type='image/x-icon'/>
            </Head>

            <div className={shared.header} style={{padding: '16px', borderBottom: theme.themes.border0 + ' 1px solid'}}>
                Nome operacao
            </div>

            <VerticalTabs
                classes={[
                    {
                        buttons: [
                            {label: 'Dados', children: null}
                        ]
                    },
                    {
                        label: 'Informações adicionais',
                        buttons: [
                            {label: 'Items de Ação', children: <ActionList/>},
                            {label: 'Marcos do acompanhamento', children: <FollowUpList/>},
                            {label: 'Execuções', children: <ExecutionList/>},
                            {label: 'Bens permanentes', children: <PermanentGoodsList/>},
                            {label: 'Aplicação dos recursos', children: <ResourceApplicationList/>},
                            {label: 'Notas de empenho', children: <NoteList/>},
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