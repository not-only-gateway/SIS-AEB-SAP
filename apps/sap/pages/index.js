import React, {useState} from 'react'
import {useRouter} from "next/router";
import Head from "next/head";
import IndexPT from "../packages/locales/ProjectPT";
import ProjectList from "../components/index/ProjectList";
import Tabs from "../components/shared/misc/tabs/Tabs";
import ProjectForm from "../components/index/ProjectForm";
import handleObjectChange from "../utils/shared/HandleObjectChange";
import Objectives from "../components/project/Objectives";
import Risks from "../components/project/Risks";
import TedList from "../components/index/TedList";
import WorkPlanList from "../components/index/WorkPlanList";

export default function index(props) {
    const lang = IndexPT
    const router = useRouter()

    const [openTab, setOpenTab] = useState(0)
    return (
        <>
            <Head>
                <title>{lang.pageTitle}</title>
                <link rel='icon' href={'/LOGO.png'} type='image/x-icon'/>
            </Head>
            <div style={{width: '73%', margin: '32px auto auto auto'}}>

                <Tabs
                    buttons={[
                        {
                            key: 0,
                            value: lang.projects,
                            content: (
                                <ProjectList redirect={id => router.push('/project/?id=' + id, undefined, {shallow: true})} setOpen={() => null}/>
                            )
                        },

                        {
                            key: 1,
                            value: lang.teds,
                            content: (
                                <TedList redirect={id => router.push('/ted/?id=' + id, undefined, {shallow: true})} setOpen={() => null}/>
                            )
                        },
                        {
                            key: 2,
                            value: lang.workPlan,
                            content: (
                                <WorkPlanList redirect={id => router.push('/workplan/?id=' + id, undefined, {shallow: true})} setOpen={() => null}/>
                            )
                        },
                    ]}
                    setOpenTab={setOpenTab}
                    openTab={openTab}
                />
            </div>
        </>
    )
}
