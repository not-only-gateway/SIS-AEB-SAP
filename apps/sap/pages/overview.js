import IndexPT from "../packages/locales/ProjectPT";
import {useRouter} from "next/router";
import React, {useState} from "react";
import Head from "next/head";
import Tabs from "../components/shared/misc/tabs/Tabs";
import OverviewPT from "../packages/locales/OverviewPT";
import ProjectList from "../components/index/ProjectList";
import TedList from "../components/index/TedList";
import WorkPlanList from "../components/workplan/WorkPlanList";
import Project from "../components/overview/Project";

import WorkPlan from "../components/overview/WorkPlan";
import Ted from "../components/overview/Ted";


export default function overview(){
    const lang = OverviewPT
    const router = useRouter()
    const [openTab, setOpenTab] = useState(0)
    return (
        <>
            <Head>
                <title>{lang.overview}</title>
                <link rel='icon' href={'/LOGO.png'} type='image/x-icon'/>
            </Head>
            <div style={{width: '73%', margin: '32px auto auto auto'}}>

                <Tabs
                    buttons={[
                        {
                            key: 0,
                            value: lang.projects,
                            content: (
                                <Project redirect={id => router.push('/project/?id=' + id, undefined, {shallow: true})} setOpen={() => null}/>
                            )
                        },

                        {
                            key: 1,
                            value: lang.teds,
                            content: (
                                <Ted redirect={id => router.push('/ted/?id=' + id, undefined, {shallow: true})} setOpen={() => null}/>
                            )
                        },
                        {
                            key: 2,
                            value: lang.workPlan,
                            content: (
                                <WorkPlan redirect={id => router.push('/workplan/?id=' + id, undefined, {shallow: true})} setOpen={() => null}/>
                            )
                        },
                    ]} type={'horizontal'}
                    setOpenTab={setOpenTab}
                    openTab={openTab}
                />


            </div>
        </>
    )
}