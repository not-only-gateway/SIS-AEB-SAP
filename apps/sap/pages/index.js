import React, {useState} from 'react'
import {useRouter} from "next/router";
import Head from "next/head";
import IndexPT from "../packages/locales/ProjectPT";
import ProjectList from "../components/index/ProjectList";
import Tabs from "../components/shared/misc/tabs/Tabs";
import TedList from "../components/project/TedList";
import WorkPlanList from "../components/workplan/WorkPlanList";

export default function index(props) {
    const lang = IndexPT
    const router = useRouter()

    return (
        <>
            <Head>
                <title>{lang.pageTitle}</title>
                <link rel='icon' href={'/LOGO.png'} type='image/x-icon'/>
            </Head>
            <div style={{width: '73%', margin: '32px auto auto auto'}}>
                <ProjectList redirect={id => router.push('/project/?id=' + id, undefined, {shallow: true})}
                             setOpen={() => null}/>
            </div>
        </>
    )
}
