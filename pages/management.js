import Layout from "../components/layout/Layout";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {createMuiTheme} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/styles";
import {getLanguage} from "../utils/shared/Language";
import {readAccessProfile} from "../utils/shared/IndexedDB";

export default function Management() {

    const router = useRouter()
    const [lang, setLang] = useState(null)
    const [accessProfile, setAccessProfile] = useState(null)

    useEffect(() => {
        setLang(getLanguage(router.locale, router.pathname))
        if (accessProfile === null)
            readAccessProfile().then(res => {
                if (res !== null)
                    setAccessProfile(res)
                else
                    router.push('/', '/', {locale: router.locale})
            })

    }, [router.locale, router.isReady])


    if (lang !== null)
        return (
            <Layout>
                {props =>
                    <ThemeProvider theme={createMuiTheme({
                        palette: {
                            type: props.dark ? "dark" : "light"
                        }
                    })}>
                        <props.getTitle pageName={lang.settings} pageTitle={lang.settings} pageInfo={lang.information}/>


                    </ThemeProvider>
                }
            </Layout>
        )
    else
        return <></>
}
