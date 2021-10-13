import React from 'react'
import Head from "next/head";
import IndexPT from "../locales/ProjectPT";
import styles from '../styles/Shared.module.css'
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
            <Tabs buttons={[
                {
                    label: 'Projetos',
                    children: (
                        <div className={styles.contentWrapper}>
                            <ProjectList redirect={id => props.redirect('/sap/?page=project&id=' + id, '/sap/?page=project&id=' + id, {})}/>
                        </div>
                    )
                },
                {
                    label: 'Instrumentos de celebração',
                    children: (
                        <div className={styles.contentWrapper}>
                            <TedList redirect={id => props.redirect('/sap/?page=ted&id=' + id, '/sap/?page=ted&id=' + id, {})}/>
                        </div>
                    )
                },
                {
                    label: 'Planos de trabalho',
                    children: (
                        <div className={styles.contentWrapper}>
                            <WorkPlanList redirect={id => props.redirect('/sap/?page=wp&id=' + id, '/sap/?page=wp&id=' + id, {})}/>
                        </div>
                    )
                },
                {
                    label: 'Fases / operações',
                    children: (
                        <div className={styles.contentWrapper}>
                            <OperationList redirect={id => props.redirect('/sap/?page=operation&id=' + id, '/sap/?page=operation&id=' + id, {})}/>
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