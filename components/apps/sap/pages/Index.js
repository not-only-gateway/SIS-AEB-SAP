import React from 'react'
import Head from "next/head";
import IndexPT from "../locales/ProjectPT";
import styles from '../styles/Shared.module.css'
import shared from '../styles/Shared.module.css'
import PropTypes from 'prop-types'
import Tabs from "../../../core/navigation/tabs/Tabs";
import ProjectList from "../components/lists/ProjectList";
import TedList from "../components/lists/TedList";
import WorkPlanList from "../components/lists/WorkPlanList";
import OperationList from "../components/lists/OperationList";

export default function Index(props) {
    const lang = IndexPT
    return (
        <>
            <Head>
                <title>{lang.pageTitle}</title>
                <link rel='icon' href={'/LOGO.png'} type='image/x-icon'/>
            </Head>
            <Tabs
                className={shared.wrapper}
                buttons={[
                    {
                        label: 'Projetos / Atividades',
                        children: (
                            <div className={styles.contentWrapper}>
                                <ProjectList redirect={query => props.redirect(query)}/>
                            </div>
                        )
                    },
                    {
                        label: 'Instrumentos de celebração',
                        children: (
                            <div className={styles.contentWrapper}>
                                <TedList redirect={query => props.redirect(query)}/>
                            </div>
                        )
                    },
                    {
                        label: 'Planos de trabalho',
                        children: (
                            <div className={styles.contentWrapper}>
                                <WorkPlanList redirect={query => props.redirect(query)}/>
                            </div>
                        )
                    },
                    {
                        label: 'Fases / operações',
                        children: (
                            <div className={styles.contentWrapper}>
                                <OperationList redirect={query => props.redirect(query)}/>
                            </div>
                        )
                    }
                ]}/>
        </>
    )
}
Index.propTypes = {
    redirect: PropTypes.func
}