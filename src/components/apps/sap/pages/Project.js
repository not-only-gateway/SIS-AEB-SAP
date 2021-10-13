import React, {useEffect, useState} from 'react'
import Head from "next/head";
import shared from '../styles/Shared.module.css'
import PropTypes from 'prop-types'
import VerticalTabs from "../../../core/navigation/tabs/VerticalTabs";
import Tabs from "../../../core/navigation/tabs/Tabs";
import WorkPlanList from "../components/lists/WorkPlanList";
import ProjectForm from "../components/forms/ProjectForm";
import ProjectRequests from "../utils/requests/ProjectRequests";
import RisksList from "../components/lists/RisksList";
import ProjectGoalList from "../components/lists/ProjectGoalList";


export default function Project(props) {
    const [project, setProject] = useState(undefined)

    useEffect(() => {
        ProjectRequests.fetchProject(props.id).then(res => {
            if (res !== null)
                setProject(res)
        })
    }, [])

    return (
        <>
            <Head>
                <title>{project?.name}</title>
                <link rel='icon' href={'/LOGO.png'} type='image/x-icon'/>
            </Head>
            <Tabs buttons={[
                {
                    label: 'Projeto', children: (
                        <VerticalTabs
                            classes={[
                                {
                                    buttons: [
                                        {label: 'Dados', children: <ProjectForm/>}
                                    ]
                                },
                                {
                                    label: 'Informações adicionais',
                                    buttons: [
                                        {label: 'Riscos', children: <RisksList project={project}/>},
                                        {label: 'Marcos', children: <ProjectGoalList project={project}/>}
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
                <div className={shared.header} style={{paddingLeft: '16px'}}>
                    {project?.name}
                </div>
            </Tabs>

        </>
    )
}
Project.propTypes = {
    routerQuery: PropTypes.object,
    redirect: PropTypes.func
}