import React from "react";

import {useRouter} from "next/router";
import styles from '../styles/Authenticate.module.css'
import Head from "next/head";
import AuthenticatePT from "../packages/locales/AuthenticatePT";
import Authenticator from "../components/shared/Authenticator";

export default function authenticate() {
    const router = useRouter()
    const lang = AuthenticatePT

    return (
        <>

            <Head>
                <title>{lang.title}</title>

                <link rel="icon" href={"/LOGO.png"} type="image/x-icon"/>
            </Head>

            <div className={styles.pageContainer}>

                <Authenticator redirect={() => router.push('/', '/', {locale: router.locale})}/>
            </div>
        </>
    )
}