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
import Tab from "../../../core/navigation/tabs/Tab";

export default function Index(props) {
    const lang = IndexPT
    return (
        <>
            <Head>
                <title>{lang.pageTitle}</title>
                <link rel='icon' href={'/LOGO.png'} type='image/x-icon'/>
            </Head>
            <Tabs className={shared.wrapper}>
                <Tab label={'Projetos / Atividades'} className={shared.tabWrapper}>
                    <ProjectList redirect={query => props.redirect(query)}/>
                </Tab>
                <Tab label={'Instrumentos de celebração'} className={shared.tabWrapper}>
                    <TedList redirect={query => props.redirect(query)}/>
                </Tab>
                <Tab label={'Planos de trabalho'} className={shared.tabWrapper}>
                    <WorkPlanList redirect={query => props.redirect(query)}/>
                </Tab>
                <Tab label={'Fases / operações'} className={shared.tabWrapper}>
                    <OperationList redirect={query => props.redirect(query)}/>
                </Tab>
            </Tabs>
        </>
    )
}
Index.propTypes = {
    redirect: PropTypes.func
}