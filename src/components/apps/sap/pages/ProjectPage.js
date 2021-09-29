import React, {useEffect, useState} from 'react'
import Head from "next/head";
import ProjectRequests from "../utils/requests/ProjectRequests";
import Project from "../components/entities/Project";
import Ted from "../components/entities/Ted";
import WorkPlan from "../components/entities/WorkPlan";
import Goal from "../components/entities/Goal";
import Stage from "../components/entities/Stage";
import Header from "../components/Header";
import PropTypes from 'prop-types'

export default function ProjectPage(props) {
    const [project, setProject] = useState(undefined)
    const [currentStructure, setCurrentStructure] = useState({
        ted: null
    })
    useEffect(() => {
        ProjectRequests.fetchProject(props.id).then(res => {
            if (res !== null)
                setProject(res)
        })
    }, [])

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
                    }} ted={currentStructure.ted}
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
                        const newStage = {...currentStructure.stage}
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
        </>
    )
}
Project.propTypes = {
    id: PropTypes.number
}