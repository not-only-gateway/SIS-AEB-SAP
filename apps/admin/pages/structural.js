import React, {useEffect, useState} from 'react'
import {useRouter} from "next/router";
import UnitList from "../components/organizational/UnitList";
import Tabs from "../components/shared/layout/test2/Tabs";
import RenderTabs from "../components/shared/layout/test2/RenderTabs";
import Head from "next/head";
import StructuralPT from "../packages/locales/structural/StructuralPT";
import EntityList from "../components/structural/EntityList";

export default function structural() {

    const router = useRouter()
    const lang = StructuralPT
    const [accessProfile, setAccessProfile] = useState(null)
    const [openTab, setOpenTab] = useState(0)

    useEffect(() => {
        if (accessProfile === null && sessionStorage.getItem('accessProfile') !== null) {
            const accessProfileSession = JSON.parse(sessionStorage.getItem('accessProfile'))
            if (accessProfileSession.can_manage_structure) {
                setAccessProfile(accessProfileSession)
            } else
                router.push('/', '/', {locale: router.locale})

        }
    })


    return (
        <>
            <Head>
                <title>{lang.title}</title>
                <link rel='icon' href={'/LOGO.png'} type='image/x-icon'/>
            </Head>

            <div style={{width: '65%', margin: 'auto', overflowY: 'hidden'}}>
                <Tabs
                    buttons={[
                        {
                            key: 0,
                            value: lang.units
                        },
                        {
                            key: 1,
                            value: lang.entities
                        }
                    ]}
                    setOpenTab={setOpenTab}
                    openTab={openTab}
                />

                <RenderTabs
                    openTab={openTab}

                    tabs={[
                        {
                            buttonKey: 0,
                            value: <UnitList/>
                        },
                        {
                            buttonKey: 1,
                            value: <EntityList/>
                        }
                    ]}
                />
            </div>
        </>


    )

}
