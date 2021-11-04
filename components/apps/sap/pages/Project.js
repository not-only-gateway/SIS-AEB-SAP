import React, {useEffect, useState} from 'react'
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
import {CategoryRounded} from "@material-ui/icons";
import Button from "../../../core/inputs/button/Button";
import ProjectTedList from "../components/lists/ProjectTedList";


export default function Project(props) {
    const [project, setProject] = useState(undefined)

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
                <Button
                    variant={'minimal'}
                    onClick={() => props.redirect('/sap?page=index')}>
                    Processos
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
                    classes={[
                        {
                            buttons: [
                                {
                                    label: 'Dados', children: (
                                        <div className={shared.contentWrapper}>
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
                            },
                                {
                                    label: 'Instrumentos de celebração relacionados', children: (
                                        <div className={shared.contentWrapper}>
                                            <ProjectTedList project={project} redirect={props.redirect}/>
                                        </div>
                                    )
                                }
                            ]
                        }]}
                />
            </div>


        </div>
    )
}
Project.propTypes = {
    query: PropTypes.object,
    redirect: PropTypes.func
}