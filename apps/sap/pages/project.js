import React, {useEffect, useState} from 'react'
import {useRouter} from "next/router";
import Head from "next/head";
import ProjectPT from "../packages/locales/ProjectPT";
import styles from "../styles/Project.module.css";
import Tabs from "../components/shared/misc/tabs/Tabs";
import ProjectRequests from "../utils/fetch/ProjectRequests";
import Objectives from "../components/project/Objectives";
import Risks from "../components/project/Risks";
import Link from 'next/link'
import ProjectForm from "../components/index/ProjectForm";
import handleObjectChange from "../utils/shared/HandleObjectChange";
import ProjectTeds from "../components/project/ProjectTeds";

export default function project(props) {
    const lang = ProjectPT
    const [project, setProject] = useState(undefined)
    const [openTab, setOpenTab] = useState(0)
    const router = useRouter()
    useEffect(() => {
        if (router.isReady) {
            ProjectRequests.fetchProject(router.query.id).then(res => {
                if (res !== null)
                    setProject(res)
            })
        }
    }, [router.isReady])

    if (project !== undefined)
        return (
            <div style={{width: '85%', margin: 'auto'}}>
                <Head>
                    <title>{project.name}</title>
                    <link rel='icon' href={'/LOGO.png'} type='image/x-icon'/>
                </Head>

                <div className={styles.pageContainer}>
                    <div className={styles.header}>
                        <div className={styles.info} style={{color: '#555555', fontSize: '1.2rem'}}>
                            <Link href={'/'}>
                                <button className={styles.headerButton}>
                                    {lang.projects}
                                </button>
                            </Link>
                            /
                            <div style={{

                                color: '#333333',
                                textTransform: 'capitalize'
                            }}>
                                {project.name}
                            </div>


                        </div>

                    </div>

                    <div className={styles.content}>

                        <Tabs
                            buttons={[
                                {
                                    key: 0,
                                    value: lang.project,
                                    content: (
                                        <ProjectForm
                                            returnToMain={() => {
                                                null
                                            }}
                                            handleChange={event => handleObjectChange({
                                                event: event,
                                                setData: setProject
                                            })} id={project.id}
                                            create={false}
                                            data={project}
                                        />
                                    )
                                },

                                {
                                    key: 1,
                                    value: lang.teds,
                                    content: <ProjectTeds project={project}/>
                                },
                                {
                                    key: 2,
                                    value: lang.objectives,
                                    content: <Objectives project={project}/>
                                },
                                {
                                    key: 3,
                                    value: lang.risks,
                                    content: <Risks project={project}/>
                                }
                            ]}
                            setOpenTab={setOpenTab}
                            openTab={openTab}
                        />
                    </div>
                </div>
            </div>
        )
    else
        return null
}
