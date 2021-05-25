import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {Button, Divider, FormControl, FormControlLabel, Radio, RadioGroup} from "@material-ui/core";
import {getLanguage, setCookiesLanguage} from "../utils/shared/PageLanguage";
import Cookies from "universal-cookie/lib";
import Accordion from "../components/layout/Accordion";
import fetchSettingsData from "../utils/fetch/FetchSettings";
import {readAccessProfile, readCollaboration, readProfile} from "../utils/shared/IndexedDB";
import shared from '../styles/shared/Shared.module.css'
import {getSecondaryColor, getTertiaryColor} from "../styles/shared/MainStyles";
import mainStyles from '../styles/shared/Main.module.css'
import Link from "next/link";
import {HistoryRounded} from "@material-ui/icons";
import animations from "../styles/shared/Animations.module.css";
import HeaderLayout from "../components/layout/HeaderLayout";
import mapToSelect from "../utils/shared/MapToSelect";
import Selector from "../components/modules/inputs/Selector";
import TabContent from "../components/templates/TabContent";
import Settings from "../components/modules/Settings";
import ActivityOverview from "../components/templates/ActivityOverview";

export default function settings() {

    const router = useRouter()
    const [lang, setLang] = useState(null)

    const [accessProfile, setAccessProfile] = useState(null)
    const [openTab, setOpenTab] = useState(0)

    useEffect(() => {

        if (accessProfile === null)
            readAccessProfile().then(res => setAccessProfile(res))
        setLang(getLanguage(router.locale, router.pathname))
    }, [router.locale, router.isReady])



    if (lang !== null)
        return (
            <>
                <HeaderLayout
                    availableTabs={{
                        tabs: [
                            {
                                key: 0,
                                value: lang.settings
                            },
                            {
                                key: 1,
                                value: lang.activityOverview,
                                disabled: true
                            },
                            {
                                key: 2,
                                value: lang.activityList,
                                disabled: true
                            }
                        ],
                        openTab: openTab,
                        setOpenTab: setOpenTab
                    }}

                    pageTitle={lang.title}
                    title={lang.title}
                    information={lang.information}
                    width={'75%'}
                />
                <div style={{width: '75%', margin: 'auto', paddingTop: '32px'}}>
                    <TabContent tabs={[
                        {
                            buttonKey: 0,
                            value: <Settings lang={lang} locale={router.locale} redirect={event => router.push(event.url, event.url, {locale: event.locale})}/>
                        },
                        {
                            buttonKey: 1,
                            value: <ActivityOverview locale={router.locale}/>
                        },
                        {
                            buttonKey: 2,
                            value: null
                        }
                    ]} noContainer={true} openTab={openTab}/>
                </div>
            </>

        )
    else
        return <></>
}
