import React, {useEffect, useState} from 'react'
import Head from "next/head";
import shared from '../styles/Shared.module.css'
import PropTypes from 'prop-types'
import VerticalTabs from "../../../core/navigation/tabs/VerticalTabs";
import WorkPlanList from "../components/lists/WorkPlanList";
import TedForm from "../components/forms/TedForm";
import TedList from "../components/lists/TedList";
import {fetchEntry} from "../utils/fetchData";
import Breadcrumbs from "../../../core/navigation/breadcrumbs/Breadcrumbs";
import {CategoryRounded, HomeRounded} from "@material-ui/icons";
import Link from 'next/link'
import Button from "../../../core/inputs/button/Button";
import ProjectTedList from "../components/lists/ProjectTedList";
import Tab from "../../../core/navigation/tabs/Tab";

export default function Ted(props) {
    const [ted, setTed] = useState({})

    useEffect(() => {
        if (ted.id !== undefined)
            props.refresh()
        else
            fetchEntry({
                pk: props.query.id,
                suffix: 'ted'
            }).then(res => setTed(res ? res : {}))
    }, [props.query])


    return (
        <div className={shared.pageWrapper}>
            <Head>
                <title>{ted?.number}</title>
                <link rel='icon' href={'/LOGO.png'} type='image/x-icon'/>
            </Head>

            {/*<div style={{height: 'fit-content', overflow: 'hidden'}}>*/}
            <Breadcrumbs divider={'-'} justify={'start'}>
                <Button variant={"minimal-horizontal"}
                        onClick={() => props.redirect('/sap?page=index')}
                        styles={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                    <HomeRounded style={{fontSize: '1.1rem'}}/> Início
                </Button>
                {!ted.ted ? null :
                    <Button variant={"minimal"}
                            onClick={() => props.redirect('/sap?page=ted&id=' + ted.ted.id)}>
                        {ted.ted.number} (Instrumento de celebração)
                    </Button>
                }
                <Button variant={'minimal'} highlight={true}>
                    {ted?.number}
                </Button>
            </Breadcrumbs>

            <div className={shared.header}
                 style={{padding: '16px 24px'}}>
                {ted?.number}
                <div className={shared.typeLabel}>
                    <CategoryRounded style={{fontSize: '1.15rem'}}/> Instrumento de celebração
                </div>
            </div>
            {/*</div>*/}
            <div className={shared.pageContent}>
                <VerticalTabs
                    className={shared.wrapper}
                    styles={{display: 'flex', justifyContent: 'stretch', alignContent: 'unset'}}
                >
                    <Tab label={'Dados'} className={shared.tabWrapper}>
                        <TedForm data={ted}/>
                    </Tab>
                    <Tab label={'Termos aditivos'} group={'Informações adicionais'} className={shared.tabWrapper}>
                        <TedList ted={ted} redirect={props.redirect}/>
                    </Tab>
                    <Tab label={'Acesso rápido'} group={'Informações adicionais'} className={shared.tabWrapper}>
                        <WorkPlanList ted={ted} redirect={props.redirect}/>
                    </Tab>
                    <Tab label={'Projetos / Atividades relacionados'} group={'Informações adicionais'}
                         className={shared.tabWrapper}>
                        <ProjectTedList ted={ted} redirect={props.redirect}/>
                    </Tab>
                </VerticalTabs>
            </div>
        </div>
    )
}
Ted.propTypes = {
    refresh: PropTypes.func,
    query: PropTypes.object,
    redirect: PropTypes.func
}