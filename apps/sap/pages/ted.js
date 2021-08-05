import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Head from "next/head";
import styles from "../styles/Project.module.css";
import Link from "next/link";
import Tabs from "../components/shared/misc/tabs/Tabs";
import handleObjectChange from "../utils/shared/HandleObjectChange";
import TedPT from "../packages/locales/TedPT";
import TedRequests from "../utils/fetch/TedRequests";
import TedForm from "../components/index/TedForm";
import AddendumList from "../components/ted/AddendumList";
import {ArrowBackIos, HomeRounded} from "@material-ui/icons";

export default function ted() {
    const lang = TedPT
    const [ted, setTed] = useState(undefined)
    const [openTab, setOpenTab] = useState(0)
    const router = useRouter()
    useEffect(() => {
        if (router.isReady) {
            TedRequests.fetchTed(router.query.id).then(res => {
                if (res !== null)
                    setTed(res)
            })
        }
    }, [router.isReady])

    if (ted !== undefined)
        return (
            <div style={{width: '75%', margin: 'auto'}}>
                <Head>
                    <title>{ted.name}</title>
                    <link rel='icon' href={'/LOGO.png'} type='image/x-icon'/>
                </Head>

                <div className={styles.pageContainer}>

                    <div className={styles.header}>
                        <Link href={'/'}>
                            <button className={[styles.homeButton, styles.headerButton].join(' ')}
                                    style={{border: 'none'}}>
                                <HomeRounded/>
                            </button>
                        </Link>
                        <div className={styles.info} style={{color: '#555555', fontSize: '1.2rem'}}>
                            <Link href={'/'}>
                                <button className={styles.headerButton}>
                                    {lang.teds}
                                </button>
                            </Link>
                            <ArrowBackIos style={{
                                fontSize: '.9rem',
                                color: '#666666',
                                transform: 'rotate(180deg) translateX(.35rem)'
                            }}/>
                            <div className={styles.title}>
                                {ted.number}
                            </div>


                        </div>
                    </div>


                    <Tabs
                        buttons={[
                            {
                                key: 0,
                                value: lang.ted,
                                content: (
                                    <TedForm
                                        returnToMain={() => {
                                            null
                                        }}
                                        handleChange={event => handleObjectChange({
                                            event: event,
                                            setData: setTed
                                        })} id={ted.id}
                                        create={false}
                                        data={ted}/>
                                )
                            },

                            {
                                key: 1,
                                value: lang.addendum,
                                content: <AddendumList ted={ted}/>
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
