import React, {useRef, useState} from "react";
import {useRouter} from "next/router";

import HeaderLayout from "../components/shared/layout/HeaderLayout";
import TabContent from "../components/shared/TabContent";
import Settings from "../components/settings/Settings";

import Tabs from "../components/shared/layout/Tabs";
import Cookies from "universal-cookie/lib";
import SettingsPT from "../packages/locales/settings/SettingsPT";

export default function settings() {
    const router = useRouter()
    const lang = SettingsPT
    const [openTab, setOpenTab] = useState(0)

    return (
        <div style={{display: 'flex'}}>

            <Tabs
                buttons={[
                    {
                        key: 0,
                        value: lang.settings
                    },
                    {
                        key: 1,
                        value: lang.activityOverview,
                        disabled: false
                    },
                    {
                        key: 2,
                        value: lang.activityList,
                        disabled: false
                    }
                ]}
                setOpenTab={setOpenTab}
                openTab={openTab}
            />

            <div style={{width: 'calc(100% - 220px)', marginLeft: 'auto', overflowY: 'hidden'}}>
                <HeaderLayout
                    pageTitle={lang.title}
                    title={lang.title}
                    information={lang.information}
                    width={'95%'}
                />
                <TabContent tabs={[
                    {
                        buttonKey: 0,
                        value: <Settings lang={lang} locale={router.locale}
                                     redirect={event => router.push(event.url, event.url, {locale: event.locale})}/>
                    },
                    {
                        buttonKey: 1,
                        value: null
                    },
                    {
                        buttonKey: 2,
                        value: null
                    }
                ]} noContainer={true} openTab={openTab}/>
            </div>
        </div>

    )

}
