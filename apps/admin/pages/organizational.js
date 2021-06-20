import React, {useEffect, useState} from 'react'
import {useRouter} from "next/router";
import EffectiveRoleList from "../components/organizational/EffectiveRoleList";
import CommissionedRoleList from "../components/organizational/CommissionedRoleList";
import Tabs from "../components/shared/layout/test2/Tabs";
import RenderTabs from "../components/shared/layout/test2/RenderTabs";
import Head from "next/head";
import OrganizationalPT from "../packages/locales/organizational/OrganizationalPT";
import ContractList from "../components/organizational/ContractList";

export default function organizational() {

    const router = useRouter()
    const lang = OrganizationalPT
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
                            value: lang.contractTitle
                        },
                        {
                            key: 1,
                            value: lang.effectiveRoleTitle
                        },
                        {
                            key: 2,
                            value: lang.commissionedRoleTitle
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
                            value: <ContractList/>
                        },
                        {
                            buttonKey: 1,
                            value: <EffectiveRoleList/>
                        },
                        {
                            buttonKey: 2,
                            value: <CommissionedRoleList/>
                        },
                    ]}
                />
            </div>
        </>


    )

}
