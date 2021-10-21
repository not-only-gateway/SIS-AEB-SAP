import React, {useContext} from "react";
import {useRouter} from "next/router";
import styles from '../styles/Authenticate.module.css'
import Head from "next/head";
import Authenticator from "../components/Authenticator";
import {ThemeContext, ThemeProvider} from "sis-aeb-core";
import PropTypes from 'prop-types'

export default function authentication(props) {
    const router = useRouter()
    const context = useContext(ThemeContext)
    return (
        <ThemeProvider onDark={true}>
            <div className={[styles.pageWrapper, context.styles.light].join(' ')}>
                <Head>
                    <title>Entrar</title>

                    <link rel="icon" href={"/LOGO.png"} type="image/x-icon"/>
                </Head>

                <div className={styles.contentWrapper}>
                    <Authenticator setManager={props.setManager} redirect={() => router.push('/', '/', {locale: router.locale})}/>
                </div>
            </div>
        </ThemeProvider>
    )
}

authentication.propTypes={
    setManager: PropTypes.func
}