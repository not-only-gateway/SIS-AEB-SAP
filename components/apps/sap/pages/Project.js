import React, {useEffect, useState} from 'react'
import Head from "next/head";
import shared from '../styles/Shared.module.css'
import PropTypes from 'prop-types'
import VerticalTabs from "../../../core/navigation/tabs/VerticalTabs";
import WorkPlanList from "../components/lists/WorkPlanList";
import ProjectForm from "../components/forms/ProjectForm";

import RisksList from "../components/lists/RisksList";
import ProjectGoalList from "../components/lists/ProjectGoalList";
import {fetchEntry} from "../utils/fetchData";
import Breadcrumbs from "../../../core/navigation/breadcrumbs/Breadcrumbs";
import {CategoryRounded, HomeRounded} from "@material-ui/icons";
import Button from "../../../core/inputs/button/Button";
import ProjectTedList from "../components/lists/ProjectTedList";
import Tab from "../../../core/navigation/tabs/Tab";
import TedForm from "../components/forms/TedForm";
import TedList from "../components/lists/TedList";


export default function Project(props) {
    const [project, setProject] = useState({})

    useEffect(() => {
        fetchEntry({
            pk: props.query.id,
            suffix: 'project'
        }).then(res => setProject(res))
    }, [])

    return (
        <div className={shared.pageWrapper}>
            <Head>
                <title>{project?.name}</title>
                <link rel='icon' href={'/LOGO.png'} type='image/x-icon'/>
            </Head>

            <Breadcrumbs justify={'start'}>
                <Button variant={"minimal-horizontal"}
                        onClick={() => props.redirect('/sap?page=index')}
                        styles={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                    <HomeRounded style={{fontSize: '1.1rem'}}/> Início
                </Button>

                <Button variant={'minimal'} highlight={true}>
                    {project?.name}
                </Button>
            </Breadcrumbs>

            <div className={shared.header}
                 style={{padding: '16px 24px'}}>
                {project?.name}
                <div className={shared.typeLabel}>
                    <CategoryRounded style={{fontSize: '1.15rem'}}/> Projeto / Atividade
                </div>
            </div>
            <div className={shared.pageContent}>
                <VerticalTabs
                    className={shared.wrapper}
                    styles={{display: 'flex', justifyContent: 'stretch', alignContent: 'unset', padding: '8px'}}
                >
                    <Tab label={'Dados'} className={shared.tabWrapper}>
                        <ProjectForm data={project}/>
                    </Tab>
                    <Tab label={'Riscos'} group={'Informações adicionais'} className={shared.tabWrapper}>
                        <RisksList project={project}/>
                    </Tab>
                    <Tab label={'Marcos'} group={'Informações adicionais'} className={shared.tabWrapper}>
                        <ProjectGoalList project={project}/>
                    </Tab>

                    <Tab label={'Instrumentos de celebração relacionados'} group={'Acesso rápido'}
                         className={shared.tabWrapper}>
                        <ProjectTedList project={project} redirect={props.redirect}/>
                    </Tab>
                    <Tab label={'Planos de trabalho'} group={'Acesso rápido'} className={shared.tabWrapper}>
                        <WorkPlanList project={project} redirect={props.redirect}/>
                    </Tab>

                </VerticalTabs>
            </div>


        </div>
    )
}
Project.propTypes = {
    query: PropTypes.object,
    redirect: PropTypes.func
}