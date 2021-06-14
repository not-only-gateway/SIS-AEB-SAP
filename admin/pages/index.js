import React, {useEffect, useState} from 'react'
import {useRouter} from "next/router";
import HeaderLayout from "../components/shared/layout/HeaderLayout";
import TabContent from "../components/shared/TabContent";
import AccessProfileList from "../components/management/list/AccessProfileList";
import EffectiveRoleList from "../components/management/list/EffectiveRoleList";
import CommissionedRoleList from "../components/management/list/CommissionedRoleList";
import LinkageList from "../components/management/list/LinkageList";
import PeopleList from "../components/management/list/PeopleList";
import UnitList from "../components/management/list/UnitList";
import Tabs from "../components/shared/layout/Tabs";
import ManagementPT from "../packages/locales/management/ManagementPT";

export default function management() {

    const router = useRouter()
    const lang = ManagementPT
    const [accessProfile, setAccessProfile] = useState(null)
    const [openTab, setOpenTab] = useState(0)

    useEffect(() => {
        if (accessProfile === null && sessionStorage.getItem('accessProfile') !== null) {
            const accessProfileSession = JSON.parse(sessionStorage.getItem('accessProfile'))
            if (accessProfileSession.can_manage_structure || accessProfileSession.can_update_person) {
                setAccessProfile(accessProfileSession)
                setOpenTab(accessProfileSession.can_update_person ? 0 : 1)
            } else
                router.push('/', '/', {locale: router.locale})

        }
    })


        return (
            <div style={{display: 'flex'}}>

            <Tabs
                    buttons={[
                        accessProfile !== null && accessProfile.can_update_person ? {
                            key: 0,
                            value: lang.registered
                        } : null,
                        accessProfile !== null && accessProfile.can_manage_structure ? {
                            key: 1,
                            value: lang.units
                        } : null,
                        accessProfile !== null && accessProfile.can_manage_structure ? {
                            key: 2,
                            value: lang.accessTitle
                        } : null,
                        accessProfile !== null && accessProfile.can_manage_structure ? {
                            key: 3,
                            value: lang.effectiveRoleTitle
                        } : null,
                        accessProfile !== null && accessProfile.can_manage_structure ? {
                            key: 4,
                            value: lang.commissionedRoleTitle
                        } : null,
                        accessProfile !== null && accessProfile.can_manage_structure ? {
                            key: 5,
                            value: lang.linkagesTitle
                        } : null,
                    ]}
                    setOpenTab={setOpenTab}
                    openTab={openTab}
                />

                <div style={{width: 'calc(100% - 220px)', marginLeft: 'auto', overflowY: 'hidden'}}>
                    <HeaderLayout
                        width={'95%'}
                        title={
                            lang.title
                        }
                        pageTitle={lang.title}
                    />
                    <TabContent
                        openTab={openTab}

                        tabs={[
                            {
                                buttonKey: 0,
                                value: accessProfile === null || !accessProfile.can_update_person ? null : <PeopleList
                                    member={lang.member}
                                    locale={router.locale} searchInput={''}
                                    nothingFound={lang.nothingFound} end={lang.end}/>
                            },
                            {
                                buttonKey: 1,
                                value: accessProfile === null || !accessProfile.can_manage_structure ? null : <UnitList
                                    locale={router.locale} searchInput={''}
                                    nothingFound={lang.nothingFound} end={lang.end}/>
                            },
                            {
                                buttonKey: 2,
                                value: accessProfile === null || !accessProfile.can_manage_structure ? null :
                                    <AccessProfileList locale={router.locale}/>
                            },
                            {
                                buttonKey: 3,
                                value: accessProfile === null || !accessProfile.can_manage_structure ? null :
                                    <EffectiveRoleList locale={router.locale}/>
                            },
                            {
                                buttonKey: 4,
                                value: accessProfile === null || !accessProfile.can_manage_structure ? null :
                                    <CommissionedRoleList locale={router.locale}/>
                            },
                            {
                                buttonKey: 5,
                                value: accessProfile === null || !accessProfile.can_manage_structure ? null :
                                    <LinkageList locale={router.locale}/>
                            },
                        ]}
                    />
                </div>
            </div>


        )

}
