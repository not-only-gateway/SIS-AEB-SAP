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
import PropTypes from "prop-types";

export default function Index() {

    const router = useRouter()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [lang, setLang] = useState(null)
    const [option, setOption] = useState('collaborators')

    useEffect(() => {
        setLang(getLanguage(router.locale, '/'))
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

                        <div className={shared.header_container}
                             style={{backgroundColor: props.dark ? '#303741' : 'white'}}>
                            <props.getTitle pageName={lang.extensions} pageTitle={lang.extensions}
                                            pageInfo={getPageInfo({
                                                info1: lang.info1,
                                                info2: lang.info2,
                                                info3: lang.info3,
                                                option: option
                                            })}/>

                            <IndexComponent dark={props.dark} setData={setData} setOption={setOption}
                                            option={option} lang={lang} setLoading={setLoading}
                            />
                        </div>
                        <div className={styles.personas_container}>
                            {!loading ?
                                data.length > 0 ?
                                    option !== 'units' ? data.map(collaborator =>
                                            <PersonCard
                                                profile={collaborator.profile}
                                                collaboration={collaborator.collaboration}
                                                unit={collaborator.unit}
                                                dark={props.dark}
                                                inactiveLocale={lang.inactive}
                                            />
                                        )
                                        :
                                        data.map(unit =>
                                            <UnityCard dark={props.dark}
                                                       unit={unit.unit}
                                                       collaborators={unit.collaborators}/>
                                        )
                                    :
                                    <div style={{
                                        width: '90%',
                                        margin: 'auto',
                                        borderRadius: '8px',
                                        border: !props.dark ? '#e2e2e2 1px solid' : null,
                                        backgroundColor: props.dark ? '#3b424c' : null
                                    }}>
                                        <p style={{textAlign: 'center', fontWeight: 445}}>{lang.nothingFound}</p>
                                    </div>

                                :
                                <Skeleton variant="rect" style={{
                                    borderRadius: '8px',
                                    width: '45vw',
                                    height: '11vh',
                                    backgroundColor: props.dark ? '#3b424c' : '#f4f8fb'
                                }}/>}
                        </div>
                    </ThemeProvider>
                }
            </Layout>
        )
    else
        return <></>
}