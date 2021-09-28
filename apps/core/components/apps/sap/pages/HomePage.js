import React from 'react'
import {useRouter} from "next/router";
import Head from "next/head";
import IndexPT from "../locales/ProjectPT";
import ProjectList from "../components/lists/ProjectList";
// import ProjectList from "../sap/components/index/ProjectList";
import PropTypes from 'prop-types'

export default function HomePage(props) {
    const lang = IndexPT
    return (
        <>
            <Head>
                <title>{lang.pageTitle}</title>
                <link rel='icon' href={'/LOGO.png'} type='image/x-icon'/>
            </Head>
            <div style={{width: '75%', margin: '16px auto auto auto'}}>
                <ProjectList redirect={id => props.redirect('/project/?id=' + id, undefined, {shallow: true})}
                             setOpen={() => null}/>
            </div>
        </>
    )
}
HomePage.propTypes = {
    redirect: PropTypes.func
}