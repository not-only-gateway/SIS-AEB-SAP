import React, {useState} from "react";
import {useRouter} from "next/router";

import {Header} from "sis-aeb-header";
import {RenderTabs, Tabs} from "sis-aeb-navigation";
import Settings from "../components/settings/Settings";
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
                <Header
                    pageTitle={lang.title}
                    title={lang.title}
                    information={lang.information}
                    width={'95%'}
                />
                <RenderTabs tabs={[
                    {
                        buttonKey: 0,
                        value: <Settings lang={lang} locale={router.locale}
                                     redirect={event => router.push(event.url, event.url, {locale: event.locale})}/>
                    },
                    {
                        buttonKey: 1,
                        value: <div style={{background: 'green', width: '100px', height: '100px'}}/>
                    },
                    {
                        buttonKey: 2,
                        value: <div style={{background: 'blue', width: '100px', height: '100px'}}/>
                    }
                ]} noContainer={true} openTab={openTab}/>
            </div>
        </div>

    )

}
