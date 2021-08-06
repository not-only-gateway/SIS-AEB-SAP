import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Head from "next/head";
import styles from "../styles/WorkPlan.module.css";
import pStyles from "../styles/Project.module.css";
import Link from "next/link";
import Tabs from "../components/shared/misc/tabs/Tabs";
import handleObjectChange from "../utils/shared/HandleObjectChange";
import WorkPlanPT from "../packages/locales/WorkPlanPT";
import WorkPlanForm from "../components/workplan/WorkPlanForm";
import WorkPlanRequests from "../utils/fetch/WorkPlanRequests";
import InfrastructureList from "../components/workplan/infrastructure/InfrastructureList";
import StatusList from "../components/workplan/StatusList";
import GoalList from "../components/workplan/goal/GoalList";
import {ArrowBackIos, HomeRounded} from "@material-ui/icons";
import WorkPlan from "../components/workplan/WorkPlan";
import Goal from "../components/workplan/goal/Goal";

export default function workplan() {
    const lang = WorkPlanPT
    const [workPlan, setWorkPlan] = useState(undefined)
    const [openTab, setOpenTab] = useState(0)
    const [openGoal, setOpenGoal] = useState(null)
    const router = useRouter()
    useEffect(() => {
        if (router.isReady) {
            WorkPlanRequests.fetchWorkPlan(router.query.id).then(res => {
                if (res !== null)
                    setWorkPlan(res)
            })
        }
    }, [router.isReady])

    if (workPlan !== undefined)
        return (
            <div style={{width: '75%', margin: 'auto'}}>
                <Head>
                    <title>{workPlan.object}</title>
                    <link rel='icon' href={'/LOGO.png'} type='image/x-icon'/>
                </Head>

                <div className={styles.pageContainer}>
                    <div className={pStyles.header}>
                        <Link href={'/'}>
                            <button className={[pStyles.homeButton, pStyles.headerButton].join(' ')}
                                    style={{border: 'none'}}>
                                <HomeRounded/>
                            </button>
                        </Link>
                        <div className={pStyles.info} style={{color: '#555555', fontSize: '1.2rem'}}>
                            <Link href={'/'}>
                                <button className={pStyles.headerButton}>
                                    {lang.workPlans}
                                </button>
                            </Link>
                            <ArrowBackIos style={{
                                fontSize: '.9rem',
                                color: '#666666',
                                transform: 'rotate(180deg) translateX(.35rem)'
                            }}/>

                            {openGoal !== null && openGoal !== undefined ?
                                <>
                                    <button className={pStyles.headerButton} onClick={() => setOpenGoal(null)}>
                                        {workPlan.object}
                                    </button>
                                    <ArrowBackIos style={{
                                        fontSize: '.9rem',
                                        color: '#666666',
                                        transform: 'rotate(180deg) translateX(.35rem)'
                                    }}/>

                                    <div className={pStyles.title}>
                                        {openGoal.goal_number}
                                    </div>
                                </>
                                :
                                <div className={pStyles.title}>
                                    {workPlan.object}
                                </div>
                            }

                        </div>

                    </div>
                    {openGoal !== null && openGoal !== undefined ?
                        <Goal
                            returnToMain={() => {
                                setOpenGoal(null)
                            }}
                            handleChange={event => handleObjectChange({
                                event: event,
                                setData: setOpenGoal
                            })}
                            data={openGoal} workPlan={workPlan}/>
                        :
                        null
                    }
                    <div style={{display: openGoal !== null && openGoal !== undefined ? ' none' : undefined}}>
                        <Tabs
                            buttons={[
                                {
                                    key: 0,
                                    value: lang.workPlan,
                                    content: (
                                        <WorkPlan workPlan={workPlan} setWorkPlan={setWorkPlan}
                                                  setOpenGoal={event => setOpenGoal(event)}/>
                                    )
                                },

                                {
                                    key: 1,
                                    value: lang.infrastructure,
                                    content: <InfrastructureList workPlan={workPlan}/>
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
