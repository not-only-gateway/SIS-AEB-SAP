import React, {useEffect, useState} from 'react'
import {useRouter} from "next/router";
import Head from "next/head";
import ProjectPT from "../packages/locales/ProjectPT";
import ProjectRequests from "../utils/fetch/ProjectRequests";
import Project from "../components/project/project/Project";
import Ted from "../components/project/ted/Ted";
import WorkPlan from "../components/project/workplan/WorkPlan";
import Goal from "../components/project/workplan/goal/Goal";
import Stage from "../components/project/workplan/goal/stage/Stage";
import Header from "../components/project/Header";
import Execution from "../components/project/execution/Execution";

export default function project(props) {
    const lang = ProjectPT
    const [project, setProject] = useState(undefined)
    const [openTab, setOpenTab] = useState(0)
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
            <>
                <Head>
                    <title>{project.name}</title>
                    <link rel='icon' href={'/LOGO.png'} type='image/x-icon'/>
                </Head>

                <Header setCurrentStructure={setCurrentStructure} project={project}
                        currentStructure={currentStructure}/>

                {currentStructure.ted === null ?
                    <Project setProject={setProject} project={project} currentStructure={currentStructure}
                             setCurrentStructure={setCurrentStructure}/>
                    :
                    null
                }


                {currentStructure.ted !== null && currentStructure.ted !== undefined && (currentStructure.workPlan === null || currentStructure.workPlan === undefined) ?
                    <Ted
                        ted={currentStructure.ted}
                        setWorkPlan={event => {
                            setCurrentStructure({
                                ...currentStructure,
                                workPlan: event
                            })
                        }} project={project}
                        setTed={event => {
                            const newTed = {...currentStructure.ted}
                            newTed[event.name] = event.value
                            setCurrentStructure({
                                ...currentStructure,
                                ted: newTed
                            })
                        }}/>
                    :
                    null
                }

                {currentStructure.workPlan !== null && currentStructure.workPlan !== undefined && (currentStructure.goal === null || currentStructure.goal === undefined) ?
                    <WorkPlan
                        workPlan={currentStructure.workPlan}
                        setWorkPlan={event => {
                            const newWorkPlan = {...currentStructure.workPlan}
                            newWorkPlan[event.name] = event.value
                            setCurrentStructure({
                                ...currentStructure,
                                workPlan: newWorkPlan
                            })
                        }}
                        setGoal={goal => {
                            setCurrentStructure({
                                ...currentStructure,
                                goal: goal
                            })
                        }}/>
                    :
                    null
                }
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
                {currentStructure.stage !== null && currentStructure.stage !== undefined && (currentStructure.execution === null || currentStructure.execution === undefined) ?
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
                        setExecution={event => {
                            setCurrentStructure({
                                ...currentStructure,
                                execution: event
                            })
                        }}
                    />
                    :
                    null
                }
                {currentStructure.execution !== null && currentStructure.execution !== undefined ?
                    <Execution
                        setExecution={event => {
                            const newExecution = {...currentStructure.execution}
                            newExecution[event.name] = event.value
                            setCurrentStructure({
                                ...currentStructure,
                                execution: newExecution
                            })
                        }}
                        execution={currentStructure.execution}
                    />
                    :
                    null
                }

            </>
            // </div>
        )
    else
        return null
}
