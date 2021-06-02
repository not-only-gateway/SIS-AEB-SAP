import React, {useEffect, useState} from 'react'
import {useRouter} from "next/router";
import {getLanguage} from "../utils/shared/PageLanguage";
import mainStyles from '../styles/shared/Main.module.css'
import HeaderLayout from "../components/layout/HeaderLayout";
import TabContent from "../components/templates/TabContent";
import Authenticate from "../components/modules/Authenticate";
import AccessProfileList from "../components/templates/list/AccessProfileList";
import EffectiveRoleList from "../components/templates/list/EffectiveRoleList";
import CommissionedRoleList from "../components/templates/list/CommissionedRoleList";
import LinkageList from "../components/templates/list/LinkageList";
import Cookies from "universal-cookie/lib";
import PeopleList from "../components/templates/list/PeopleList";
import UnitList from "../components/templates/list/UnitList";
import HorizontalTabs from "../components/layout/navigation/HorizontalTabs";

export default function management() {

    const router = useRouter()
    const [lang, setLang] = useState(null)
    const [accessProfile, setAccessProfile] = useState(null)
    const [openTab, setOpenTab] = useState(0)

    useEffect(() => {

        if (lang === null)
            setLang(getLanguage(router.locale, router.pathname))
        if (accessProfile === null && sessionStorage.getItem('accessProfile') !== null) {
            const accessProfileSession = JSON.parse(sessionStorage.getItem('accessProfile'))
            if(accessProfileSession.can_manage_structure || accessProfileSession.can_update_person) {
                setAccessProfile(accessProfileSession)
                setOpenTab(accessProfileSession.can_update_person ? 0 : 1)
            }
            else
                router.push('/', '/', {locale: router.locale})

        }
    })


    if (lang !== null)
        return (
            <>
                <HeaderLayout
                    width={'75%'}

                    tabs={
                        <HorizontalTabs
                            buttons={[
                                accessProfile !== null && accessProfile.can_update_person ? {key: 0, value: lang.registered} : null,
                                accessProfile !== null && accessProfile.can_manage_structure ? {key: 1, value: lang.units} : null,
                                accessProfile !== null && accessProfile.can_manage_structure ? {key: 2, value: lang.accessTitle} : null,
                                accessProfile !== null && accessProfile.can_manage_structure ? {key: 3, value: lang.effectiveRoleTitle} : null,
                                accessProfile !== null && accessProfile.can_manage_structure ? {key: 4, value: lang.commissionedRoleTitle} : null,
                                accessProfile !== null && accessProfile.can_manage_structure ? {key: 5, value: lang.linkagesTitle} : null,
                            ]}
                            setOpenTab={setOpenTab}
                            openTab={openTab}
                        />
                    }
                    title={
                        lang.title
                    }
                    pageTitle={lang.title}
                />
                <div className={mainStyles.displayInlineCenter} style={{width: '100%'}}>
                    <div style={{width: '75%'}}>
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
                                    value: accessProfile === null || !accessProfile.can_manage_structure ? null :  <UnitList
                                        locale={router.locale} searchInput={''}
                                        nothingFound={lang.nothingFound} end={lang.end}/>
                                },
                                {buttonKey: 2, value:accessProfile === null || !accessProfile.can_manage_structure ? null :  <AccessProfileList locale={router.locale}/>},
                                {buttonKey: 3, value:accessProfile === null || !accessProfile.can_manage_structure ? null :  <EffectiveRoleList locale={router.locale}/>},
                                {buttonKey: 4, value:accessProfile === null || !accessProfile.can_manage_structure ? null :  <CommissionedRoleList locale={router.locale}/>},
                                {buttonKey: 5, value:accessProfile === null || !accessProfile.can_manage_structure ? null :  <LinkageList locale={router.locale}/>},
                            ]}
                        />
                    </div>
                </div>
            </>


        )
    else
        return null
}
