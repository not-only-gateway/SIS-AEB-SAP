import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Head from "next/head";
import styles from "../styles/WorkPlan.module.css";
import pStyles from "../styles/Project.module.css";
import Link from "next/link";
import Tabs from "../components/shared/misc/tabs/Tabs";
import handleObjectChange from "../utils/shared/HandleObjectChange";
import WorkPlanPT from "../packages/locales/WorkPlanPT";
import WorkPlanForm from "../components/index/WorkPlanForm";
import WorkPlanRequests from "../utils/fetch/WorkPlanRequests";
import InfrastructureList from "../components/workplan/infrastructure/InfrastructureList";
import StatusList from "../components/workplan/StatusList";
import GoalList from "../components/workplan/goal/GoalList";
import {ArrowBackIos, HomeRounded} from "@material-ui/icons";

export default function workplan() {
    const lang = WorkPlanPT
    const [workPlan, setWorkPlan] = useState(undefined)
    const [openTab, setOpenTab] = useState(0)
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
                            <div className={pStyles.title}>
                                {workPlan.object}
                            </div>


                        </div>

                    </div>

                    <Tabs
                        buttons={[
                            {
                                key: 0,
                                value: lang.workPlan,
                                content: (
                                    <WorkPlanForm
                                        returnToMain={() => {
                                            null
                                        }}
                                        handleChange={event => handleObjectChange({
                                            event: event,
                                            setData: setWorkPlan
                                        })} id={workPlan.id}
                                        create={false}
                                        data={workPlan}
                                    />
                                )
                            },

                            {
                                key: 1,
                                value: lang.infrastructure,
                                content: <InfrastructureList workPlan={workPlan}/>
                            },
                            {
                                key: 2,
                                value: lang.status,
                                content: <StatusList workPlan={workPlan}/>
                            },
                            {
                                key: 3,
                                value: lang.goal,
                                content: <GoalList workPlan={workPlan}/>
                            }
                        ]}
                        setOpenTab={setOpenTab}
                        openTab={openTab}
                    />
                </div>
            </div>
        )
    else
        return null
}
