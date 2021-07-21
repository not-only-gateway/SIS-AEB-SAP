import React, {useEffect, useState} from 'react'
import {useRouter} from "next/router";
import Head from "next/head";
import ProjectPT from "../packages/locales/ProjectPT";
import styles from "../styles/Project.module.css";
import Tabs from "../components/shared/misc/tabs/Tabs";
import ProjectRequests from "../utils/fetch/ProjectRequests";
import {EditRounded, ListRounded} from "@material-ui/icons";
import Objectives from "../components/project/Objectives";
import Risks from "../components/project/Risks";

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
            <>
                <Head>
                    <title>{lang.title}</title>
                    <link rel='icon' href={'/LOGO.png'} type='image/x-icon'/>
                </Head>

                <div className={styles.pageContainer}>
                    <div className={styles.header}>
                        <div className={styles.info}>
                            <div style={{
                                fontSize: '1.6rem',
                                color: '#333333',
                                textTransform: 'capitalize'
                            }}>
                                {project.name}
                            </div>
                            <div style={{
                                fontSize: '.9rem',
                                color: '#555555'
                            }}>
                                {project.description}
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
                                        <div style={{display: 'grid', gap: '8px'}}>
                                            <button className={styles.buttonContainer} onClick={() => setOpenTab(0)}>
                                                <EditRounded/>
                                                {lang.edit}
                                            </button>
                                            <button className={styles.buttonContainer} onClick={() => setOpenTab(0)}>
                                                <ListRounded/>
                                                {lang.teds}
                                            </button>
                                        </div>
                                    )
                                },
                                {
                                    key: 1,
                                    value: lang.objectives,
                                    content: <Objectives project={project}/>
                                },
                                {
                                    key: 2,
                                    value: lang.risks,
                                    content: <Risks project={project}/>
                                }
                            ]}
                            setOpenTab={setOpenTab}
                            openTab={openTab}
                        />
                    </div>
                </div>
            </>
        )
    else
        return null
}
