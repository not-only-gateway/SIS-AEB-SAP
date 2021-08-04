import IndexPT from "../packages/locales/ProjectPT";
import {useRouter} from "next/router";
import React, {useState} from "react";
import Head from "next/head";
import Tabs from "../components/shared/misc/tabs/Tabs";
import OverviewPT from "../packages/locales/OverviewPT";


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
                              null
                            )
                        },

                        {
                            key: 1,
                            value: lang.teds,
                            content: (
                                null
                            )
                        },
                        {
                            key: 2,
                            value: lang.workPlan,
                            content: (
                                null
                            )
                        },

                        {
                            key: 3,
                            value: lang.action,
                            content: (
                                null
                            )
                        },

                        {
                            key: 4,
                            value: lang.activity,
                            content: (
                                null
                            )
                        },

                        {
                            key: 5,
                            value: lang.infrastructure,
                            content: (
                                null
                            )
                        },

                        {
                            key: 6,
                            value: lang.components,
                            content: (
                                null
                            )
                        },

                        {
                            key: 7,
                            value: lang.execution,
                            content: (
                                null
                            )
                        },

                        {
                            key: 8,
                            value: lang.followupGoal,
                            content: (
                                null
                            )
                        },
                        {
                            key: 9,
                            value: lang.goal,
                            content: (
                                null
                            )
                        },
                        {
                            key: 10,
                            value: lang.operation,
                            content: (
                                null
                            )
                        },
                        {
                            key: 11,
                            value: lang.status,
                            content: (
                                null
                            )
                        },
                        {
                            key: 12,
                            value: lang.addendum,
                            content: (
                                null
                            )
                        }, {
                            key: 13,
                            value: lang.projectGoal,
                            content: (
                                null
                            )
                        }, {
                            key: 14,
                            value: lang.risks,
                            content: (
                                null
                            )
                        }
                    ]}
                    setOpenTab={setOpenTab}
                    openTab={openTab}
                />
            </div>
        </>
    )
}