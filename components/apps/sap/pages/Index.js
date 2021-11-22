import React, {useEffect, useState} from 'react'
import Head from "next/head";
import IndexPT from "../locales/ProjectPT";
import shared from '../styles/Shared.module.css'
import PropTypes from 'prop-types'
import ProjectList from "../components/lists/ProjectList";
import TedList from "../components/lists/TedList";
import Tabs from "../../../core/navigation/tabs/Tabs";
import Tab from "../../../core/navigation/tabs/Tab";


export default function Index(props) {
    const [open, setOpen] = useState(0)

    useEffect(() => {
        const t = props.query.tab
        setOpen(t !== undefined && !isNaN(parseInt(t)) ? parseInt(t) : 0)
    }, [props.query])

    return (
        <>
        <Head>
            <title>Início</title>
            <link rel='icon' href={'/light-small.png'} type='image/x-icon'/>
        </Head>
        <Tabs
            open={open}
            setOpen={index => {
                const url = {pathname: props.pathname, query: {...props.query, tab: index}}
                props.redirect(url, url, {shallow: false})
            }} className={shared.wrapper}>
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