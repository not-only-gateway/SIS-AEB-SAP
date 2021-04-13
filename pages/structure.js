import Layout from "../components/shared/layout/Layout";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import styles from '../styles/pages/index/Index.module.css'
import PersonCard from "../components/index/PersonCard";
import {createMuiTheme, ThemeProvider} from "@material-ui/core";
import {Skeleton} from "@material-ui/lab";
import {getLanguage} from "../utils/shared/Language";
import IndexComponent from "../components/index/IndexComponent";
import UnityCard from "../components/index/UnitCard";
import shared from '../styles/shared/Shared.module.css'
import getPageInfo from "../utils/index/GetPageInfo";

export default function Structure() {

    const router = useRouter()
    const [lang, setLang] = useState(null)

    useEffect(() => {
        setLang(getLanguage(router.locale, '/structure'))
    }, [])

    if (lang !== null)
        return (
            <Layout>
                {props =>
                    <ThemeProvider theme={createMuiTheme({
                        palette: {
                            type: props.dark ? "dark" : "light"
                        }
                    })}>
                        <props.getTitle pageName={lang.title} pageTitle={lang.title} pageInfo={lang.information}/>
                        <div>
                          cafe
                        </div>
                    </ThemeProvider>
                }
            </Layout>
        )
    else
        return <></>
}