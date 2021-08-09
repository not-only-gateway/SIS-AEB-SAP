import React, {useEffect, useState} from 'react'
import {useRouter} from "next/router";
import Head from "next/head";
import ProjectPT from "../packages/locales/ProjectPT";
import styles from "../styles/Project.module.css";
import Tabs from "../components/shared/misc/tabs/Tabs";
import ProjectRequests from "../utils/fetch/ProjectRequests";
import Link from 'next/link'
import {ArrowBackIos, HomeRounded} from "@material-ui/icons";
import Project from "../components/project/Project";
import TedList from "../components/project/TedList";
import TedRequests from "../utils/fetch/TedRequests";
import Ted from "../components/ted/Ted";
import WorkPlanList from "../components/workplan/WorkPlanList";
import pStyles from "../styles/Project.module.css";
import WorkPlan from "../components/workplan/WorkPlan";
import InfrastructureList from "../components/workplan/infrastructure/InfrastructureList";
import GoalList from "../components/workplan/goal/GoalList";
import handleObjectChange from "../utils/shared/HandleObjectChange";
import Goal from "../components/workplan/goal/Goal";
import Stage from "../components/workplan/goal/stage/Stage";
import WorkPlanRequests from "../utils/fetch/WorkPlanRequests";
import StageForm from "../components/workplan/goal/stage/StageForm";

