import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {getLanguage} from "../utils/shared/PageLanguage";
import HeaderLayout from "../components/layout/HeaderLayout";
import Settings from "../components/modules/Settings";

export default function settings() {

    const router = useRouter()
    const [lang, setLang] = useState(null)

    useEffect(() => {

        setLang(getLanguage(router.locale, router.pathname))
    }, [router.locale, router.isReady])



    if (lang !== null)
        return (
            <>
                <HeaderLayout
                    pageTitle={lang.title}
                    title={lang.title}
                    information={lang.information}
                    width={'75%'}
                />
                <div style={{width: '75%', margin: 'auto', paddingTop: '32px'}}>
                    <Settings lang={lang} locale={router.locale} redirect={event => router.push(event.url, event.url, {locale: event.locale})}/>

                </div>
            </>

        )
    else
        return <></>
}
