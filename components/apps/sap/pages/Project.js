import React, {useContext, useEffect, useState} from 'react'
import Head from "next/head";
import shared from '../styles/Shared.module.css'
import PropTypes from 'prop-types'
import VerticalTabs from "../../../core/navigation/tabs/VerticalTabs";
import WorkPlanList from "../components/lists/WorkPlanList";
import ProjectForm from "../components/forms/ProjectForm";

import RisksList from "../components/lists/RisksList";
import ProjectGoalList from "../components/lists/ProjectGoalList";
import {fetchEntry} from "../utils/requests/fetch";
import Breadcrumbs from "../../../core/navigation/breadcrumbs/Breadcrumbs";
import styles from "../../management/styles/Shared.module.css";
import ThemeContext from "../../../core/misc/theme/ThemeContext";
import {CategoryRounded} from "@material-ui/icons";


export default function Project(props) {
    const [project, setProject] = useState(undefined)

    useEffect(() => {
        fetchEntry({
            pk: props.query.id,
            suffix: 'project'
        }).then(res => setProject(res))
    }, [])
    const themes = useContext(ThemeContext)
    return (
        <>
            <Head>
                <title>{project?.name}</title>
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
                        {project?.name}
                    </button>
                </Breadcrumbs>
            </div>
            <div className={shared.header}
                 style={{padding: '16px 48px', borderBottom: themes.themes.border0 + ' 1px solid'}}>
                {project?.name}
                <div className={shared.typeLabel}>
                    <CategoryRounded style={{fontSize: '1.15rem'}}/> Projeto
                </div>
            </div>
            <VerticalTabs
                classes={[
                    {
                        buttons: [
                            {
                                label: 'Dados', children: (
                                    <div className={shared.contentWrapper} style={{paddingTop: '32px'}}>
                                        <ProjectForm data={project}/>
                                    </div>
                                )
                            }
                        ]
                    },
                    {
                        label: 'Informações adicionais',
                        buttons: [
                            {
                                label: 'Riscos',
                                children: (
                                    <div className={shared.contentWrapper}>
                                        <RisksList project={project}/>
                                    </div>
                                )
                            },
                            {
                                label: 'Marcos',
                                children: (
                                    <div className={shared.contentWrapper}>
                                        <ProjectGoalList project={project}/>
                                    </div>
                                )
                            }
                        ]
                    },
                    {
                        label: 'Acesso rápido',
                        buttons: [{
                            label: 'Planos de trabalho', children: (
                                <div className={shared.contentWrapper}>
                                    <WorkPlanList project={project} redirect={props.redirect}/>

                                </div>
                            )
                        }]
                    }]}
            />


        </>
    )
}
Project.propTypes = {
    query: PropTypes.object,
    redirect: PropTypes.func
}