export default function project(props) {
    const lang = ProjectPT
    const [project, setProject] = useState(undefined)
    const [openTab, setOpenTab] = useState(0)
    const [openStructureTab, setOpenStructureTab] = useState({
        ted: 0,
        workPlan: 0,
        goal: 0
    })
    const [currentStructure, setCurrentStructure] = useState({
        ted: null
    })
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
            <div style={{width: '75%', margin: 'auto'}}>
                <Head>
                    <title>{project.name}</title>
                    <link rel='icon' href={'/LOGO.png'} type='image/x-icon'/>
                </Head>


                <div className={styles.header}>
                    <Link href={'/'}>
                        <button className={[styles.homeButton, styles.headerButton].join(' ')}
                                style={{border: 'none'}}>
                            <HomeRounded/>
                        </button>
                    </Link>
                    <>
                        <Link href={'/'}>
                            <button className={styles.headerButton}>
                                {lang.projects}
                            </button>
                        </Link>
                        <ArrowBackIos style={{
                            fontSize: '.9rem',
                            color: '#666666',
                            transform: 'rotate(180deg) translateX(.35rem)'
                        }}/>
                        <button className={pStyles.headerButton} disabled={currentStructure.ted === null}
                                style={{maxWidth: '20%'}}
                                onClick={() => {
                                    setCurrentStructure({
                                        ted: null
                                    })
                                }}>
                            {project.name}
                        </button>
                        {currentStructure.ted !== undefined && currentStructure.ted !== null ?
                            <>
                                <ArrowBackIos style={{
                                    fontSize: '.9rem',
                                    color: '#666666',
                                    transform: 'rotate(180deg) translateX(.35rem)'
                                }}/>
                                <button
                                    className={pStyles.headerButton} style={{maxWidth: '20%'}}
                                    onClick={() => {
                                        setCurrentStructure({
                                            ted: currentStructure.ted
                                        })
                                    }}
                                    disabled={currentStructure.workPlan === undefined || currentStructure.workPlan === null}>
                                    {currentStructure.ted.number}
                                </button>
                            </>
                            :
                            null
                        }
                        {currentStructure.workPlan !== undefined && currentStructure.workPlan !== null ?
                            <>
                                <ArrowBackIos style={{
                                    fontSize: '.9rem',
                                    color: '#666666',
                                    transform: 'rotate(180deg) translateX(.35rem)'
                                }}/>
                                <button className={pStyles.headerButton} style={{maxWidth: '20%'}}
                                        onClick={() => {
                                            setCurrentStructure({
                                                ted: currentStructure.ted,
                                                workPlan: currentStructure.workPlan
                                            })
                                        }}
                                        disabled={currentStructure.goal === undefined || currentStructure.goal === null}>
                                    {currentStructure.workPlan.object}
                                </button>
                            </>
                            :
                            null
                        }
                        {currentStructure.goal !== undefined && currentStructure.goal !== null ?
                            <>
                                <ArrowBackIos style={{
                                    fontSize: '.9rem',
                                    color: '#666666',
                                    transform: 'rotate(180deg) translateX(.35rem)'
                                }}/>
                                <button className={pStyles.headerButton} style={{maxWidth: '20%'}}
                                        disabled={currentStructure.stage === undefined || currentStructure.stage === null}>
                                    {currentStructure.goal.goal_number}
                                </button>
                            </>
                            :
                            null
                        }
                        {currentStructure.stage !== undefined && currentStructure.stage !== null ?
                            <>
                                <ArrowBackIos style={{
                                    fontSize: '.9rem',
                                    color: '#666666',
                                    transform: 'rotate(180deg) translateX(.35rem)'
                                }}/>
                                <button className={pStyles.headerButton} style={{maxWidth: '20%'}} disabled={true}>
                                    {currentStructure.stage.stage}
                                </button>
                            </>
                            :
                            null
                        }
                    </>

                </div>

                <div style={{
                    display: currentStructure.ted === null ? undefined : 'none',
                    width: '100%'
                }}>
                    <Tabs
                        buttons={[
                            {
                                key: 0,
                                value: lang.project,
                                content: (
                                    <Project setProject={setProject} project={project}/>
                                )
                            },

                            {
                                key: 1,
                                value: lang.teds,
                                content: <TedList redirect={id => {
                                    TedRequests.fetchTed(id).then(res => {
                                        if (res !== null)
                                            setCurrentStructure({
                                                ...currentStructure,
                                                ted: res
                                            })
                                    })
                                }} project={project}/>
                            }
                        ]}
                        setOpenTab={setOpenTab}
                        openTab={openTab}
                    />
                </div>

                <div style={{
                    display: currentStructure.ted !== null && currentStructure.ted !== undefined && (currentStructure.workPlan === null || currentStructure.workPlan === undefined) ? undefined : 'none',
                    width: '100%'
                }}>
                    <Tabs
                        buttons={[
                            {
                                key: 0,
                                value: lang.ted,
                                content: (
                                    currentStructure.ted !== null && currentStructure.ted !== undefined ?
                                        <Ted ted={currentStructure.ted}
                                             setTed={event => {
                                                 const newTed = {...currentStructure.ted}
                                                 newTed[event.name] = event.value
                                                 setCurrentStructure({
                                                     ...currentStructure,
                                                     ted: newTed
                                                 })
                                             }}/> : null
                                )
                            },
                            {
                                key: 1,
                                value: lang.workPlan,
                                content: (
                                    currentStructure.ted !== null && currentStructure.ted !== undefined ?
                                        <WorkPlanList
                                            redirect={() => null} ted={currentStructure.ted}
                                            setCurrentStructure={(name, data) => {
                                                setCurrentStructure({
                                                    ...currentStructure,
                                                    [name]: data
                                                })
                                            }}
                                            currentStructure={currentStructure}
                                        />
                                        :
                                        null
                                )
                            }
                        ]}
                        setOpenTab={value => setOpenStructureTab({...openStructureTab, ted: value})}
                        openTab={openStructureTab.ted}
                    />
                </div>

                <div style={{
                    display: currentStructure.workPlan !== null && currentStructure.workPlan !== undefined && (currentStructure.goal === null || currentStructure.goal === undefined) ? undefined : 'none',
                    width: '100%'
                }}>
                    <Tabs
                        buttons={[
                            {
                                key: 0,
                                value: lang.workPlan,
                                content: (
                                    currentStructure.workPlan !== null && currentStructure.workPlan !== undefined ?
                                        <WorkPlan
                                            workPlan={currentStructure.workPlan}
                                            setWorkPlan={event => {
                                                const newWorkPlan = {...currentStructure.workPlan}
                                                newWorkPlan[event.name] = event.value
                                                setCurrentStructure({
                                                    ...currentStructure,
                                                    workPlan: newWorkPlan
                                                })
                                            }} setCurrentStructure={setCurrentStructure}
                                            currentStructure={currentStructure}/> : null
                                )
                            },

                            {
                                key: 1,
                                value: lang.infrastructure,
                                content: currentStructure.workPlan !== null && currentStructure.workPlan !== undefined ?
                                    <InfrastructureList workPlan={currentStructure.workPlan}/> : null
                            },
                            {
                                key: 2,
                                value: lang.goals,
                                content: currentStructure.workPlan !== null && currentStructure.workPlan !== undefined ?
                                    <GoalList
                                        workPlan={currentStructure.workPlan}
                                        setCurrentStructure={data => {
                                            setCurrentStructure({
                                                ...currentStructure,
                                                goal: data
                                            })
                                        }}
                                    /> : null
                            },

                        ]}
                        setOpenTab={value => setOpenStructureTab({...openStructureTab, workPlan: value})}
                        openTab={openStructureTab.workPlan}
                    />
                </div>
                {currentStructure.goal !== null && currentStructure.goal !== undefined && (currentStructure.stage === null || currentStructure.stage === undefined) ?
                    <Goal

                        handleChange={event => {
                            const newGoal = {...currentStructure.goal}
                            newGoal[event.name] = event.value
                            setCurrentStructure({
                                ...currentStructure,
                                goal: newGoal
                            })
                        }}
                        data={currentStructure.goal}
                        setCurrentStructure={event => {
                            console.log(event)
                            setCurrentStructure({
                                ...currentStructure,
                                stage: event
                            })
                        }}
                        workPlan={currentStructure.workPlan}
                    />
                    :
                    null
                }
                {currentStructure.stage !== null && currentStructure.stage !== undefined ?
                    <Stage
                        handleChange={event => {
                            const newStage = {...currentStructure.goal}
                            newStage[event.name] = event.value
                            setCurrentStructure({
                                ...currentStructure,
                                stage: newStage
                            })
                        }}
                        data={currentStructure.stage}
                        goal={currentStructure.goal}
                    />
                    :
                    null
                }
            </div>
            // </div>
        )
    else
        return null
}
