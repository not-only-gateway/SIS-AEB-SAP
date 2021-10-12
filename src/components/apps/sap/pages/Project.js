import React, {useState} from 'react'
import Head from "next/head";
import shared from '../styles/Shared.module.css'
import PropTypes from 'prop-types'
import VerticalTabs from "../../../core/navigation/tabs/VerticalTabs";
import Tabs from "../../../core/navigation/tabs/Tabs";
import WorkPlanList from "../components/lists/WorkPlanList";
import ProjectForm from "../components/forms/ProjectForm";


export default function Project(props) {
    const [project, setProject] = useState(undefined)
    // const [currentStructure, setCurrentStructure] = useState({
    //     ted: null
    // })
    // useEffect(() => {
    //     ProjectRequests.fetchProject(props.id).then(res => {
    //         if (res !== null)
    //             setProject(res)
    //     })
    // }, [])

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
                                        {label: 'Riscos', children: null},
                                        {label: 'Marcos', children: null}
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
                    Nome projeto
                </div>
            </Tabs>

        </>
    )
}
Project.propTypes = {
    routerQuery: PropTypes.object,
    redirect: PropTypes.func
}