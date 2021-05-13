import React, {useEffect, useState} from 'react'
import {useRouter} from "next/router";
import {getLanguage} from "../utils/shared/PageLanguage";
import {readAccessProfile} from "../utils/shared/IndexedDB";
import mainStyles from '../styles/shared/Main.module.css'
import HeaderLayout from "../components/layout/HeaderLayout";
import TabContent from "../components/templates/TabContent";
import Authenticate from "../components/modules/Authenticate";
import AccessProfileList from "../components/templates/list/AccessProfileList";
import EffectiveRoleList from "../components/templates/list/EffectiveRoleList";
import CommissionedRoleList from "../components/templates/list/CommissionedRoleList";
import LinkageList from "../components/templates/list/LinkageList";
import Cookies from "universal-cookie/lib";

export default function management() {

    const router = useRouter()
    const [lang, setLang] = useState(null)
    const [accessProfile, setAccessProfile] = useState(null)
    const [openTab, setOpenTab] = useState(0)
    const [notAuthenticated, setNotAuthenticated] = useState(true)

    useEffect(() => {

            if (lang === null)
                setLang(getLanguage(router.locale, router.pathname))
            if (accessProfile === null)
                readAccessProfile().then(res => setAccessProfile(res))
        setNotAuthenticated((new Cookies()).get('authorization_token') === undefined)
        }, [router.locale]
    )


    if (lang !== null)
        return (
            <>
                <Authenticate
                    handleClose={valid => {
                        if(valid)
                            setNotAuthenticated(false)
                        else
                            router.push('/', '/', {locale: router.locale})
                    }}
                    forceClose={() => router.push('/', '/', {locale: router.locale})}
                    render={notAuthenticated}
                    locale={router.locale}
                />
                <HeaderLayout
                    width={'75%'}
                    availableTabs={{
                        tabs: [
                            {key: 0, value: lang.accessTitle},
                            {key: 1, value: lang.effectiveRoleTitle},
                            {key: 2, value: lang.commissionedRoleTitle},
                            {key: 3, value: lang.linkagesTitle},
                        ],
                        openTab: openTab,
                        setOpenTab: setOpenTab
                    }}
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
                                {buttonKey: 0, value: <AccessProfileList locale={router.locale}/>},
                                {buttonKey: 1, value: <EffectiveRoleList locale={router.locale}/>},
                                {buttonKey: 2, value: <CommissionedRoleList locale={router.locale}/>},
                                {buttonKey: 3, value: <LinkageList locale={router.locale}/>},
                            ]}
                        />
                    </div>
                </div>
            </>


        )
    else
        return <></>
}
