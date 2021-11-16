import React from 'react'
import Head from "next/head";
import IndexPT from "../locales/ProjectPT";
import shared from '../styles/Shared.module.css'
import PropTypes from 'prop-types'
import ProjectList from "../components/lists/ProjectList";
import TedList from "../components/lists/TedList";
import {Tab, Tabs} from "mfc-core";


export default function Index(props) {
    const lang = IndexPT
    return (
        <>
            <Head>
                <title>{lang.pageTitle}</title>
                <link rel='icon' href={'/LOGO.png'} type='image/x-icon'/>
            </Head>
            <Tabs className={shared.wrapper}>
                <Tab label={'Projetos / Atividades'} className={shared.tabWrapper} styles={{padding: 0}}>
                    <ProjectList redirect={query => props.redirect(query)}/>
                </Tab>
                <Tab label={'Instrumentos de celebração'} className={shared.tabWrapper} styles={{padding: 0}}>
                    <TedList redirect={query => props.redirect(query)}/>
                </Tab>
            </Tabs>
        </>
    )
}
Index.propTypes = {
    redirect: PropTypes.func
}