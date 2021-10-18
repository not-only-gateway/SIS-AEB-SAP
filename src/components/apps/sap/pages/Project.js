import React, {useContext, useEffect, useState} from 'react'
import Head from "next/head";
import shared from '../styles/Shared.module.css'
import PropTypes from 'prop-types'
import VerticalTabs from "../../../core/navigation/tabs/VerticalTabs";
import Tabs from "../../../core/navigation/tabs/Tabs";
import WorkPlanList from "../components/lists/WorkPlanList";
import ProjectForm from "../components/forms/ProjectForm";

import RisksList from "../components/lists/RisksList";
import ProjectGoalList from "../components/lists/ProjectGoalList";
import {fetchEntry} from "../utils/requests/fetch";
import {CategoryRounded} from "@material-ui/icons";
import Breadcrumbs from "../../../core/navigation/breadcrumbs/Breadcrumbs";
import styles from "../../management/styles/Shared.module.css";
import ThemeContext from "../../../core/theme/ThemeContext";


export default function Project(props) {
    const [project, setProject] = useState(undefined)
    const themes = useContext(ThemeContext)
    useEffect(() => {
        fetchEntry({
            pk: props.query.id,
            suffix: 'project'
        }).then(res => setProject(res))
    }, [])

    return (
        <>
            <Head>
                <title>{project?.name}</title>
                <link rel='icon' href={'/LOGO.png'} type='image/x-icon'/>
            </Head>
            <div style={{
                padding: '0 16px', background: themes.themes.background1
            }}>
                <Breadcrumbs divider={'-'} justify={'start'}>
                    <button className={styles.button}
                            onClick={() => props.redirect('/management?page=services', '/management?page=services')}>
                        Projetos / atividades
                    </button>
                    <button className={styles.button} disabled={true}>
                        {project?.name}
                    </button>
                </Breadcrumbs>
            </div>
            <Tabs buttons={[
                {
                    label: 'Projeto', children: (
                        <VerticalTabs
                            classes={[
                                {
                                    buttons: [
                                        {
                                            label: 'Dados', children: (
                                                <div className={shared.contentWrapper} style={{paddingTop: '32px'}}>
                                                    <ProjectForm data={project} />
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
                                }]}
                        />
                    )
                },
                {
                    label: 'Planos de trabalho', children: (
                        <div className={shared.contentWrapper}>
                            <WorkPlanList project={project}/>

                        </div>
                    )
                }
            ]}>
                <div className={shared.header} style={{paddingLeft: '32px'}}>
                    {project?.name}
                    <div className={shared.typeLabel}>
                        <CategoryRounded style={{fontSize: '1.15rem'}}/> Projeto
                    </div>
                </div>
            </Tabs>

        </>
    )
}
Project.propTypes = {
    query: PropTypes.object,
    redirect: PropTypes.func
}