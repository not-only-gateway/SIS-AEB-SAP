import React, {useState} from 'react'
import {useRouter} from "next/router";
import Head from "next/head";
import IndexPT from "../packages/locales/ProjectPT";
import ProjectList from "../components/index/ProjectList";

export default function index(props) {
    const lang = IndexPT
    const router = useRouter()
    return (
        <>
            <Head>
                <title>{lang.title}</title>
                <link rel='icon' href={'/LOGO.png'} type='image/x-icon'/>
            </Head>
            <div style={{width: '55%', margin: 'auto'}}>
                <ProjectList redirect={id => router.push('/project/?id=' + id, undefined, {shallow: true})} setOpen={() => null}/>
            </div>
        </>
    )
}
