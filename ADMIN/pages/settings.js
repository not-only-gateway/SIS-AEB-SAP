import React, {useRef, useState} from "react";
import {useRouter} from "next/router";

import HeaderLayout from "../components/layout/HeaderLayout";
import TabContent from "../components/templates/TabContent";
import Settings from "../components/modules/Settings";
import ActivityOverview from "../components/templates/ActivityOverview";
import HorizontalTabs from "../components/layout/navigation/HorizontalTabs";
import Cookies from "universal-cookie/lib";
import SettingsPT from "../packages/locales/settings/SettingsPT";

export default function settings() {

    const router = useRouter()
    const lang = SettingsPT
    const [openTab, setOpenTab] = useState(0)
    const authenticated = useRef((new Cookies()).get('jwt'))

    return (
        <>
            <HeaderLayout

                tabs={
                    <HorizontalTabs
                        buttons={[
                            {
                                key: 0,
                                value: lang.settings
                            },
                            authenticated.current !== undefined ? {
                                key: 1,
                                value: lang.activityOverview,
                                disabled: true
                            } : null,
                            authenticated.current !== undefined ? {
                                key: 2,
                                value: lang.activityList,
                                disabled: true
                            } : null
                        ]}
                        setOpenTab={setOpenTab}
                        openTab={openTab}
                    />
                }

                pageTitle={lang.title}
                title={lang.title}
                information={lang.information}
                width={'75%'}
            />
            <div style={{width: '75%', margin: 'auto', paddingTop: '32px'}}>
                <TabContent tabs={[
                    {
                        buttonKey: 0,
                        value: <Settings lang={lang} locale={router.locale}
                                         redirect={event => router.push(event.url, event.url, {locale: event.locale})}/>
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

}
