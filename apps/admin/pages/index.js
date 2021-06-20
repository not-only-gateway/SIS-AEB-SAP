import React, {useEffect, useState} from 'react'
import {useRouter} from "next/router";
import PeopleList from "../components/management/list/PeopleList";
import ManagementPT from "../packages/locales/management/ManagementPT";
import Tabs from "../components/shared/layout/test2/Tabs";
import RenderTabs from "../components/shared/layout/test2/RenderTabs";
import Head from "next/head";
import ContractualLinkageList from "../components/management/list/ContractualLinkageList";
import CommissionedLinkageList from "../components/management/list/CommissionedLinkageList";

export default function management() {

    const router = useRouter()
    const lang = ManagementPT
    const [accessProfile, setAccessProfile] = useState(null)
    const [openTab, setOpenTab] = useState(0)

    useEffect(() => {
        if (accessProfile === null && sessionStorage.getItem('accessProfile') !== null) {
            const accessProfileSession = JSON.parse(sessionStorage.getItem('accessProfile'))
            if (accessProfileSession.can_manage_person) {
                setAccessProfile(accessProfileSession)
                setOpenTab(0)
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
                            value: lang.people
                        },
                        accessProfile !== null && accessProfile.can_manage_structure ? {
                            key: 1,
                            value: lang.commissionedLinkages
                        } : null,
                        accessProfile !== null && accessProfile.can_manage_structure ? {
                            key: 2,
                            value: lang.contractualLinkages
                        } : null
                    ]}
                    setOpenTab={setOpenTab}
                    openTab={openTab}
                />

                <RenderTabs
                    openTab={openTab}

                    tabs={[
                        {
                            buttonKey: 0,
                            value: <PeopleList/>
                        },
                        {
                            buttonKey: 1,
                            value: <CommissionedLinkageList />
                        },
                        {
                            buttonKey: 2,
                            value: <ContractualLinkageList />

                        },
                    ]}
                />
            </div>
        </>


    )

}
