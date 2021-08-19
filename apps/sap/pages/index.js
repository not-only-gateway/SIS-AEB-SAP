import React from 'react'
import {useRouter} from "next/router";
import Head from "next/head";
import IndexPT from "../packages/locales/ProjectPT";
import ProjectList from "../components/index/ProjectList";

export default function index() {
    const lang = IndexPT
    const router = useRouter()

    return (
        <>
            <Head>
                <title>{lang.pageTitle}</title>
                <link rel='icon' href={'/LOGO.png'} type='image/x-icon'/>
            </Head>
            <div style={{width: '75%', margin: '16px auto auto auto'}}>
                <ProjectList redirect={id => router.push('/project/?id=' + id, undefined, {shallow: true})}
                             setOpen={() => null}/>
            </div>
        </>
    )
}
