import React, {useEffect, useRef, useState} from 'react'
import {useRouter} from "next/router";
import {getLanguage} from "../utils/shared/PageLanguage";
import {readAccessProfile} from "../utils/shared/IndexedDB";
import Cookies from "universal-cookie/lib";
import mainStyles from '../styles/shared/Main.module.css'
import HeaderLayout from "../components/layout/HeaderLayout";
import TabContent from "../components/elements/TabContent";
import Authenticate from "../components/modules/Authenticate";
import AccessProfileList from "../components/templates/AccessProfileList";
import axios from "axios";
import Host from "../utils/shared/Host";

export default function management() {

    const router = useRouter()

    const [lang, setLang] = useState(null)
    const [accessProfile, setAccessProfile] = useState(null)

    const [openTab, setOpenTab] = useState(0)
    const [valid, setValid] = useState(false)
    const [data, setData] = useState([])
    useEffect(() => {

            if (lang === null)
                setLang(getLanguage(router.locale, router.pathname))
            if (data.length === 0)
                fetchData()

            if (accessProfile === null)
                readAccessProfile().then(res => setAccessProfile(res))

        }, [router.locale]
    )

    async function fetchData() {
        await axios({
            method: 'get',
            url: Host() + 'access_profiles',
            headers: (new Cookies()).get('jwt') !== undefined ? {'authorization': (new Cookies()).get('jwt')} : null,
        }).then(res => {
            setData(res.data)
        }).catch(error => {
            console.log(error)
        })
    }

    if (lang !== null)
        return (
            <>
                <Authenticate
                    valid={(valid) || (new Cookies()).get('authorization_token') !== undefined}
                    setValid={setValid}
                    redirect={() => {
                        router.push('/', '/', {locale: router.locale})
                    }}
                    locale={router.locale}
                />
                <HeaderLayout
                    availableTabs={{
                        tabs: [
                            {
                                disabled: false,
                                key: 0,
                                value: lang.list
                            },
                            accessProfile !== null ? {
                                disabled: !accessProfile.canCreateAccessProfile,
                                key: 1,
                                value: lang.create
                            } : null
                        ],
                        setOpenTab: setOpenTab,
                        openTab: openTab
                    }}
                    filterComponent={undefined}
                    title={
                        lang.title
                    }
                    pageTitle={lang.title}
                    information={null}
                    searchComponent={undefined}
                />
                <div className={mainStyles.displayInlineCenter} style={{width: '100%'}}>
                    <div style={{width: '75%'}}>
                        <TabContent
                            openTab={openTab}
                            tabs={[
                                {
                                    buttonKey: 0,
                                    value: (
                                        <AccessProfileList data={data} locale={router.locale}/>
                                    )
                                },

                                {
                                    buttonKey: 1,
                                    value: (
                                        'Update'
                                    )
                                },

                            ]}/>
                    </div>
                </div>
            </>


        )
    else
        return <></>
}
