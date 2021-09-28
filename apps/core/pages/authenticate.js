import React from "react";
import {useRouter} from "next/router";
import styles from '../styles/Authenticate.module.css'
import Head from "next/head";
import Authenticator from "../components/Authenticator";

export default function authenticate() {
    const router = useRouter()
    return (
        <>

            <Head>
                <title>Entrar</title>

                <link rel="icon" href={"/LOGO.png"} type="image/x-icon"/>
            </Head>

            <div className={styles.pageContainer}>
                <Authenticator redirect={() => router.push('/', '/', {locale: router.locale})}/>
            </div>
        </>
    )
}